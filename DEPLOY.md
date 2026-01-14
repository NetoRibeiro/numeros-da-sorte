# Deployment Guide

## Quick Deploy

```bash
npm run deploy
```

This will:
1. Build the project (`npm run build`)
2. Deploy to GitHub Pages (`gh-pages -d dist`)

## What's New in This Version

### 📊 Statistical Analysis Section (NEW!)
- **Frequency Tab**: Full bar chart of all 60 numbers with hover tooltips
  - Color-coded: Yellow/orange for Top 10, Blue for Bottom 10
  - Top 10 Most Frequent and Least Frequent numbers with progress bars
- **Central Tendency Tab**: Mean, Median, and Mode calculations
  - Educational explanations in Portuguese
- **Dispersion Tab**:
  - Range (Amplitude), Standard Deviation, Variance, Coefficient of Variation
  - Visual Box Plot showing Q1, Median, Q3, Min, Max, and IQR
  - Interpretive text based on statistical values
- **Distribution Tab**:
  - Range distribution bar chart (1-10, 11-20, 21-30, 31-40, 41-50, 51-60)
  - Pie charts for Odd vs Even and Low vs High (1-30 vs 31-60)
  - Summary statistics with total draws and probability info

### 📋 Latest Results Section (NEW!)
- Displays the **latest 10 lottery draws**
- Shows for each draw:
  - Contest number and date: "Resultado: Concurso # (DD/MM/YYYY)"
  - Numbers displayed as lottery balls
  - Prize information (Premiação):
    - 6 acertos: Winners count and prize (or "Acumulou!" if jackpot)
    - 5 acertos: Winners count and prize
    - 4 acertos: Winners count and prize
- Adapts styling for Mega-Sena (green) and Mega da Virada (purple) modes

### Daily Updates at 02:02 AM 🕐
- Smart cache expiration at 02:02 AM daily
- 70-80% reduction in API calls
- Enhanced UI with cache age display
- Next update time indicator
- Cache versioning system

### Google AdSense Integration 💰
- AdSense script in HTML head
- Strategic ad placements (top, middle, bottom)
- Auto-responsive ad format

### Essential Pages for AdSense ✓
- Privacy Policy page
- About Us page
- Contact page
- Footer with page links

### API Integration ✨
- Real-time data from Mega-Sena APIs
- Automatic updates with daily cache
- Manual refresh button
- Loading states and error handling

### Enhanced Features
- Dynamic frequency calculations
- Live statistics with visual charts
- Cache age display ("há X horas")
- Next update time ("amanhã às 02:02")
- Fallback to static data if APIs fail

## Verify After Deploy

1. Visit your GitHub Pages URL: `https://megasena-anesagem.github.io/numeros-da-sorte/`
2. Check browser console for any errors
3. Verify the page loads correctly (not blank)
4. Test navigation to essential pages (Privacy, About, Contact)
5. Verify "Atualizado:" shows cache age (e.g., "há 3 horas")
6. Check "Próxima atualização:" shows next update time
7. Test the "🔄 Atualizar" refresh button
8. Generate some predictions to verify functionality
9. **NEW**: Scroll down to verify "📊 Análise Estatística" section loads
   - Test all 4 tabs: Frequência, Tendência Central, Dispersão, Distribuição
   - Hover over bar chart numbers to see tooltips
10. **NEW**: Verify "📋 Últimos Resultados" section shows 10 draws
    - Check prize information (Premiação) displays correctly
11. Switch to "Mega da Virada" mode and verify statistics adapt (purple theme)

## Important: GitHub Pages Routing Fix

**Issue:** Blank page after deployment with React Router.

**Solution:** Changed from `BrowserRouter` to `HashRouter` in `src/App.jsx`.

**How it works:**
- `BrowserRouter`: Uses clean URLs like `/privacy` (requires server-side routing)
- `HashRouter`: Uses hash URLs like `/#/privacy` (works on static hosts like GitHub Pages)

**URLs after fix:**
- Home: `https://megasena-anesagem.github.io/numeros-da-sorte/`
- Privacy: `https://megasena-anesagem.github.io/numeros-da-sorte/#/privacy`
- About: `https://megasena-anesagem.github.io/numeros-da-sorte/#/about`
- Contact: `https://megasena-anesagem.github.io/numeros-da-sorte/#/contact`

## Google AdSense Verification

### ads.txt File
The ads.txt file has been added to verify your site with Google AdSense.

**Location:** `public/ads.txt` (automatically copied to root during build)

**After deployment, verify it's accessible:**
```
https://megasena-anesagem.github.io/numeros-da-sorte/ads.txt
```

**Expected content:**
```
google.com, pub-9250566258923255, DIRECT, f08c47fec0942fa0
```

**Google verification timeline:**
- File is accessible: Immediate (after deployment)
- Google crawls file: 24-48 hours
- Site approval: 1-7 days (varies)

For detailed AdSense setup information, see [ADSENSE_SETUP.md](ADSENSE_SETUP.md)

## Troubleshooting

### Build Fails
```bash
npm install
npm run build
```

### Deploy Fails
```bash
# Check GitHub Pages settings
# Repository > Settings > Pages
# Source: gh-pages branch
```

### API Not Loading
- Check browser console
- Verify internet connection
- App will use cached/static data as fallback

## Files Structure

```
dist/
├── index.html          # Main HTML
├── assets/
│   ├── index-*.js     # Main JS bundle (includes API code, statistics)
│   └── index-*.css    # Styles
├── qrcode_pix.jpg     # PIX QR code
└── ads.txt            # Google AdSense verification
```

## Components Overview

```
src/components/MegaSenaPredictor.jsx
├── LotteryBall          # Animated lottery ball display
├── StatisticsSection    # NEW: Statistical analysis with 4 tabs
│   ├── Frequency Tab    # Bar chart, Top/Bottom 10
│   ├── Central Tab      # Mean, Median, Mode
│   ├── Dispersion Tab   # Std Dev, Variance, Box Plot
│   └── Distribution Tab # Range bars, Pie charts
├── LatestDraws          # NEW: Last 10 draws with prizes
├── DonationModal        # PIX donation popup
└── Main Predictor UI    # Number generation interface
```

## Monitoring

After deployment, monitor:
- API fetch success rate (browser Network tab)
- Cache hit rate (localStorage)
- User experience (loading times)
- Error rates (console errors)

---

**Ready to deploy!** Just run `npm run deploy` 🚀
