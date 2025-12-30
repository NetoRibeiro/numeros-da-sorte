# Deployment Guide

## Quick Deploy

```bash
npm run deploy
```

This will:
1. Build the project (`npm run build`)
2. Deploy to GitHub Pages (`gh-pages -d dist`)

## What's New in This Version

### API Integration ✨
- Real-time data from Mega-Sena APIs
- Automatic updates with 1-hour cache
- Manual refresh button
- Loading states and error handling

### Enhanced Features
- Dynamic frequency calculations
- Live statistics
- Last update timestamp
- Fallback to static data if APIs fail

## Verify After Deploy

1. Visit your GitHub Pages URL
2. Check browser console for any errors
3. Verify "Atualizado:" shows recent timestamp
4. Test the "🔄 Atualizar" refresh button
5. Generate some predictions to verify functionality

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
│   ├── index-*.js     # Main JS bundle (includes API code)
│   └── index-*.css    # Styles
└── qrcode_pix.jpg     # PIX QR code
```

## Monitoring

After deployment, monitor:
- API fetch success rate (browser Network tab)
- Cache hit rate (localStorage)
- User experience (loading times)
- Error rates (console errors)

---

**Ready to deploy!** Just run `npm run deploy` 🚀
