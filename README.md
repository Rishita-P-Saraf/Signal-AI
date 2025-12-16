# 🎯 Signal AI - Customer Call Intelligence Platform

**VWO AI Hackathon 2025 Submission**

Signal AI is an AI-powered customer call analysis system that transforms call recordings into actionable insights. It automatically extracts feature requests, bug reports, competitor mentions, and case study opportunities from customer conversations, delivering daily summaries to Slack.

![Signal AI Dashboard](https://img.shields.io/badge/Status-Working%20Prototype-success)
![Powered by Gemini](https://img.shields.io/badge/AI-Google%20Gemini-blue)
![Next.js](https://img.shields.io/badge/Framework-Next.js%2014-black)

## 🚀 Business Value

### Problem Solved
- **Lost Feedback**: Only ~5% of customer calls are manually reviewed
- **Time-Consuming**: Manual call analysis takes hours per call
- **Missed Opportunities**: Competitive intelligence and upsell opportunities slip through
- **Delayed Response**: Bugs and feature requests take weeks to surface

### Solution Impact
- ✅ **100% Coverage**: Process every customer call automatically
- ✅ **Instant Insights**: Reduce time-to-insight from weeks to hours
- ✅ **Revenue Generation**: Identify feature requests that could unlock deals
- ✅ **Competitive Intelligence**: Track competitor mentions systematically
- ✅ **Customer Success**: Discover case study opportunities automatically

## ✨ Features

- 🎙️ **Audio Upload**: Drag-and-drop interface for call recordings
- 🧠 **AI Transcription**: Powered by Google Gemini API (free tier)
- 📊 **Smart Analysis**: Automatic categorization into:
  - 💡 Feature Requests
  - 🐛 Bug Reports
  - ⚔️ Competitor Mentions
  - ⭐ Case Study Opportunities
- 🎯 **Priority Scoring**: High/Medium/Low priority assignment
- 📈 **Interactive Dashboard**: Filter and search insights
- 💬 **Slack Integration**: Daily summaries delivered to your team
- 🎨 **Modern UI**: Glassmorphic design with smooth animations

## 🛠️ Technology Stack (100% Free)

- **Frontend/Backend**: Next.js 14 (React)
- **AI/ML**: Google Gemini API (free tier - 60 requests/min)
- **Notifications**: Slack Incoming Webhooks (free)
- **Styling**: Tailwind CSS
- **Deployment**: Vercel (free tier - 100GB bandwidth/month)
- **Language**: TypeScript

## 📋 Prerequisites

- Node.js 18+ installed
- Google Gemini API key (free)
- Slack workspace with webhook access (free)

## 🚀 Quick Start

### 1. Clone & Install

```bash
cd signal-ai
npm install
```

### 2. Get Your Free API Keys

#### Google Gemini API Key (Free)
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy your API key

#### Slack Webhook URL (Free)
1. Visit [Slack API](https://api.slack.com/messaging/webhooks)
2. Click "Create your Slack app"
3. Choose "From scratch"
4. Name your app "Signal AI" and select your workspace
5. Go to "Incoming Webhooks" and activate it
6. Click "Add New Webhook to Workspace"
7. Select a channel and authorize
8. Copy the webhook URL

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your keys:

```env
GEMINI_API_KEY=your_gemini_api_key_here
SLACK_WEBHOOK_URL=your_slack_webhook_url_here
DAILY_SUMMARY_TIME=09:00
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📖 Usage Guide

### Upload & Analyze Calls

1. **Upload Audio**: Drag and drop an audio file (MP3, WAV, M4A, WebM)
2. **Processing**: Watch real-time progress:
   - 📤 Uploading
   - 🎙️ Transcribing
   - 🧠 Analyzing
   - ✅ Complete
3. **View Insights**: Browse categorized insights in the dashboard
4. **Filter**: Use category and priority filters to find specific insights

### Send to Slack

1. Click "📤 Send to Slack" in the Daily Summary panel
2. View formatted summary in your Slack channel
3. Use "Test Slack Connection" to verify setup

### Demo Mode

The app includes mock data for demonstration:
- 8 sample insights across all categories
- Realistic customer quotes and metadata
- Pre-populated dashboard for immediate visual impact

## 🎨 Screenshots

### Dashboard
![Dashboard](docs/dashboard.png)

### Insights
![Insights](docs/insights.png)

### Slack Summary
![Slack](docs/slack.png)

## 🏗️ Project Structure

```
signal-ai/
├── app/
│   ├── api/              # API routes
│   │   ├── upload/       # File upload endpoint
│   │   ├── transcribe/   # Audio transcription
│   │   ├── analyze/      # Insight extraction
│   │   ├── insights/     # Get insights
│   │   └── slack/        # Slack integration
│   ├── components/       # React components
│   │   ├── UploadZone.tsx
│   │   ├── InsightCard.tsx
│   │   ├── ProcessingStatus.tsx
│   │   └── DailySummary.tsx
│   ├── lib/              # Utilities
│   │   ├── gemini.ts     # Gemini API integration
│   │   ├── slack.ts      # Slack webhook
│   │   └── mockData.ts   # Demo data
│   ├── types/            # TypeScript types
│   ├── page.tsx          # Main dashboard
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles
├── public/               # Static assets
├── .env.local.example    # Environment template
└── package.json
```

## 🚢 Deployment to Vercel (Free)

### Option 1: Deploy via GitHub

1. Push your code to GitHub
2. Visit [Vercel](https://vercel.com)
3. Click "Import Project"
4. Select your repository
5. Add environment variables:
   - `GEMINI_API_KEY`
   - `SLACK_WEBHOOK_URL`
6. Click "Deploy"

### Option 2: Deploy via CLI

```bash
npm install -g vercel
vercel login
vercel
```

Follow the prompts and add your environment variables when asked.

## 🧪 Testing

### Test Gemini Integration

```bash
# In the browser console
fetch('/api/transcribe', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ useMock: true })
}).then(r => r.json()).then(console.log)
```

### Test Slack Integration

Click "Test Slack Connection" button in the Daily Summary panel.

## 🎯 Hackathon Criteria Met

### ✅ Working Prototype
- Fully functional web application
- Real AI integration with Gemini
- Working Slack notifications
- Live demo available

### ✅ Clear Business Value
- **Revenue**: Identify feature requests → unlock deals
- **Cost Reduction**: Automate manual call review
- **Efficiency**: 100% call coverage vs. 5% manual
- **Customer Experience**: Faster bug resolution

### ✅ VWO-Specific
- Addresses real VWO customer feedback challenge
- Integrates with VWO's workflow (Slack)
- Scalable to VWO's call volume
- Complements existing VWO products

### ✅ Completed in Timeframe
- Working prototype delivered
- All core features implemented
- Deployed and accessible
- Documentation complete

## 🔮 Future Enhancements

- 🔗 **Clari Integration**: Direct integration with call recording platform
- 📅 **Scheduled Processing**: Automatic daily processing
- 📊 **Analytics Dashboard**: Trends and patterns over time
- 🔍 **Search**: Full-text search across transcriptions
- 👥 **Team Collaboration**: Assign insights to team members
- 🎯 **Custom Categories**: User-defined insight categories
- 📧 **Email Digests**: Alternative to Slack
- 🌐 **Multi-language**: Support for non-English calls

## 🤝 Contributing

This is a hackathon project, but suggestions are welcome!

## 📄 License

MIT License - feel free to use and modify

## 👨‍💻 Author

Built for VWO AI Hackathon 2025

## 🙏 Acknowledgments

- Google Gemini for powerful AI capabilities
- Slack for seamless integration
- Vercel for easy deployment
- VWO for the opportunity to innovate

---

**Made with ❤️ for VWO AI Hackathon 2025**
