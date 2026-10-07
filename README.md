# Messboi - ডিজিটাল মেস ব্যবস্থাপনা (Digital Mess Management)

Official landing page and distribution website for **Messboi** — the 100% offline smart mess management Android application.

---

## 📦 Project Structure

```
Messboi-Website/
├── index.html            # Main landing page (Bangla UI, themes, calculator, reviews)
├── style.css             # Comprehensive stylesheet with 9 custom color themes
├── script.js             # Interactive logic: themes, calculator, lightbox, reviews, download toast
├── images/               # Logos, hero mockups, screenshot showcases
│   ├── logo.png
│   ├── screenshot-1.png ... screenshot-4.png
│   └── themes/           # Custom theme preview wallpapers
├── releases/             # Official GitHub Release asset (v1.0.0 • messboi.apk • 23.1 MB)
└── Messboi-Website.zip   # Complete portable website zip package
```

---

## 🚀 How to Add and Push to GitHub

If you want to push this repository and the website zip archive to your GitHub account:

### 1. Initialize & Commit Locally (Already done)
```bash
git init
git add .
git commit -m "Initial commit: Messboi website with themes, calculator, and ZIP package"
```

### 2. Create a new repository on GitHub
1. Go to [https://github.com/new](https://github.com/new)
2. Enter a repository name, e.g., `Messboi-Website`
3. Leave it Public or Private, and do not initialize with README (since we already have one)
4. Click **Create repository**

### 3. Connect and Push to GitHub
Run the following commands in your terminal:

```bash
# Rename branch to main
git branch -M main

# Add your GitHub remote URL (replace YOUR-USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR-USERNAME/Messboi-Website.git

# Push code to GitHub
git push -u origin main
```

---

## ⚡ Direct Uploading via GitHub Web Interface
1. Create a repository on GitHub.
2. Click **Add file** -> **Upload files**.
3. Drag and drop `Messboi-Website.zip` or the files directly.
4. Click **Commit changes**.
5. You can also upload `Messboi-Website.zip` under **Releases** -> **Draft a new release**.

---

## 🌐 Deploying to Free Hosting (GitHub Pages / Vercel / Netlify)

### Option A: GitHub Pages
1. In your GitHub repository, go to **Settings** -> **Pages**.
2. Under **Build and deployment** -> **Branch**, select `main` branch and `/ (root)`.
3. Click **Save**. Your site will be live at `https://YOUR-USERNAME.github.io/Messboi-Website/`!

### Option B: Vercel / Netlify
1. Import the GitHub repository into Vercel or Netlify.
2. Framework preset: **Other** or **Vite**.
3. Deploy in 1 click!

---

## 🔐 Official Verified Build Hash (SHA-256)
- **APK Checksum**: `sha256:d72d6e503badcbd1ef00753e8c5f5b7241d98be9c657c9cd384fc59ce9831ffe`
- **Version**: 1.0.0
- **Platform**: Android (100% Offline, Privacy First)

---

## 📄 License & Credits
© 2024 - 2026 Messboi. All rights reserved.
Office: Talaimari Mor, Rajshahi-6204, Bangladesh.
Hotline: 01410-332309 / 09613-656060
Email: anasexp@gmail.com
