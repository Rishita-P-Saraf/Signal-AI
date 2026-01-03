# 🗺️ Signal AI - Product Roadmap

This document outlines the strategic direction for Signal AI, moving from a hackathon prototype to a production-grade enterprise solution.

## 🏁 Phase 1: Post-Hackathon Polish (Immediate - 2 Weeks)

Focus on stability, code quality, and error handling to ensure a robust foundation.

- [ ] **E2E Testing**: Add Cypress/Playwright tests for critical paths (Upload -> Analyze -> Slack).
- [ ] **Error Handling**: Improve UI feedback for network failures or API limits.
- [ ] **Code Cleanup**: Refactor huge components (e.g., `InsightCard.tsx`) into smaller sub-components.
- [ ] **Accessibility**: Ensure WCAG 2.1 AA compliance (aria-labels, keyboard nav).
- [ ] **SEO**: Add proper meta tags and Open Graph data for social sharing.

## 🛠️ Phase 2: MVP Launch (Medium Term - 1-2 Months)

Implementing core features required for a minimum viable product for a small team.

### User Management
- [ ] **Authentication**: Implement NextAuth.js (Google/GitHub login).
- [ ] **User Roles**: Admin vs. Viewer permissions.

### Data Persistence
- [ ] **Database**: Migrate from in-memory mock data to PostgreSQL (Supabase/Neon).
- [ ] **History**: Allow users to view past calls and historical insights.

### Enhanced Analysis
- [ ] **Custom Categories**: Allow users to define their own insight categories.
- [ ] **Search**: Full-text search across all transcribed calls.
- [ ] **Sentiment Analysis**: Add sentiment trend lines per call.

## 🚀 Phase 3: Enterprise Scale (Long Term - 6+ Months)

Scaling to handle thousands of calls for large organizations.

### Integrations
- [ ] **Clari/Gong**: Direct integration to pull recordings automatically.
- [ ] **Jira/Linear**: One-click "Create Ticket" from a bug report insight.
- [ ] **Salesforce/HubSpot**: Sync feature requests to customer records.

### Advanced AI
- [ ] **Custom Models**: Fine-tune Gemini on company-specific jargon and product names.
- [ ] **Speaker Diarization**: Distinctly separate Customer vs. Agent audio tracks.
- [ ] **Multi-language**: Support for 50+ languages with auto-detection.

### Analytics
- [ ] **Trend Dashboard**: "Feature Requests over Time" graphs.
- [ ] **Team Performance**: Agent coaching tips based on call analysis.

---

## 💡 R&D Ideas (Blue Sky)

- **Real-time Assist**: Live coaching for agents *during* the call.
- **Competitor Battlecards**: Auto-generated battlecards based on competitor mentions.
- **Voice Cloning**: (Experimental) Re-voice calls for privacy scrubbing.
