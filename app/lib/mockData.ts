import { Insight, InsightCategory, Priority, AnalysisResult } from '../types';

export const mockInsights: Insight[] = [
    {
        id: 'mock-1',
        category: InsightCategory.FEATURE_REQUEST,
        priority: Priority.HIGH,
        title: 'Dark Mode Request',
        description: 'Customer requested dark mode for better usability during late-night work sessions',
        quote: 'I do a lot of late-night work and it would really help to have a dark mode',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        callId: 'call-001',
        customerName: 'Sarah Johnson',
        metadata: {
            featureName: 'Dark Mode',
        },
    },
    {
        id: 'mock-2',
        category: InsightCategory.BUG,
        priority: Priority.HIGH,
        title: 'CSV Export Freezing',
        description: 'Dashboard freezes when attempting to export A/B test results to CSV format',
        quote: 'Whenever I try to export the test results to CSV, the page just freezes',
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
        callId: 'call-001',
        customerName: 'Sarah Johnson',
        metadata: {
            bugSeverity: 'High - Blocks critical workflow',
        },
    },
    {
        id: 'mock-3',
        category: InsightCategory.CASE_STUDY,
        priority: Priority.HIGH,
        title: '34% Conversion Rate Increase',
        description: 'Customer achieved 34% conversion rate increase using VWO, willing to participate in case study',
        quote: 'Our conversion rate increased by 34% in the last quarter. I\'d be happy to share our story',
        timestamp: new Date(Date.now() - 3.5 * 60 * 60 * 1000).toISOString(),
        callId: 'call-001',
        customerName: 'Sarah Johnson',
        metadata: {
            caseStudyPotential: 'High - Quantifiable results, willing participant',
        },
    },
    {
        id: 'mock-4',
        category: InsightCategory.COMPETITOR,
        priority: Priority.MEDIUM,
        title: 'Optimizely Comparison',
        description: 'Customer comparing VWO with Optimizely, specifically mentioned their dark mode feature',
        quote: 'I was comparing VWO with Optimizely the other day, and one thing they have that I really like is a dark mode',
        timestamp: new Date(Date.now() - 3.2 * 60 * 60 * 1000).toISOString(),
        callId: 'call-001',
        customerName: 'Sarah Johnson',
        metadata: {
            competitorName: 'Optimizely',
        },
    },
    {
        id: 'mock-5',
        category: InsightCategory.FEATURE_REQUEST,
        priority: Priority.MEDIUM,
        title: 'Mobile App for Dashboard',
        description: 'Customer wants a dedicated mobile app to check test results on the go',
        quote: 'It would be great to have a mobile app so I can check my test results while traveling',
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
        callId: 'call-002',
        customerName: 'Michael Chen',
        metadata: {
            featureName: 'Mobile App',
        },
    },
    {
        id: 'mock-6',
        category: InsightCategory.BUG,
        priority: Priority.MEDIUM,
        title: 'Slow Loading on Large Datasets',
        description: 'Dashboard becomes slow when loading tests with more than 100k visitors',
        quote: 'The dashboard gets really sluggish when I\'m looking at tests with over 100,000 visitors',
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
        callId: 'call-003',
        customerName: 'Emily Rodriguez',
        metadata: {
            bugSeverity: 'Medium - Performance issue',
        },
    },
    {
        id: 'mock-7',
        category: InsightCategory.COMPETITOR,
        priority: Priority.LOW,
        title: 'Google Optimize Sunset',
        description: 'Customer mentioned migrating from Google Optimize after its sunset',
        quote: 'We moved from Google Optimize when they shut it down, and VWO has been great',
        timestamp: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(),
        callId: 'call-004',
        customerName: 'David Park',
        metadata: {
            competitorName: 'Google Optimize',
        },
    },
    {
        id: 'mock-8',
        category: InsightCategory.FEATURE_REQUEST,
        priority: Priority.LOW,
        title: 'Slack Integration for Alerts',
        description: 'Customer wants Slack notifications when test reaches statistical significance',
        quote: 'Can you send a Slack notification when a test becomes statistically significant?',
        timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
        callId: 'call-005',
        customerName: 'Lisa Thompson',
        metadata: {
            featureName: 'Slack Notifications',
        },
    },
];

export const mockAnalysisResult: AnalysisResult = {
    insights: mockInsights,
    summary: 'Analysis of 5 customer calls revealed 8 key insights including 3 feature requests, 2 bugs, 2 competitor mentions, and 1 case study opportunity.',
    totalInsights: mockInsights.length,
    byCategory: {
        [InsightCategory.FEATURE_REQUEST]: 3,
        [InsightCategory.BUG]: 2,
        [InsightCategory.COMPETITOR]: 2,
        [InsightCategory.CASE_STUDY]: 1,
        [InsightCategory.OTHER]: 0,
    },
};

export function generateRandomInsight(): Insight {
    const categories = Object.values(InsightCategory);
    const priorities = Object.values(Priority);
    const category = categories[Math.floor(Math.random() * categories.length)];
    const priority = priorities[Math.floor(Math.random() * priorities.length)];

    const templates = {
        [InsightCategory.FEATURE_REQUEST]: [
            { title: 'API Rate Limit Increase', description: 'Customer needs higher API rate limits for enterprise usage' },
            { title: 'Custom Reporting Dashboard', description: 'Request for customizable reporting with drag-and-drop widgets' },
            { title: 'SSO Integration', description: 'Customer wants Single Sign-On with their identity provider' },
        ],
        [InsightCategory.BUG]: [
            { title: 'Session Recording Playback Issue', description: 'Recordings occasionally fail to load in Safari browser' },
            { title: 'Heatmap Data Mismatch', description: 'Click counts in heatmap don\'t match analytics data' },
            { title: 'Email Notification Delays', description: 'Test completion emails arrive 2-3 hours late' },
        ],
        [InsightCategory.COMPETITOR]: [
            { title: 'AB Tasty Comparison', description: 'Customer evaluating AB Tasty alongside VWO' },
            { title: 'Convert.com Pricing', description: 'Customer mentioned Convert.com has lower pricing' },
            { title: 'Hotjar Integration', description: 'Customer using Hotjar for session recordings' },
        ],
        [InsightCategory.CASE_STUDY]: [
            { title: 'E-commerce Revenue Boost', description: 'Online retailer increased revenue by 45% using VWO' },
            { title: 'SaaS Signup Optimization', description: 'SaaS company doubled free trial signups' },
            { title: 'Lead Generation Success', description: 'B2B company improved lead quality by 60%' },
        ],
        [InsightCategory.OTHER]: [
            { title: 'Training Request', description: 'Customer wants advanced training for their team' },
            { title: 'Documentation Feedback', description: 'Customer found documentation helpful but wants video tutorials' },
        ],
    };

    const template = templates[category][Math.floor(Math.random() * templates[category].length)];

    return {
        id: `random-${Date.now()}-${Math.random()}`,
        category,
        priority,
        title: template.title,
        description: template.description,
        quote: `This is a sample quote from the customer call about ${template.title.toLowerCase()}`,
        timestamp: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toISOString(),
        callId: `call-${Math.floor(Math.random() * 100)}`,
        customerName: ['John Doe', 'Jane Smith', 'Alex Johnson', 'Maria Garcia'][Math.floor(Math.random() * 4)],
        metadata: {},
    };
}
