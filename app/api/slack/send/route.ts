import { NextRequest, NextResponse } from 'next/server';
import { sendDailySummary, sendTestMessage } from '../../../lib/slack';
import { mockAnalysisResult } from '../../../lib/mockData';

export async function POST(request: NextRequest) {
    try {
        const { test, results } = await request.json();


        if (test) {
            await sendTestMessage();
            return NextResponse.json({
                success: true,
                message: 'Test message sent to Slack',
            });
        }


        const analysisResults = results || [mockAnalysisResult];
        await sendDailySummary(analysisResults);

        return NextResponse.json({
            success: true,
            message: 'Daily summary sent to Slack',
        });
    } catch (error) {
        console.error('Slack send error:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to send to Slack' },
            { status: 500 }
        );
    }
}
