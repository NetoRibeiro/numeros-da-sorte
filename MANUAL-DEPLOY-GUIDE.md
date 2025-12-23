# 🚀 Manual Deploy to GitHub Pages

This guide explains how to manually deploy your project to GitHub Pages when `npm run deploy` doesn't work properly.

---

## Prerequisites

- Project built with `npm run build`
- Git installed
- GitHub repository created

---

## Step-by-Step Manual Deploy

### 1. Build the Project

```powershell
npm run build
```

This creates the `dist` folder with your production files.

### 2. Navigate to dist Folder

```powershell
cd dist
```

### 3. Initialize Git Repository

```powershell
git init
```

### 4. Add All Files

```powershell
git add .
```

### 5. Create Commit

```powershell
git commit -m "Deploy to GitHub Pages"
```

### 6. Add Remote Origin

```powershell
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
```

> Replace `YOUR-USERNAME` and `YOUR-REPO` with your actual GitHub username and repository name.

### 7. Force Push to gh-pages Branch

```powershell
git push -f origin HEAD:gh-pages
```

### 8. Return to Project Root

```powershell
cd ..
```

---

## Configure GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under "Build and deployment":
   - Source: **Deploy from a branch**
   - Branch: **gh-pages** / **/ (root)**
4. Click **Save**
5. Wait 2-3 minutes

---

## Access Your Site

```
https://YOUR-USERNAME.github.io/YOUR-REPO/
```

---

## All Commands (Copy/Paste)

```powershell
npm run build
cd dist
git init
git add .
git commit -m "Deploy to GitHub Pages"
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
git push -f origin HEAD:gh-pages
cd ..
```

---

## Updating Your Site

Every time you make changes and want to update the live site:

```powershell
# 1. Build new version
npm run build

# 2. Go to dist
cd dist

# 3. Initialize git (fresh each time)
git init
git add .
git commit -m "Update site"

# 4. Add remote and push
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
git push -f origin HEAD:gh-pages

# 5. Return to project
cd ..
```

---

## Quick Update Script

Save this as `deploy.ps1` in your project root:

```powershell
# deploy.ps1 - Quick deploy script for PowerShell

Write-Host "🔨 Building project..." -ForegroundColor Cyan
npm run build

Write-Host "📦 Deploying to GitHub Pages..." -ForegroundColor Cyan
Set-Location dist
git init
git add .
git commit -m "Deploy $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
git push -f origin HEAD:gh-pages
Set-Location ..

Write-Host "✅ Deploy complete!" -ForegroundColor Green
Write-Host "🌐 Site: https://YOUR-USERNAME.github.io/YOUR-REPO/" -ForegroundColor Yellow
```

Run with:
```powershell
.\deploy.ps1
```

---

## Troubleshooting

### Error: remote origin already exists

```powershell
git remote remove origin
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
```

### Error: failed to push some refs

```powershell
git push -f origin HEAD:gh-pages
```

The `-f` flag forces the push and overwrites the remote branch.

### Site shows 404

1. Check if branch is set to `gh-pages` in Settings → Pages
2. Verify `base` in `vite.config.js` matches your repo name
3. Wait a few minutes for GitHub to process

### Site shows blank page

1. Open browser console (F12) for errors
2. Check if `base` path is correct in `vite.config.js`
3. Make sure `.nojekyll` file exists in `public` folder

---

## Important Notes

- Always run `npm run build` before deploying
- The `dist` folder is recreated each build
- Force push (`-f`) overwrites the entire gh-pages branch
- Changes take 2-5 minutes to appear on the live site

---

**Boa sorte! 🍀**
