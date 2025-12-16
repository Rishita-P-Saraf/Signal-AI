import { NextRequest, NextResponse } from 'next/server';
import { analyzeTranscription } from '../../lib/gemini';

export async function POST(request: NextRequest) {
    try {
        const { transcription, callId } = await request.json();

        if (!transcription) {
            return NextResponse.json(
                { success: false, message: 'No transcription provided' },
                { status: 400 }
            );
        }

        const analysisResult = await analyzeTranscription(
            transcription,
            callId || `call-${Date.now()}`
        );

        return NextResponse.json({
            success: true,
            ...analysisResult,
        });
    } catch (error) {
        console.error('Analysis error:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to analyze transcription' },
            { status: 500 }
        );
    }
}
