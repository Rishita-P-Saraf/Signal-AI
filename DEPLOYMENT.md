# 🚀 Deploying Signal AI to Vercel

## Quick Deployment Guide

### Option 1: Deploy via Vercel Website (Easiest - Recommended)

This is the fastest way and doesn't require any command line tools.

#### Step 1: Push to GitHub

1. **Create a GitHub repository**
   - Go to https://github.com/new
   - Name it: `signal-ai-vwo-hackathon`
   - Make it public
   - Don't initialize with README (we already have files)

2. **Push your code to GitHub**
   ```bash
   cd "c:\Users\rishi\Desktop\Wingify\AI Hackathon\signal-ai"
   git init
   git add .
   git commit -m "Initial commit - Signal AI for VWO Hackathon"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/signal-ai-vwo-hackathon.git
   git push -u origin main
   ```

#### Step 2: Deploy on Vercel

1. **Go to Vercel**
   - Visit https://vercel.com
   - Click "Sign Up" (use GitHub account)

2. **Import Project**
   - Click "Add New..." → "Project"
   - Select your GitHub repository: `signal-ai-vwo-hackathon`
   - Click "Import"

3. **Configure Project**
   - Framework Preset: **Next.js** (auto-detected)
   - Root Directory: `./` (leave as is)
   - Build Command: `npm run build` (auto-filled)
   - Output Directory: `.next` (auto-filled)

4. **Add Environment Variables** (Optional for now)
   - Click "Environment Variables"
   - Add these if you have them:
     - `GEMINI_API_KEY` = your_gemini_key
     - `SLACK_WEBHOOK_URL` = your_slack_webhook
   - **Note**: The app works without these (uses mock data)

5. **Deploy!**
   - Click "Deploy"
   - Wait 2-3 minutes for build
   - You'll get a live URL like: `https://signal-ai-vwo-hackathon.vercel.app`

---

### Option 2: Deploy via Vercel CLI

If you prefer command line:

#### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

#### Step 2: Login to Vercel

```bash
vercel login
```

This will open your browser to authenticate.

#### Step 3: Deploy

```bash
cd "c:\Users\rishi\Desktop\Wingify\AI Hackathon\signal-ai"
vercel
```

Follow the prompts:
- Set up and deploy? **Y**
- Which scope? Select your account
- Link to existing project? **N**
- What's your project's name? `signal-ai-vwo-hackathon`
- In which directory is your code located? `./`
- Want to override settings? **N**

#### Step 4: Add Environment Variables (Optional)

```bash
vercel env add GEMINI_API_KEY
vercel env add SLACK_WEBHOOK_URL
```

Then redeploy:
```bash
vercel --prod
```

---

## 🎯 After Deployment

### You'll Get:

1. **Preview URL**: `https://signal-ai-xxx.vercel.app`
2. **Production URL**: `https://signal-ai-vwo-hackathon.vercel.app`

### Share Your Project:

✅ **Live Demo**: Share the Vercel URL
✅ **GitHub Repo**: Share your repository
✅ **Both together**: Perfect for hackathon submission!

---

## 📝 Important Notes

### Mock Data Works Without API Keys

Your app will work perfectly on Vercel even without API keys because:
- ✅ Mock data is pre-loaded (8 insights)
- ✅ All UI features work
- ✅ Filters and interactions work
- ✅ Perfect for demo!

### To Enable Full AI Features Later

1. Get free API keys:
   - **Gemini**: https://makersuite.google.com/app/apikey
   - **Slack**: https://api.slack.com/messaging/webhooks

2. Add to Vercel:
   - Go to your project dashboard
   - Settings → Environment Variables
   - Add the keys
   - Redeploy

---

## 🔧 Troubleshooting

### Build Fails?

**Check these:**
- Make sure `package.json` has all dependencies
- Run `npm run build` locally first to test
- Check Vercel build logs for errors

### Page Not Loading?

- Wait 2-3 minutes after deployment
- Clear browser cache
- Try incognito mode

### Environment Variables Not Working?

- Make sure they're added in Vercel dashboard
- Redeploy after adding variables
- Check variable names match exactly

---

## ✅ Deployment Checklist

- [ ] Code is ready (it is!)
- [ ] Choose deployment method (GitHub or CLI)
- [ ] Create Vercel account
- [ ] Deploy project
- [ ] Test the live URL
- [ ] Share URL in hackathon submission
- [ ] (Optional) Add API keys for full features

---

## 🎉 Benefits of Vercel Deployment

✅ **Free hosting** - No credit card required
✅ **Automatic HTTPS** - Secure by default
✅ **Global CDN** - Fast worldwide
✅ **Auto-deploy** - Push to GitHub = auto-deploy
✅ **Preview URLs** - Every commit gets a preview
✅ **Professional URL** - Looks great in presentations

---

**Ready to deploy? Follow Option 1 (GitHub + Vercel website) - it's the easiest!** 🚀
