# 🍀 Mega-Sena Predictor

Um gerador de números para Mega-Sena e Mega da Virada baseado em análise estatística de dados históricos em tempo real.

![React](https://img.shields.io/badge/React-18+-61DAFB?style=flat-square&logo=react)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3+-38B2AC?style=flat-square&logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

## ✨ Funcionalidades

### 🌐 Dados em Tempo Real
- Busca automaticamente resultados atualizados da Mega-Sena via API
- Cache de 1 hora para otimizar performance
- Botão de atualização manual
- Fallback para dados estáticos se APIs falharem
- Indicador de última atualização

### 🎰 Três Modos de Uso

#### 1. Mega-Sena Regular 🍀
- Analisa todos os sorteios históricos da Mega-Sena
- Considera tendências dos últimos 100 jogos
- Identifica números "quentes" e "frios"

#### 2. Mega da Virada 🎆
- Baseado exclusivamente nos sorteios de fim de ano
- Estatísticas específicas da Mega da Virada
- Mostra números campeões históricos

#### 3. Modo Embaralhar 🔀
- Cole seus números favoritos
- Gera novas combinações embaralhando seus números
- Crie múltiplos jogos sem repetição

### 🍀 Número da Sorte Personalizado
- Influencia toda a previsão com multiplicadores especiais
- Destacado com bola dourada se aparecer no resultado
- Afeta números vizinhos e relacionados

### 🔢 Apostas Múltiplas
- **6 números**: Aposta simples
- **7 números**: 7x mais chances
- **8 números**: 28x mais chances

## 🧮 Como Funciona

### Algoritmo de Previsão
```
1. Busca dados atualizados da API
2. Calcula frequências em tempo real
3. Cria pool ponderado baseado em:
   ├── Frequência histórica
   ├── Tendências recentes
   ├── Número da sorte (se fornecido)
   └── Fatores temporais (data/hora)
4. Gera seed única do momento
5. Seleciona números do pool ponderado
6. Retorna resultado ordenado
```

### Fontes de Dados
- **API Primária**: loteriascaixa.com/api/mega-sena
- **API Fallback**: Caixa Econômica Federal (oficial)
- **Cache Local**: localStorage (1 hora)
- **Fallback Estático**: Dados built-in caso APIs falhem

## 🚀 Como Rodar Localmente

### Pré-requisitos
- Node.js 16+
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/numeros-da-sorte.git

# Entre no diretório
cd numeros-da-sorte

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

O app estará disponível em `http://localhost:5173/numeros-da-sorte/`

### Visualizar Build de Produção Localmente

```bash
# Criar build de produção
npm run build

# Servir build localmente
npm run preview
```

## 📦 Deploy

### Deploy no GitHub Pages

#### 1. Configurar o Repositório

Primeiro, certifique-se de que o arquivo `vite.config.js` está configurado corretamente:

```javascript
export default defineConfig({
  plugins: [react()],
  base: '/numeros-da-sorte/' // Nome do seu repositório
})
```

#### 2. Deploy Automático

```bash
# Build e deploy em um comando
npm run deploy
```

Isso irá:
1. Criar o build de produção (`npm run build`)
2. Fazer deploy para o branch `gh-pages`

#### 3. Configurar GitHub Pages

1. Vá para o repositório no GitHub
2. **Settings** → **Pages**
3. **Source**: Selecione `gh-pages` branch
4. **Folder**: `/ (root)`
5. Clique em **Save**

Seu site estará disponível em:
```
https://seu-usuario.github.io/numeros-da-sorte/
```

#### 4. Atualizar o Deploy

Para publicar novas alterações:

```bash
# Commit suas mudanças
git add .
git commit -m "Suas alterações"
git push origin main

# Deploy
npm run deploy
```

### Deploy em Outras Plataformas

#### Vercel

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel
```

#### Netlify

```bash
# Build
npm run build

# Arraste a pasta dist/ para netlify.com
# Ou use Netlify CLI:
npm i -g netlify-cli
netlify deploy --prod --dir=dist
```

## 🛠️ Tecnologias

- **React 18+** - UI Library
- **Vite 5+** - Build tool
- **Tailwind CSS 3+** - Styling
- **JavaScript ES6+** - Logic

## 📁 Estrutura do Projeto

```
numeros-da-sorte/
├── src/
│   ├── components/
│   │   └── MegaSenaPredictor.jsx  # Componente principal
│   ├── hooks/
│   │   └── useLotteryData.js      # Hook de API
│   ├── utils/
│   │   └── frequencies.js         # Cálculos de frequência
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/
│   └── qrcode_pix.jpg
├── dist/                           # Build de produção (gerado)
├── package.json
├── vite.config.js
└── README.md
```

## 🔄 Atualizando Frequências Manualmente (Opcional)

Se você quiser atualizar os dados de fallback estáticos:

```bash
# Requer Python 3.6+
pip install pandas openpyxl requests

# Buscar da API e gerar arquivo JS
python update_frequencies.py --api

# Ou usar arquivo Excel local
python update_frequencies.py Mega-Sena.xlsx
```

O script `update_frequencies.py` gera um arquivo JavaScript com as frequências atualizadas que pode ser copiado para o componente.

## 🎯 Uso da Aplicação

1. **Selecione o modo**: Mega-Sena, Mega da Virada ou Embaralhar
2. **Configure suas preferências**:
   - Adicione número da sorte (opcional)
   - Escolha quantidade de números (6, 7 ou 8)
   - No modo Embaralhar: cole seus números
3. **Gere os números**: Clique no botão principal
4. **Atualize dados**: Use o botão "🔄 Atualizar" quando quiser

## 📊 Indicadores da Interface

- **⏱️ Atualizado: DD/MM HH:MM** - Última atualização dos dados
- **🔄 Atualizar** - Buscar novos dados da API
- **⚠️ Aviso amarelo** - Usando dados em cache antigo
- **✅ Dados atualizados da API** - Dados frescos carregados
- **📦 Usando dados estáticos** - Fallback ativo

## ⚠️ Disclaimer

> **Este aplicativo é apenas para entretenimento.**
>
> A Mega-Sena é um jogo de azar. Os resultados são completamente aleatórios e este gerador não garante prêmios.
>
> Jogue com responsabilidade.

## 📚 Documentação Adicional

- [API-INTEGRATION.md](API-INTEGRATION.md) - Detalhes técnicos da integração com API
- [IMPLEMENTATION-SUMMARY.md](IMPLEMENTATION-SUMMARY.md) - Resumo da implementação
- [DEPLOY.md](DEPLOY.md) - Guia rápido de deployment

## 🤝 Contribuições

Contribuições são bem-vindas!

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/NovaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/NovaFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT.

---

<div align="center">

**Feito com 🍀 para apostadores brasileiros**

⭐ Se este projeto te ajudou, deixe uma estrela!

</div>
