# Google AdSense Setup Guide

## ✅ Completed Setup

### 1. AdSense Script Added
**File:** `index.html`

The AdSense script has been added to the HTML head:
```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9250566258923255"
     crossorigin="anonymous"></script>
```

### 2. Ads.txt File Created
**File:** `public/ads.txt`

The ads.txt file has been created with your publisher ID:
```
google.com, pub-9250566258923255, DIRECT, f08c47fec0942fa0
```

**Location:** The file is placed in the `public/` directory, which Vite automatically copies to the root of your deployed site during build.

### 3. Ad Placements Integrated
**File:** `src/components/MegaSenaPredictor.jsx`

Three strategic ad placements have been added:
- **Top Ad:** After header, before main content
- **Middle Ad:** After algorithm info section
- **Bottom Ad:** After disclaimer

### 4. Essential Pages Created
Required for AdSense approval:
- ✅ **Privacy Policy** (`/#/privacy`) - Details data collection and AdSense usage
- ✅ **About Us** (`/#/about`) - Explains site purpose and features
- ✅ **Contact** (`/#/contact`) - Provides contact information

---

## 📍 Ads.txt Verification

### After Deployment

Once you deploy, your ads.txt file will be accessible at:
```
https://megasena-anesagem.github.io/numeros-da-sorte/ads.txt
```

### How to Verify

1. **Deploy the site:**
   ```bash
   npm run deploy
   ```

2. **Wait 2-3 minutes** for GitHub Pages to update

3. **Visit the ads.txt URL directly:**
   ```
   https://megasena-anesagem.github.io/numeros-da-sorte/ads.txt
   ```

4. **Expected content:**
   ```
   google.com, pub-9250566258923255, DIRECT, f08c47fec0942fa0
   ```

5. **Google verification:**
   - Go to your AdSense dashboard
   - Navigate to Sites section
   - Google will automatically crawl and verify ads.txt
   - Verification typically takes 24-48 hours

---

## 🔍 Understanding ads.txt

### What is ads.txt?

The **Authorized Digital Sellers (ads.txt)** file is an IAB Tech Lab initiative that helps prevent ad fraud by allowing publishers to publicly declare who is authorized to sell their inventory.

### Your ads.txt Content Explained

```
google.com, pub-9250566258923255, DIRECT, f08c47fec0942fa0
```

Breaking down each field:

1. **`google.com`** - Ad system domain (Google AdSense)
2. **`pub-9250566258923255`** - Your unique publisher ID
3. **`DIRECT`** - Relationship type (you sell directly through Google)
4. **`f08c47fec0942fa0`** - Google's TAG ID (certification identifier)

### Why It's Required

- **Prevents Ad Fraud:** Verifies you're the legitimate owner
- **Increases Revenue:** Advertisers trust sites with ads.txt
- **AdSense Requirement:** Required for AdSense approval
- **Industry Standard:** Expected by all major ad networks

---

## 🚀 Deployment Instructions

### 1. Build with ads.txt
```bash
npm run build
```

This will:
- ✅ Build the React app
- ✅ Copy `public/ads.txt` to `dist/ads.txt`
- ✅ Copy all other public assets

### 2. Deploy to GitHub Pages
```bash
npm run deploy
```

This will:
- ✅ Push the `dist` folder to `gh-pages` branch
- ✅ Make ads.txt available at the root of your domain
- ✅ Update your live site

### 3. Verify Deployment

**Check ads.txt accessibility:**
```bash
curl https://megasena-anesagem.github.io/numeros-da-sorte/ads.txt
```

**Expected output:**
```
google.com, pub-9250566258923255, DIRECT, f08c47fec0942fa0
```

**Or visit in browser:**
```
https://megasena-anesagem.github.io/numeros-da-sorte/ads.txt
```

---

## 📋 Google AdSense Verification Steps

### In Your AdSense Dashboard

1. **Add Your Site:**
   - Go to AdSense → Sites
   - Click "Add site"
   - Enter: `megasena-anesagem.github.io`

2. **Verify Ownership:**
   - Google will detect the AdSense code in your HTML
   - Google will verify the ads.txt file
   - This can take 24-48 hours

3. **Check Status:**
   - Sites section will show verification status
   - Look for "Ready" status
   - If there are issues, Google will provide specific error messages

### Common Verification Issues

#### Issue: "ads.txt file not found"
**Solution:**
- Wait 24-48 hours after deployment
- Hard refresh: `Ctrl + F5`
- Clear DNS cache: `ipconfig /flushdns` (Windows)
- Verify URL directly in browser

#### Issue: "ads.txt file contains errors"
**Solution:**
- Check file format (no extra spaces or line breaks)
- Verify publisher ID matches exactly
- Ensure file encoding is UTF-8

#### Issue: "Site not ready for ads"
**Solution:**
- Ensure all essential pages are accessible
- Check that ads.txt is at root domain level
- Verify Privacy Policy mentions Google AdSense
- Make sure site has sufficient content

---

## 📁 File Structure

```
numeros-da-sorte/
├── public/
│   ├── ads.txt              ← AdSense verification file
│   ├── .nojekyll            ← GitHub Pages config
│   ├── favicon.svg          ← Site icon
│   └── qrcode_pix.jpg       ← PIX QR code
├── dist/                    (generated by build)
│   ├── ads.txt              ← Copied from public/
│   ├── index.html
│   └── assets/
└── src/
    ├── components/
    │   ├── AdSense.jsx      ← Ad component
    │   └── ...
    └── pages/
        ├── PrivacyPolicy.jsx
        ├── About.jsx
        └── Contact.jsx
```

---

## ✅ Verification Checklist

Before submitting to AdSense:

- [x] ads.txt file created in public/
- [x] ads.txt contains correct publisher ID
- [x] AdSense script in HTML head
- [x] Ad components integrated
- [x] Privacy Policy page created
- [x] About Us page created
- [x] Contact page created
- [x] Build includes ads.txt in dist/
- [ ] Deployed to GitHub Pages
- [ ] ads.txt accessible at root URL
- [ ] Site added to AdSense dashboard
- [ ] Google verification completed (wait 24-48h)

---

## 🔧 Troubleshooting

### ads.txt Not Showing After Deploy

1. **Clear cache:**
   ```bash
   # Hard refresh browser
   Ctrl + F5 (Windows)
   Cmd + Shift + R (Mac)
   ```

2. **Check build output:**
   ```bash
   npm run build
   ls dist/  # Should show ads.txt
   ```

3. **Verify public folder:**
   ```bash
   ls public/  # Should show ads.txt
   ```

4. **Force rebuild:**
   ```bash
   rm -rf dist/
   npm run build
   npm run deploy
   ```

### AdSense Not Approving Site

**Common reasons:**
- Site too new (needs to be live for 6+ months sometimes)
- Insufficient content (needs multiple pages with substantial content)
- Navigation issues (make sure all pages are accessible)
- Policy violations (gambling content may be restricted)
- ads.txt not properly configured

**Note about lottery sites:**
Google AdSense has strict policies about gambling and lottery content. While lottery prediction tools for entertainment are generally allowed, make sure:
- Clear disclaimers that it's for entertainment only
- No paid services or guarantees of winning
- Appropriate age restrictions mentioned
- Complies with local laws

---

## 📊 Expected Timeline

| Step | Duration |
|------|----------|
| Deploy with ads.txt | Immediate |
| GitHub Pages update | 1-3 minutes |
| ads.txt accessible | 2-5 minutes |
| Google crawls ads.txt | 24-48 hours |
| Site verification | 24-48 hours |
| AdSense approval | 1-7 days (varies) |

---

## 💡 Tips for Faster Approval

1. **Quality Content:**
   - Ensure all pages have substantial, unique content
   - Check for spelling and grammar
   - Make sure site is fully functional

2. **User Experience:**
   - Site loads quickly
   - Mobile-friendly design
   - Easy navigation
   - No broken links

3. **Transparency:**
   - Privacy Policy is comprehensive
   - About page explains site purpose
   - Contact information is visible

4. **Compliance:**
   - Follow Google's AdSense policies
   - Respect user privacy
   - Clear disclaimers about entertainment purpose

---

## 📞 Support

### Google AdSense Help

- **Help Center:** https://support.google.com/adsense
- **Community Forum:** https://support.google.com/adsense/community
- **Policy Center:** https://support.google.com/adsense/answer/48182

### Site-Specific Issues

If you encounter issues with the ads.txt file or AdSense integration on this site:
1. Check the build output: `npm run build`
2. Verify the deployment: Visit the ads.txt URL
3. Review the browser console for errors
4. Check AdSense dashboard for specific error messages

---

## 🎉 Summary

**What We Did:**
1. ✅ Created `public/ads.txt` with your publisher ID
2. ✅ Configured automatic copying to dist during build
3. ✅ Verified ads.txt is included in build output
4. ✅ AdSense script already in HTML
5. ✅ Ad placements already integrated
6. ✅ Essential pages already created

**Next Steps:**
1. Deploy: `npm run deploy`
2. Verify: Visit `https://megasena-anesagem.github.io/numeros-da-sorte/ads.txt`
3. Wait: Google will verify within 24-48 hours
4. Monitor: Check AdSense dashboard for approval status

**Your ads.txt is ready! Deploy and wait for Google verification.** 🚀

---

**Last Updated:** January 13, 2026
**Status:** ✅ Ready for Deployment
