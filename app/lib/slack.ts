import { IncomingWebhook } from '@slack/webhook';
import { Insight, InsightCategory, AnalysisResult } from '../types';

const webhook = process.env.SLACK_WEBHOOK_URL
    ? new IncomingWebhook(process.env.SLACK_WEBHOOK_URL)
    : null;

const categoryEmojis = {
    [InsightCategory.FEATURE_REQUEST]: '💡',
    [InsightCategory.BUG]: '🐛',
    [InsightCategory.COMPETITOR]: '⚔️',
    [InsightCategory.CASE_STUDY]: '⭐',
    [InsightCategory.OTHER]: '📝',
};

const categoryNames = {
    [InsightCategory.FEATURE_REQUEST]: 'Feature Requests',
    [InsightCategory.BUG]: 'Bugs & Issues',
    [InsightCategory.COMPETITOR]: 'Competitor Mentions',
    [InsightCategory.CASE_STUDY]: 'Case Study Opportunities',
    [InsightCategory.OTHER]: 'Other Insights',
};

const priorityEmojis = {
    high: '🔴',
    medium: '🟡',
    low: '🟢',
};

export async function sendDailySummary(results: AnalysisResult[]): Promise<void> {
    if (!webhook) {
        console.warn('Slack webhook not configured');
        return;
    }

    // Aggregate all insights
    const allInsights = results.flatMap(r => r.insights);

    // Group by category
    const insightsByCategory = allInsights.reduce((acc, insight) => {
        if (!acc[insight.category]) {
            acc[insight.category] = [];
        }
        acc[insight.category].push(insight);
        return acc;
    }, {} as { [key in InsightCategory]: Insight[] });

    // Sort insights by priority within each category
    Object.keys(insightsByCategory).forEach(category => {
        insightsByCategory[category as InsightCategory].sort((a, b) => {
            const priorityOrder = { high: 0, medium: 1, low: 2 };
            return priorityOrder[a.priority] - priorityOrder[b.priority];
        });
    });

    const blocks: any[] = [
        {
            type: 'header',
            text: {
                type: 'plain_text',
                text: '📊 Daily Customer Insights Summary',
                emoji: true,
            },
        },
        {
            type: 'section',
            text: {
                type: 'mrkdwn',
                text: `*Date:* ${new Date().toLocaleDateString()}\n*Total Insights:* ${allInsights.length} from ${results.length} calls`,
            },
        },
        {
            type: 'divider',
        },
    ];

    // Add sections for each category
    Object.entries(insightsByCategory).forEach(([category, insights]) => {
        if (insights.length === 0) return;

        const categoryKey = category as InsightCategory;
        blocks.push({
            type: 'section',
            text: {
                type: 'mrkdwn',
                text: `*${categoryEmojis[categoryKey]} ${categoryNames[categoryKey]}* (${insights.length})`,
            },
        });

        // Show top 3 insights per category
        insights.slice(0, 3).forEach(insight => {
            blocks.push({
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: `${priorityEmojis[insight.priority]} *${insight.title}*\n${insight.description}\n_"${insight.quote}"_`,
                },
            });
        });

        if (insights.length > 3) {
            blocks.push({
                type: 'context',
                elements: [
                    {
                        type: 'mrkdwn',
                        text: `_+${insights.length - 3} more ${categoryNames[categoryKey].toLowerCase()}_`,
                    },
                ],
            });
        }

        blocks.push({
            type: 'divider',
        });
    });

    // Add call to action
    blocks.push({
        type: 'section',
        text: {
            type: 'mrkdwn',
            text: '🔗 *View full details in Signal AI Dashboard*',
        },
    });

    try {
        await webhook.send({
            text: `Daily Customer Insights Summary - ${allInsights.length} insights from ${results.length} calls`,
            blocks,
        });
        console.log('Daily summary sent to Slack successfully');
    } catch (error) {
        console.error('Failed to send Slack message:', error);
        throw error;
    }
}

export async function sendTestMessage(): Promise<void> {
    if (!webhook) {
        throw new Error('Slack webhook not configured');
    }

    await webhook.send({
        text: '✅ Signal AI is connected to Slack!',
        blocks: [
            {
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: '*✅ Signal AI Connection Test*\n\nYour Slack integration is working correctly! You\'ll receive daily summaries here.',
                },
            },
        ],
    });
}

export function formatInsightForSlack(insight: Insight): string {
    return `${priorityEmojis[insight.priority]} *${insight.title}*\n${insight.description}\n_"${insight.quote}"_`;
}
