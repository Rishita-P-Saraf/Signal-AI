import { GoogleGenerativeAI } from '@google/generative-ai';
import { Insight, InsightCategory, Priority, AnalysisResult } from '../types';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function transcribeAudio(audioBuffer: Buffer, mimeType: string): Promise<string> {
    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        const prompt = `You are transcribing a customer support call. Please provide a detailed, accurate transcription of the audio. Include speaker labels if possible (e.g., "Agent:", "Customer:").`;

        const result = await model.generateContent([
            {
                inlineData: {
                    data: audioBuffer.toString('base64'),
                    mimeType: mimeType,
                },
            },
            prompt,
        ]);

        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error('Transcription error:', error);
        throw new Error('Failed to transcribe audio');
    }
}

export async function analyzeTranscription(transcription: string, callId: string): Promise<AnalysisResult> {
    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        const prompt = `Analyze this customer call transcription and extract actionable insights. Categorize each insight into one of these categories:
- feature_request: Customer requesting new features or capabilities
- bug: Customer reporting issues, errors, or problems
- competitor: Customer mentioning competitor products or comparisons
- case_study: Positive feedback or success stories that could be case studies
- other: Any other notable insights

For each insight, provide:
1. Category
2. Priority (high/medium/low)
3. Title (brief summary)
4. Description (detailed explanation)
5. Quote (exact quote from the call)
6. Metadata (competitor name, feature name, bug severity, etc.)

Return the response as a JSON object with this structure:
{
  "insights": [
    {
      "category": "feature_request",
      "priority": "high",
      "title": "Request for dark mode",
      "description": "Customer wants dark mode for better usability at night",
      "quote": "I really wish you had a dark mode option",
      "metadata": {
        "featureName": "Dark Mode"
      }
    }
  ],
  "summary": "Overall summary of the call"
}

Transcription:
${transcription}`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();


        const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/) || text.match(/```\n([\s\S]*?)\n```/);
        const jsonText = jsonMatch ? jsonMatch[1] : text;

        const analysisData = JSON.parse(jsonText);

        // Add IDs and timestamps to insights
        const insights: Insight[] = analysisData.insights.map((insight: any, index: number) => ({
            id: `${callId}-${index}`,
            callId,
            timestamp: new Date().toISOString(),
            category: insight.category as InsightCategory,
            priority: insight.priority as Priority,
            title: insight.title,
            description: insight.description,
            quote: insight.quote,
            metadata: insight.metadata || {},
        }));

        // Count by category
        const byCategory = insights.reduce((acc, insight) => {
            acc[insight.category] = (acc[insight.category] || 0) + 1;
            return acc;
        }, {} as { [key in InsightCategory]: number });

        return {
            insights,
            summary: analysisData.summary,
            totalInsights: insights.length,
            byCategory,
        };
    } catch (error) {
        console.error('Analysis error:', error);
        throw new Error('Failed to analyze transcription');
    }
}

export async function generateMockTranscription(): Promise<string> {

    return `Agent: Thank you for calling VWO support. How can I help you today?

Customer: Hi, I've been using VWO for about 6 months now, and I really love it. But I'm having an issue with the A/B testing dashboard.

Agent: I'm glad to hear you're enjoying VWO! What seems to be the problem with the dashboard?

Customer: Well, whenever I try to export the test results to CSV, the page just freezes. I've tried it on Chrome and Firefox, same issue.

Agent: I see. That definitely sounds like a bug. Let me make a note of that. What version of the dashboard are you using?

Customer: I'm on the latest version, updated just last week.

Agent: Got it. I'll escalate this to our engineering team. Is there anything else I can help you with?

Customer: Actually, yes. I was comparing VWO with Optimizely the other day, and one thing they have that I really like is a dark mode. Any chance VWO could add that? I do a lot of late-night work and it would really help.

Agent: That's great feedback! I'll pass that feature request along to our product team. Dark mode is definitely something we've heard about before.

Customer: Awesome! Oh, and one more thing - we've had amazing results with VWO. Our conversion rate increased by 34% in the last quarter. I'd be happy to share our story if you're looking for case studies.

Agent: That's fantastic! A 34% increase is impressive. I'll have our marketing team reach out to you about a potential case study. Thank you so much for sharing that.

Customer: No problem! Thanks for your help with the bug issue.

Agent: You're welcome! We'll get that fixed as soon as possible. Have a great day!`;
}
