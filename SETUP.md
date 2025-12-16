# 🚀 Signal AI - Setup Guide

## Prerequisites Installation

### 1. Install Node.js

Signal AI requires Node.js 18 or higher.

**Download and Install:**
1. Visit [https://nodejs.org/](https://nodejs.org/)
2. Download the LTS version (recommended)
3. Run the installer
4. Verify installation:
   ```bash
   node --version
   npm --version
   ```

### 2. Get Free API Keys

#### Google Gemini API Key
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy your API key

#### Slack Webhook URL
1. Visit [Slack API](https://api.slack.com/messaging/webhooks)
2. Click "Create your Slack app"
3. Choose "From scratch"
4. Name: "Signal AI", select your workspace
5. Go to "Incoming Webhooks" → Activate
6. Click "Add New Webhook to Workspace"
7. Select a channel → Authorize
8. Copy the webhook URL

## Installation Steps

### 1. Navigate to Project Directory

```bash
cd "c:\Users\rishi\Desktop\Wingify\AI Hackathon\signal-ai"
```

### 2. Install Dependencies

```bash
npm install
```

This will install:
- Next.js 14
- React 18
- Google Generative AI SDK
- Slack Webhook SDK
- TypeScript
- Tailwind CSS
- And all other dependencies

### 3. Configure Environment Variables

Create `.env.local` file:

```bash
copy .env.local.example .env.local
```

Edit `.env.local` and add your keys:

```env
GEMINI_API_KEY=your_actual_gemini_api_key_here
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/WEBHOOK/URL
DAILY_SUMMARY_TIME=09:00
```

### 4. Run Development Server

```bash
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000)

## Troubleshooting

### "npm is not recognized"
- Node.js is not installed or not in PATH
- Restart your terminal after installing Node.js
- Or use the full path: `C:\Program Files\nodejs\npm.cmd install`

### "Module not found" errors
- Run `npm install` again
- Delete `node_modules` folder and `package-lock.json`, then run `npm install`

### Gemini API errors
- Verify your API key is correct in `.env.local`
- Check you have free quota remaining
- Try using mock mode (automatically enabled for demo)

### Slack webhook errors
- Verify webhook URL is correct
- Test with "Test Slack Connection" button
- Check webhook is still active in Slack settings

## Quick Demo (Without Audio Upload)

The app includes mock data, so you can explore it immediately:

1. Start the dev server: `npm run dev`
2. Open [http://localhost:3000](http://localhost:3000)
3. View pre-populated insights in the dashboard
4. Test Slack integration with "Test Slack Connection"
5. Click "Send to Slack" to see formatted summary

## Next Steps

1. ✅ Install Node.js
2. ✅ Get API keys
3. ✅ Run `npm install`
4. ✅ Configure `.env.local`
5. ✅ Run `npm run dev`
6. ✅ Test the application
7. ✅ Deploy to Vercel (optional)

## Deployment to Vercel

Once everything works locally:

```bash
npm install -g vercel
vercel login
vercel
```

Add environment variables in Vercel dashboard:
- `GEMINI_API_KEY`
- `SLACK_WEBHOOK_URL`

## Support

For issues or questions:
- Check the main [README.md](README.md)
- Review error messages in browser console
- Verify all environment variables are set correctly
