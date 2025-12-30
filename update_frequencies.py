#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Mega-Sena Frequency Updater
===========================
Este script atualiza as frequencias da Mega-Sena de duas formas:
1. Lendo arquivo Excel da Caixa (offline)
2. Buscando dados da API online (recomendado)

Uso:
    # Buscar da API (recomendado)
    python update_frequencies.py --api

    # Ler de arquivo Excel
    python update_frequencies.py Mega-Sena-Numeros.xlsx

    # Buscar da API e salvar backup em Excel
    python update_frequencies.py --api --save-excel backup.xlsx

Requisitos:
    pip install pandas openpyxl requests
"""

import sys
import pandas as pd
import requests
from datetime import datetime
import argparse
import json


def fetch_from_api():
    """Busca dados da API Loteriascaixa.com"""
    print("🌐 Buscando dados da API Loteriascaixa.com...")

    api_urls = [
        'https://loteriascaixa.com/api/mega-sena/',
        'https://servicebus2.caixa.gov.br/portaldeloterias/api/megasena/'
    ]

    for api_url in api_urls:
        try:
            print(f"   Tentando: {api_url}")
            response = requests.get(api_url, timeout=30)
            response.raise_for_status()
            data = response.json()

            if not isinstance(data, list) or len(data) == 0:
                print(f"   ❌ Resposta inválida")
                continue

            print(f"   ✅ {len(data)} sorteios baixados")

            # Convert API data to DataFrame
            rows = []
            for result in data:
                # Handle different API formats
                concurso = result.get('concurso') or result.get('numero')
                data_str = result.get('data') or result.get('dataApuracao')
                dezenas = result.get('dezenas') or result.get('listaDezenas', [])

                if concurso and data_str and dezenas:
                    row = {'Concurso': concurso, 'Data': data_str}
                    for i, num in enumerate(dezenas[:6], 1):
                        row[f'Bola{i}'] = int(num)
                    rows.append(row)

            df = pd.DataFrame(rows)
            print(f"   ✅ DataFrame criado com {len(df)} registros")
            return df

        except requests.exceptions.RequestException as e:
            print(f"   ❌ Erro: {e}")
            continue
        except Exception as e:
            print(f"   ❌ Erro ao processar dados: {e}")
            continue

    raise Exception("Todas as APIs falharam. Tente usar um arquivo Excel.")


def load_data(filepath):
    """Carrega o arquivo Excel da Mega-Sena"""
    print(f"📂 Carregando arquivo: {filepath}")
    df = pd.read_excel(filepath)
    print(f"✅ {len(df)} sorteios carregados")
    return df


def save_to_excel(df, filepath):
    """Salva DataFrame em arquivo Excel"""
    print(f"💾 Salvando dados em: {filepath}")
    df.to_excel(filepath, index=False)
    print(f"✅ Arquivo salvo com sucesso")


def calculate_frequencies(df):
    """Calcula frequência de cada número (1-60)"""
    print("🔢 Calculando frequências...")
    
    # Identificar colunas das bolas
    ball_columns = [col for col in df.columns if 'Bola' in str(col)]
    
    if not ball_columns:
        # Tentar nomes alternativos
        ball_columns = df.columns[2:8].tolist()
    
    print(f"   Colunas das bolas: {ball_columns}")
    
    # Contar frequência de cada número
    frequency = {i: 0 for i in range(1, 61)}
    
    for col in ball_columns:
        for num in df[col]:
            if pd.notna(num) and 1 <= int(num) <= 60:
                frequency[int(num)] += 1
    
    return frequency


def calculate_virada_frequencies(df):
    """Calcula frequências apenas dos sorteios da Mega da Virada"""
    print("🎆 Calculando frequências da Mega da Virada...")
    
    # Identificar coluna de data
    date_col = None
    for col in df.columns:
        if 'Data' in str(col):
            date_col = col
            break
    
    if date_col is None:
        date_col = df.columns[1]
    
    # Filtrar sorteios de 31 de dezembro
    df['Data_Parsed'] = pd.to_datetime(df[date_col], errors='coerce')
    virada_df = df[(df['Data_Parsed'].dt.month == 12) & (df['Data_Parsed'].dt.day == 31)]
    
    print(f"   {len(virada_df)} sorteios da Virada encontrados")
    
    # Identificar colunas das bolas
    ball_columns = [col for col in df.columns if 'Bola' in str(col)]
    if not ball_columns:
        ball_columns = df.columns[2:8].tolist()
    
    # Contar frequência
    frequency = {i: 0 for i in range(1, 61)}
    
    for col in ball_columns:
        for num in virada_df[col]:
            if pd.notna(num) and 1 <= int(num) <= 60:
                frequency[int(num)] += 1
    
    return frequency, len(virada_df)


def calculate_recent_hot(df, last_n=None):
    """Calcula os números mais frequentes nos últimos N sorteios"""
    if last_n is None:
        last_n = len(df)
    print(f"🔥 Calculando números quentes (últimos {last_n} sorteios)...")

    recent_df = df.tail(last_n)
    
    ball_columns = [col for col in df.columns if 'Bola' in str(col)]
    if not ball_columns:
        ball_columns = df.columns[2:8].tolist()
    
    frequency = {i: 0 for i in range(1, 61)}
    
    for col in ball_columns:
        for num in recent_df[col]:
            if pd.notna(num) and 1 <= int(num) <= 60:
                frequency[int(num)] += 1
    
    # Top 10 mais frequentes
    sorted_freq = sorted(frequency.items(), key=lambda x: x[1], reverse=True)
    hot_numbers = [num for num, _ in sorted_freq[:10]]
    
    return hot_numbers


def format_frequency_js(frequency):
    """Formata frequências como objeto JavaScript"""
    lines = []
    for i in range(1, 61):
        if i % 10 == 1:
            lines.append("  ")
        lines[-1] += f"{i}: {frequency[i]}"
        if i < 60:
            lines[-1] += ", "
    return "{\n" + "\n".join(lines) + "\n}"


def generate_js_code(historical_freq, virada_freq, hot_numbers, virada_hot, total_drawings, virada_count):
    """Gera o código JavaScript para copiar"""
    
    # Encontrar números mais frequentes da Virada
    virada_sorted = sorted(virada_freq.items(), key=lambda x: x[1], reverse=True)
    virada_hot_numbers = [num for num, freq in virada_sorted if freq > 0][:13]
    
    code = f"""
// ============================================
// DADOS ATUALIZADOS EM: {datetime.now().strftime('%Y-%m-%d %H:%M')}
// Total de sorteios: {total_drawings}
// Sorteios da Virada: {virada_count}
// ============================================

// Historical frequency data from {total_drawings} Mega-Sena drawings
const historicalFrequency = {format_frequency_js(historical_freq)};

// Mega da Virada frequency ({virada_count} drawings)
const viradaFrequency = {format_frequency_js(virada_freq)};

// Recent trends (last 100 drawings) - hot numbers
const recentHotNumbers = {hot_numbers};

// Virada hot numbers (most frequent in Mega da Virada)
const viradaHotNumbers = {virada_hot_numbers};
"""
    return code


def main():
    parser = argparse.ArgumentParser(
        description='Atualiza as frequências da Mega-Sena',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Exemplos:
  python update_frequencies.py --api
  python update_frequencies.py Mega-Sena.xlsx
  python update_frequencies.py --api --save-excel backup.xlsx
        """
    )

    parser.add_argument('filepath', nargs='?', help='Arquivo Excel com dados da Mega-Sena')
    parser.add_argument('--api', action='store_true', help='Buscar dados da API online')
    parser.add_argument('--save-excel', metavar='FILE', help='Salvar dados da API em arquivo Excel')

    args = parser.parse_args()

    print("=" * 50)
    print("🍀 MEGA-SENA FREQUENCY UPDATER")
    print("=" * 50)

    # Carregar dados
    if args.api:
        try:
            df = fetch_from_api()
            if args.save_excel:
                save_to_excel(df, args.save_excel)
        except Exception as e:
            print(f"❌ Erro ao buscar da API: {e}")
            sys.exit(1)
    elif args.filepath:
        df = load_data(args.filepath)
    else:
        print("❌ Uso:")
        print("   python update_frequencies.py --api")
        print("   python update_frequencies.py <arquivo.xlsx>")
        print("\nUse --help para mais informações")
        sys.exit(1)
    
    # Calcular frequências
    historical_freq = calculate_frequencies(df)
    virada_freq, virada_count = calculate_virada_frequencies(df)
    hot_numbers = calculate_recent_hot(df)
    
    # Encontrar hot numbers da Virada
    virada_sorted = sorted(virada_freq.items(), key=lambda x: x[1], reverse=True)
    virada_hot = [num for num, freq in virada_sorted if freq > 0][:13]
    
    # Gerar código
    js_code = generate_js_code(
        historical_freq, 
        virada_freq, 
        hot_numbers, 
        virada_hot,
        len(df),
        virada_count
    )
    
    # Salvar em arquivo
    output_file = "updated_frequencies.js"
    with open(output_file, 'w') as f:
        f.write(js_code)
    
    print("\n" + "=" * 50)
    print(f"✅ Código gerado em: {output_file}")
    print("=" * 50)
    print("\n📋 INSTRUÇÕES:")
    print("1. Abra o arquivo 'updated_frequencies.js'")
    print("2. Copie o conteúdo")
    print("3. Cole no início do arquivo MegaSenaPredictor.jsx")
    print("   (substitua as variáveis existentes)")
    print("4. Execute: npm run deploy")
    print("\n" + "=" * 50)
    
    # Mostrar preview
    print("\n📊 PREVIEW DOS DADOS:\n")
    print(f"Total de sorteios: {len(df)}")
    print(f"Sorteios da Virada: {virada_count}")
    print(f"\nNúmeros mais frequentes (geral):")
    top_5 = sorted(historical_freq.items(), key=lambda x: x[1], reverse=True)[:5]
    for num, freq in top_5:
        print(f"  {num:02d}: {freq}x")
    
    print(f"\nNúmeros quentes (últimos 100):")
    print(f"  {hot_numbers}")
    
    print(f"\nNúmeros quentes (Virada):")
    print(f"  {virada_hot}")


if __name__ == "__main__":
    main()
