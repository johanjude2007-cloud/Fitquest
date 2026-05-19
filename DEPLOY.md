# 🏋️ FitQuest — Deploy to iPhone (GitHub Pages PWA)

## What you'll get
A link like `https://YOUR_USERNAME.github.io/fitquest` that installs as a real app icon on iPhone.

---

## Step 1 — Create a GitHub repo

1. Go to [github.com](https://github.com) → click **+** → **New repository**
2. Name it exactly: `fitquest`
3. Set it to **Public**
4. Click **Create repository**

---

## Step 2 — Add your secret API keys

In your new repo go to **Settings → Secrets and variables → Actions → New repository secret** and add these two:

| Name | Value |
|------|-------|
| `VITE_BLINK_PROJECT_ID` | `fitquest-app-mobile-p413g8h5` |
| `VITE_BLINK_PUBLISHABLE_KEY` | `blnk_pk_Sl3q1sRVGHkxlb1lCHFujyoyCShNw1ry` |

---

## Step 3 — Enable GitHub Pages

In your repo go to **Settings → Pages**:
- Source: **GitHub Actions**
- Click Save

---

## Step 4 — Push the code

Extract the zip, then run these commands in your terminal:

```bash
cd fitquest-mobile-app-main
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/fitquest.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

---

## Step 5 — Wait ~2 minutes

Go to your repo → **Actions** tab. You'll see the deploy running.
When it's green ✅ your app is live at:

**`https://YOUR_USERNAME.github.io/fitquest`**

---

## Step 6 — Install on iPhone

1. Open Safari on your iPhone
2. Go to `https://YOUR_USERNAME.github.io/fitquest`
3. Tap the **Share** button (box with arrow pointing up)
4. Tap **"Add to Home Screen"**
5. Tap **Add**

FitQuest will appear on your home screen like a real app! 🎉

---

## Share with friends

Just send them the link: `https://YOUR_USERNAME.github.io/fitquest`
They do the same Step 6 on their iPhones.
