import { NextRequest, NextResponse } from 'next/server';
import { mockInsights } from '../../lib/mockData';
import { InsightCategory } from '../../types';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const category = searchParams.get('category') as InsightCategory | null;
        const priority = searchParams.get('priority');

        let insights = [...mockInsights];


        if (category && category !== 'all') {
            insights = insights.filter(i => i.category === category);
        }


        if (priority && priority !== 'all') {
            insights = insights.filter(i => i.priority === priority);
        }


        insights.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

        return NextResponse.json({
            success: true,
            insights,
            total: insights.length,
        });
    } catch (error) {
        console.error('Insights fetch error:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to fetch insights' },
            { status: 500 }
        );
    }
}
