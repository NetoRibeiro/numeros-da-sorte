# 🍀 Mega-Sena Predictor

Um gerador de números para Mega-Sena e Mega da Virada baseado em análise estatística de dados históricos.

![React](https://img.shields.io/badge/React-18+-61DAFB?style=flat-square&logo=react)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3+-38B2AC?style=flat-square&logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

## 📸 Preview

<div align="center">

| Mega-Sena | Mega da Virada |
|:---------:|:--------------:|
| 🟢 Tema Verde | 🟣 Tema Roxo |
| 2.954 sorteios | 22 sorteios |
| 1996-2025 | 1998-2024 |

</div>

## ✨ Funcionalidades

### 🎰 Dois Modos de Previsão

#### Mega-Sena Regular
- Baseado em **2.954 sorteios históricos** (1996-2025)
- Análise de frequência de todos os números
- Considera tendências dos últimos 100 jogos
- Números mais frequentes: 10 (345x), 53 (336x), 5 (322x)

#### Mega da Virada 🎆
- Baseado em **22 sorteios de fim de ano** (1998-2024)
- Estatísticas exclusivas da Virada
- O número **10** saiu em 6 das 22 Viradas!
- Números campeões: 10 (6x), 41 (5x), 34 (5x)

### 🍀 Número da Sorte

Adicione seu número da sorte para personalizar a previsão:

| Influência | Multiplicador |
|------------|---------------|
| Seu número da sorte | **2.5x** |
| Números vizinhos (±5) | **1.15x** |
| Número complementar (61 - sorte) | **1.3x** |
| Mesmo último dígito | **1.1x** |

- Se o número da sorte aparecer na previsão, será destacado com uma **bola dourada** 🏆
- Exibe "✨ Incluído!" quando seu número faz parte do resultado

### 🔢 Seleção de Quantidade

Escolha entre 6, 7 ou 8 números:

| Quantidade | Tipo | Chances |
|------------|------|---------|
| 6 números | Aposta simples | 1x |
| 7 números | Aposta múltipla | 7x mais chances |
| 8 números | Aposta múltipla | 28x mais chances |

### ⏱️ Geração Baseada em Tempo

Cada previsão é única baseada no momento exato:
- Data e hora completa (dia, mês, hora, minuto, segundo)
- Milissegundos do timestamp
- Fatores temporais influenciam os pesos:
  - **Manhã**: favorece números 1-30
  - **Tarde/Noite**: favorece números 31-60
  - **Dia da semana**: números múltiplos do dia ganham peso
  - **Dia do mês**: números correspondentes são priorizados

### 🎨 Interface

- Design responsivo (mobile e desktop)
- Animação de revelação sequencial das bolas
- Temas diferenciados para cada modo
- Exibição de data/hora da geração
- Cards informativos com números quentes/frios

## 🧮 Como Funciona o Algoritmo

```
1. Carrega frequências históricas (2.954 ou 22 sorteios)
2. Cria pool ponderado baseado em:
   ├── Frequência histórica de cada número
   ├── Tendências recentes (últimos 100 jogos)
   ├── Influência do número da sorte
   └── Fatores baseados em data/hora
3. Gera seed única: timestamp + data + número da sorte
4. Seleciona números únicos do pool ponderado
5. Ordena e exibe os resultados
```

## 📊 Dados Estatísticos

### Top 10 Números - Mega-Sena Geral
| Posição | Número | Frequência |
|---------|--------|------------|
| 1º | 10 | 345 vezes |
| 2º | 53 | 336 vezes |
| 3º | 5 | 322 vezes |
| 4º | 37 | 321 vezes |
| 5º | 34 | 320 vezes |
| 6º | 33 | 316 vezes |
| 7º | 38 | 316 vezes |
| 8º | 4 | 314 vezes |
| 9º | 17 | 312 vezes |
| 10º | 32 | 312 vezes |

### Top 10 Números - Mega da Virada
| Posição | Número | Frequência |
|---------|--------|------------|
| 1º | 10 | 6 vezes |
| 2º | 41 | 5 vezes |
| 3º | 34 | 5 vezes |
| 4º | 32 | 4 vezes |
| 5º | 3 | 4 vezes |
| 6º | 5 | 4 vezes |
| 7º | 17 | 4 vezes |
| 8º | 35 | 4 vezes |
| 9º | 33 | 4 vezes |
| 10º | 36 | 4 vezes |

### Números que Nunca Saíram na Virada
8, 13, 28, 54

## 🚀 Instalação

### Pré-requisitos
- Node.js 16+
- npm ou yarn

### Passos

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/mega-sena-predictor.git

# Entre no diretório
cd mega-sena-predictor

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

### Usando com Vite + React

```bash
# Criar novo projeto
npm create vite@latest mega-sena-predictor -- --template react

# Copiar o componente para src/
# Instalar Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Configurar tailwind.config.js e importar no CSS
```

## 📁 Estrutura do Projeto

```
mega-sena-predictor/
├── src/
│   ├── components/
│   │   └── MegaSenaPredictor.jsx   # Componente principal
│   ├── App.jsx
│   └── index.css                    # Tailwind imports
├── public/
├── package.json
├── tailwind.config.js
└── README.md
```

## 🛠️ Tecnologias

- **React 18+** - Biblioteca UI
- **Tailwind CSS 3+** - Estilização
- **JavaScript ES6+** - Lógica do algoritmo

## 📱 Responsividade

O aplicativo é totalmente responsivo:
- **Mobile**: Bolas de 64x64px, layout compacto
- **Desktop**: Bolas de 80x80px, layout expandido

## 🎯 Uso

1. **Selecione o modo**: Mega-Sena ou Mega da Virada
2. **Adicione seu número da sorte** (opcional): Digite um número de 1 a 60
3. **Escolha a quantidade**: 6, 7 ou 8 números
4. **Clique em "GERAR NÚMEROS DA SORTE"**
5. **Aguarde a revelação** animada dos números

## ⚠️ Disclaimer

> **Este aplicativo é apenas para entretenimento.**
> 
> A Mega-Sena e a Mega da Virada são jogos de azar operados pela Caixa Econômica Federal. Os resultados são completamente aleatórios e este gerador não garante nenhum prêmio.
> 
> Jogue com responsabilidade. Se precisar de ajuda, ligue para o CVV: 188.

## 📄 Fonte dos Dados

- Dados históricos da Mega-Sena: 2.954 sorteios (11/03/1996 - 20/12/2025)
- Dados da Mega da Virada: 22 sorteios (31/12/1998 - 31/12/2024)

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fazer um Fork do projeto
2. Criar uma branch para sua feature (`git checkout -b feature/NovaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/NovaFeature`)
5. Abrir um Pull Request

## 📧 Contato

Se tiver dúvidas ou sugestões, abra uma [issue](https://github.com/seu-usuario/mega-sena-predictor/issues).

---

<div align="center">

**Feito com 🍀 para os apostadores brasileiros**

⭐ Se este projeto te ajudou, deixe uma estrela!

</div>
