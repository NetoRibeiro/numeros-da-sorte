# 📊 Plano de Integração com Dados da Caixa

Este documento descreve as opções para buscar dados da Mega-Sena automaticamente.

---

## 🔍 Opções Disponíveis

| Opção | Confiabilidade | Dificuldade | Custo | Tempo Real |
|-------|---------------|-------------|-------|------------|
| A. API Loteriascaixa.com | ⭐⭐⭐⭐ | Fácil | Grátis | ✅ |
| B. API Apiloterias.com.br | ⭐⭐⭐⭐⭐ | Fácil | Grátis | ✅ |
| C. Scraping Caixa direto | ⭐⭐⭐ | Médio | Grátis | ✅ |
| D. Arquivo JSON GitHub | ⭐⭐⭐⭐ | Fácil | Grátis | ⏱️ Delay |

---

## Opção A: API Loteriascaixa.com (Recomendada) ⭐

### Endpoint
```
https://loteriascaixa.com/api/mega-sena/latest
https://loteriascaixa.com/api/mega-sena/{concurso}
https://loteriascaixa.com/api/mega-sena/
```

### Exemplo de Resposta
```json
{
  "concurso": 2800,
  "data": "21/12/2024",
  "dezenas": ["03", "17", "20", "22", "35", "56"],
  "premiacao": [...],
  "acumulado": true,
  "valor_acumulado": "50000000.00"
}
```

### Implementação

```javascript
// Buscar último resultado
async function getLatestResult() {
  const response = await fetch('https://loteriascaixa.com/api/mega-sena/latest');
  const data = await response.json();
  return data;
}

// Buscar todos os resultados
async function getAllResults() {
  const response = await fetch('https://loteriascaixa.com/api/mega-sena/');
  const data = await response.json();
  return data;
}
```

### Prós
- API gratuita e pública
- Dados atualizados
- Fácil de usar
- CORS habilitado

### Contras
- API não oficial (pode sair do ar)
- Dependência de terceiros

---

## Opção B: API Loterias (apiloterias.com.br)

### Endpoint
```
https://apiloterias.com.br/app/resultado?loteria=megasena&token=SEU_TOKEN
https://apiloterias.com.br/app/resultado?loteria=megasena&concurso=2800&token=SEU_TOKEN
```

### Cadastro
1. Acesse https://apiloterias.com.br
2. Crie conta gratuita
3. Obtenha seu token

### Implementação

```javascript
const API_TOKEN = 'seu_token_aqui';

async function getResult(concurso = '') {
  const url = `https://apiloterias.com.br/app/resultado?loteria=megasena&token=${API_TOKEN}${concurso ? `&concurso=${concurso}` : ''}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}
```

### Prós
- API bem documentada
- Suporte técnico
- Dados confiáveis

### Contras
- Requer cadastro
- Token exposto no frontend

---

## Opção C: Buscar Direto da Caixa

### Endpoint (não oficial)
```
https://servicebus2.caixa.gov.br/portaldeloterias/api/megasena/
https://servicebus2.caixa.gov.br/portaldeloterias/api/megasena/{concurso}
```

### Problema: CORS
A Caixa bloqueia requisições de outros domínios (CORS). Soluções:

#### Solução 1: Proxy CORS
```javascript
const PROXY = 'https://corsproxy.io/?';
const CAIXA_API = 'https://servicebus2.caixa.gov.br/portaldeloterias/api/megasena/';

async function getFromCaixa() {
  const response = await fetch(PROXY + encodeURIComponent(CAIXA_API));
  const data = await response.json();
  return data;
}
```

#### Solução 2: Seu próprio proxy (Backend)
Criar um backend simples que faz a requisição e retorna os dados.

### Prós
- Dados oficiais da Caixa
- Sempre atualizado

### Contras
- CORS bloqueado
- Precisa de proxy
- API pode mudar sem aviso

---

## Opção D: Arquivo JSON no GitHub

### Como Funciona
1. Criar repositório com dados em JSON
2. Atualizar periodicamente (manual ou GitHub Actions)
3. App busca do GitHub raw

### Estrutura
```
lottery-data/
├── mega-sena.json
├── mega-virada.json
└── .github/
    └── workflows/
        └── update.yml  # Atualização automática
```

### Implementação

```javascript
const DATA_URL = 'https://raw.githubusercontent.com/SEU-USER/lottery-data/main/mega-sena.json';

async function getData() {
  const response = await fetch(DATA_URL);
  const data = await response.json();
  return data;
}
```

### Prós
- Controle total dos dados
- Não depende de APIs externas
- GitHub é confiável

### Contras
- Não é tempo real
- Precisa atualizar o JSON

---

## 🏆 Recomendação

### Para seu projeto, recomendo:

**Fase 1: API Loteriascaixa.com**
- Fácil implementação
- Funciona imediatamente
- Grátis

**Fase 2 (Futuro): Backup com JSON**
- Se a API falhar, busca do JSON
- Resiliência

---

## 📋 Plano de Implementação

### Semana 1: Integração Básica

```
Dia 1-2: 
├── Criar hook useLotteryData()
├── Implementar fetch da API
└── Tratar erros e loading

Dia 3-4:
├── Calcular frequências dinamicamente
├── Atualizar componente para usar dados da API
└── Adicionar cache local (localStorage)

Dia 5:
├── Testes
├── Deploy
└── Monitoramento
```

### Semana 2: Melhorias

```
├── Sistema de fallback (API → JSON → dados estáticos)
├── Indicador de "última atualização"
├── Botão "Atualizar dados"
└── Mostrar último resultado sorteado
```

---

## 💻 Código de Implementação

### Hook: useLotteryData.js

```javascript
import { useState, useEffect } from 'react';

const API_URL = 'https://loteriascaixa.com/api/mega-sena/';
const CACHE_KEY = 'megasena_data';
const CACHE_DURATION = 1000 * 60 * 60; // 1 hora

export function useLotteryData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);

  const fetchData = async (forceRefresh = false) => {
    setLoading(true);
    setError(null);

    // Verificar cache
    if (!forceRefresh) {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const { data: cachedData, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_DURATION) {
          setData(cachedData);
          setLastUpdate(new Date(timestamp));
          setLoading(false);
          return;
        }
      }
    }

    try {
      const response = await fetch(API_URL);
      
      if (!response.ok) {
        throw new Error('Falha ao buscar dados');
      }
      
      const apiData = await response.json();
      
      // Salvar no cache
      const cacheData = {
        data: apiData,
        timestamp: Date.now()
      };
      localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
      
      setData(apiData);
      setLastUpdate(new Date());
    } catch (err) {
      setError(err.message);
      
      // Tentar usar cache antigo
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const { data: cachedData } = JSON.parse(cached);
        setData(cachedData);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error, lastUpdate, refresh: () => fetchData(true) };
}
```

### Calcular Frequências Dinamicamente

```javascript
function calculateFrequencies(results) {
  const frequency = {};
  
  // Inicializar
  for (let i = 1; i <= 60; i++) {
    frequency[i] = 0;
  }
  
  // Contar
  results.forEach(result => {
    const dezenas = result.dezenas || result.listaDezenas;
    dezenas.forEach(d => {
      const num = parseInt(d);
      if (num >= 1 && num <= 60) {
        frequency[num]++;
      }
    });
  });
  
  return frequency;
}

function calculateRecentHot(results, lastN = 100) {
  const recent = results.slice(-lastN);
  const frequency = calculateFrequencies(recent);
  
  return Object.entries(frequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([num]) => parseInt(num));
}

function filterViradaResults(results) {
  return results.filter(r => {
    const date = new Date(r.data || r.dataApuracao);
    return date.getMonth() === 11 && date.getDate() === 31;
  });
}
```

### Componente Atualizado

```jsx
import { useLotteryData } from './hooks/useLotteryData';

export default function MegaSenaPredictor() {
  const { data, loading, error, lastUpdate, refresh } = useLotteryData();
  
  // Calcular frequências quando dados carregarem
  const frequencies = useMemo(() => {
    if (!data) return null;
    return {
      historical: calculateFrequencies(data),
      virada: calculateFrequencies(filterViradaResults(data)),
      recentHot: calculateRecentHot(data)
    };
  }, [data]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      {/* Indicador de última atualização */}
      <div className="text-xs text-gray-400">
        Dados atualizados: {lastUpdate?.toLocaleString('pt-BR')}
        <button onClick={refresh} className="ml-2 underline">
          🔄 Atualizar
        </button>
      </div>
      
      {error && (
        <div className="text-yellow-400 text-xs">
          ⚠️ Usando dados em cache: {error}
        </div>
      )}
      
      {/* Resto do componente */}
    </div>
  );
}
```

---

## 📁 Nova Estrutura de Arquivos

```
src/
├── components/
│   └── MegaSenaPredictor.jsx
├── hooks/
│   └── useLotteryData.js      # Novo
├── utils/
│   ├── frequencies.js          # Novo - cálculos
│   └── prediction.js           # Novo - algoritmo
├── App.jsx
├── main.jsx
└── index.css
```

---

## 🚀 Próximos Passos

1. **Testar a API primeiro** - Verificar se funciona no navegador
2. **Implementar o hook** - Buscar dados e cachear
3. **Refatorar o componente** - Usar dados dinâmicos
4. **Adicionar fallback** - Dados estáticos se API falhar
5. **Deploy e testar** - Verificar em produção

---

## ❓ Perguntas para Definir

1. Quer mostrar o **último resultado** sorteado no app?
2. Quer um botão para **atualizar dados manualmente**?
3. Quer mostrar **estatísticas em tempo real**?
4. Prefere começar com qual opção de API?

---

**Pronto para começar? Me diga qual opção prefere e implementamos juntos! 🍀**
