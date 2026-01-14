# 🚀 Mega-Sena Predictor - Guia de Deploy no GitHub Pages

Este guia explica como fazer o deploy do projeto no GitHub Pages e como mantê-lo atualizado.

## ✨ Novidades da Versão Atual

### 📊 Seção de Análise Estatística
- **Aba Frequência**: Gráfico de barras de todos os 60 números com tooltips
- **Aba Tendência Central**: Média, Mediana e Moda com explicações
- **Aba Dispersão**: Desvio Padrão, Variância, Box Plot visual
- **Aba Distribuição**: Gráficos de pizza (Pares/Ímpares, Baixos/Altos)

### 📋 Últimos Resultados
- Exibe os **10 últimos sorteios** com:
  - Número do concurso e data
  - Números sorteados (bolas visuais)
  - Premiação (6, 5 e 4 acertos)

---

## 📋 Pré-requisitos

- [Node.js](https://nodejs.org/) instalado (versão 18+)
- [Git](https://git-scm.com/) instalado
- Conta no [GitHub](https://github.com/)

---

## 🆕 Primeiro Deploy (Projeto Novo)

### 1. Criar Repositório no GitHub

1. Acesse [github.com/new](https://github.com/new)
2. Nome do repositório: `MegaSena-aneSageM` (ou outro nome)
3. Deixe como **Public**
4. **NÃO** inicialize com README
5. Clique em **Create repository**

### 2. Preparar o Projeto Local

```bash
# Extrair o projeto
unzip mega-sena-predictor.zip -d mega-sena-predictor
cd mega-sena-predictor

# Instalar dependências
npm install
```

### 3. Configurar o Base Path

Edite `vite.config.js` e altere o `base` para o nome do seu repositório:

```javascript
export default defineConfig({
  plugins: [react()],
  base: '/SEU-REPOSITORIO/'  // ← Altere aqui
})
```

### 4. Conectar ao GitHub

```bash
# Inicializar Git
git init

# Adicionar arquivos
git add .

# Primeiro commit
git commit -m "Initial commit - Mega-Sena Predictor"

# Conectar ao repositório remoto
git remote add origin https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git

# Enviar para o GitHub
git branch -M main
git push -u origin main
```

### 5. Fazer o Deploy

```bash
npm run deploy
```

Este comando:
- Executa `npm run build` (cria pasta `dist/`)
- Publica o conteúdo de `dist/` na branch `gh-pages`

### 6. Configurar GitHub Pages

1. Acesse seu repositório no GitHub
2. Vá em **Settings** → **Pages**
3. Em "Source", selecione:
   - Branch: `gh-pages`
   - Folder: `/ (root)`
4. Clique em **Save**

### 7. Acessar o Site

Aguarde 2-5 minutos e acesse:
```
https://SEU-USUARIO.github.io/SEU-REPOSITORIO/
```

---

## 🔄 Atualizando o Projeto

### Atualizar Código e Redeployar

```bash
# 1. Fazer alterações no código...

# 2. Salvar no branch main (recomendado)
git add .
git commit -m "Descrição das alterações"
git push origin main

# 3. Publicar alterações no site
npm run deploy
```

### Atualizar Apenas o Site (sem salvar código)

```bash
npm run deploy
```

> ⚠️ **Atenção:** Sempre faça commit no `main` para não perder seu código!

---

## 📊 Atualizando os Dados da Mega-Sena

### Passo 1: Baixar Novos Resultados

1. Acesse [loterias.caixa.gov.br](https://loterias.caixa.gov.br/Paginas/Mega-Sena.aspx)
2. Baixe o arquivo Excel com todos os resultados

### Passo 2: Executar Script de Atualização

```bash
python update_frequencies.py Mega-Sena-Numeros.xlsx
```

### Passo 3: Copiar Output para o Código

O script gera o código JavaScript atualizado. Copie e substitua no arquivo `MegaSenaPredictor.jsx`.

### Passo 4: Redeployar

```bash
git add .
git commit -m "Update lottery data - YYYY-MM-DD"
git push origin main
npm run deploy
```

---

## 📁 Estrutura do Projeto

```
mega-sena-predictor/
├── public/
│   ├── favicon.svg          # Ícone do site
│   ├── qrcode_pix.jpg       # QR Code para doações
│   └── ads.txt              # Verificação Google AdSense
├── src/
│   ├── components/
│   │   ├── MegaSenaPredictor.jsx  # Componente principal
│   │   ├── Footer.jsx             # Rodapé com links
│   │   └── AdSense.jsx            # Componente de anúncios
│   ├── hooks/
│   │   └── useLotteryData.js      # Hook para dados da API
│   ├── utils/
│   │   └── frequencies.js         # Cálculos de frequência
│   ├── pages/
│   │   ├── About.jsx              # Página Sobre
│   │   ├── Contact.jsx            # Página Contato
│   │   └── PrivacyPolicy.jsx      # Política de Privacidade
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## 📊 Componentes Principais

### MegaSenaPredictor.jsx
- **LotteryBall**: Bolas animadas dos números
- **StatisticsSection**: Análise estatística com 4 abas
  - Frequência (gráfico de barras)
  - Tendência Central (média, mediana, moda)
  - Dispersão (desvio padrão, variância, box plot)
  - Distribuição (gráficos de pizza)
- **LatestDraws**: Últimos 10 sorteios com premiação
- **DonationModal**: Modal de doação PIX

---

## 🛠️ Comandos Úteis

| Comando | Descrição |
|---------|-----------|
| `npm install` | Instala dependências |
| `npm run dev` | Inicia servidor local (http://localhost:5173) |
| `npm run build` | Cria build de produção |
| `npm run preview` | Preview do build local |
| `npm run deploy` | Deploy para GitHub Pages |

---

## ❓ Solução de Problemas

### Site mostra página em branco

1. Verifique se o `base` em `vite.config.js` está correto
2. Abra o Console do navegador (F12) e veja os erros
3. Certifique-se que a branch `gh-pages` existe

### Comando `npm run deploy` falha

```bash
# Limpar cache e reinstalar
rm -rf node_modules
npm install

# Tentar novamente
npm run deploy
```

### QR Code não aparece

Verifique se `qrcode_pix.jpg` está na pasta `public/`

### Erro de permissão no Git

```bash
# Configurar credenciais
git config --global user.email "seu@email.com"
git config --global user.name "Seu Nome"
```

---

## 🔗 Links Úteis

- [Documentação Vite](https://vitejs.dev/guide/static-deploy.html#github-pages)
- [GitHub Pages Docs](https://docs.github.com/en/pages)
- [Resultados Mega-Sena](https://loterias.caixa.gov.br/Paginas/Mega-Sena.aspx)

---

## 📝 Checklist de Deploy

- [ ] Repositório criado no GitHub
- [ ] `base` configurado em `vite.config.js`
- [ ] `npm install` executado
- [ ] `qrcode_pix.jpg` na pasta `public/`
- [ ] `ads.txt` na pasta `public/`
- [ ] Commit feito no branch `main`
- [ ] `npm run deploy` executado
- [ ] GitHub Pages configurado para branch `gh-pages`
- [ ] Site funcionando! 🎉

## ✅ Verificação Pós-Deploy

1. **Página Principal**: Carrega sem erros
2. **Gerar Números**: Funciona corretamente
3. **📊 Análise Estatística**:
   - [ ] Aba "Frequência" mostra gráfico de barras
   - [ ] Aba "Tendência Central" mostra média, mediana, moda
   - [ ] Aba "Dispersão" mostra box plot
   - [ ] Aba "Distribuição" mostra gráficos de pizza
4. **📋 Últimos Resultados**:
   - [ ] Mostra 10 sorteios recentes
   - [ ] Exibe premiação (6, 5, 4 acertos)
5. **Mega da Virada**: Tema roxo funciona
6. **Embaralhar**: Modo shuffle funciona
7. **Páginas**: Privacy, About, Contact acessíveis

---

**Boa sorte! 🍀**
