# 🎯 Signal AI - Customer Call Intelligence

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen.svg)](https://signal-ai-xi.vercel.app/)
[![Powered by Gemini](https://img.shields.io/badge/AI-Google%20Gemini-blue)](https://deepmind.google/technologies/gemini/)
[![VWO Hackathon](https://img.shields.io/badge/VWO-Hackathon%202025-purple)]()

> Transform customer calls into actionable insights instantly.

## � Live Demo
**[https://signal-ai-xi.vercel.app/](https://signal-ai-xi.vercel.app/)**

---

## 1. Problem Statement

In today's high-volume customer support environment, valuable feedback is lost in the noise.
*   **95% of customer calls** are never analyzed for strategic insights.
*   **Manual review is slow**, taking hours to listen to and tag a single call.
*   **Critical signals are missed**, such as feature requests, churn risks, and competitor mentions.
*   **Feedback loops are broken**, with product teams rarely hearing the "voice of the customer" directly.

## 2. Solution Overview

**Signal AI** is an automated intelligence layer for your customer support stack. It ingests audio recordings, transcribes them using Google's Gemini AI, and extracts structured insights automatically.

*   **🎙️ Auto-Transcription**: Converts audio to text with high accuracy.
*   **🧠 Intelligent Analysis**: Identifies Feature Requests, Bugs, Competitor Mentions, and Case Study opportunities.
*   **📊 Structured Data**: Turns unstructured conversation into categorized, prioritized JSON data.
*   **💬 Slack Integration**: Pushes daily summaries directly to your team's workspace.

## 3. Architecture

Signal AI uses a serverless Next.js architecture powered by Google Gemini 1.5 Flash for speed and cost-efficiency.

<img width="789" height="884" alt="image" src="https://github.com/user-attachments/assets/bf0a2a8e-10a5-4abf-b896-e4eec39a6b4e" />

### Tech Stack
*   **Frontend**: Next.js 14, Tailwind CSS, Framer Motion (animations)
*   **Backend**: Next.js API Routes (Serverless)
*   **AI Engine**: Google Generative AI SDK (Gemini 1.5 Flash)
*   **Integration**: Slack Incoming Webhooks

## 4. How the Prototype Works

1.  **Upload**: The user drags and drops a customer call recording (MP3/WAV) into the Upload Zone.
2.  **Processing**:
    *   The file is sent to the backend.
    *   Gemini AI transcribes the audio.
    *   Gemini AI analyzes the text to find specific insights (Bugs, Features, etc.).
3.  **Visualization**: The dashboard updates in real-time to show:
    *   A breakdown of insights by category.
    *   Priority levels (High/Medium/Low).
    *   Direct quotes from the customer.
4.  **Action**: The user clicks "Send to Slack" to post a formatted summary of the day's insights to their team channel.

> **Note**: For the hackathon demo, if no API key is present, the system gracefully falls back to a "Demo Mode" using pre-generated mock data to demonstrate the UI and flow.

## 5. Code & Setup

### Prerequisites
*   Node.js 18+
*   Google Gemini API Key
*   Slack Webhook URL

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/signal-ai.git

# Install dependencies
npm install

# Configure environment
cp .env.local.example .env.local
# Add your GEMINI_API_KEY and SLACK_WEBHOOK_URL to .env.local

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

### Project Structure
*   `app/page.tsx`: Main dashboard and UI logic.
*   `app/api/`: Serverless endpoints for file handling and AI processing.
*   `app/lib/gemini.ts`: Integration with Google Gemini SDK.
*   `app/lib/slack.ts`: Slack webhook formatter and sender.
*   `app/components/`: Reusable UI components (UploadZone, InsightCard, etc.).

---

**Built for VWO AI Hackathon 2025**
