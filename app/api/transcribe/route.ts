import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { transcribeAudio, generateMockTranscription } from '../../lib/gemini';

export async function POST(request: NextRequest) {
    try {
        const { fileId, useMock } = await request.json();

        // For demo purposes, use mock transcription if requested
        if (useMock) {
            const transcription = await generateMockTranscription();
            return NextResponse.json({
                success: true,
                transcription,
                id: `transcript-${Date.now()}`,
            });
        }

        if (!fileId) {
            return NextResponse.json(
                { success: false, message: 'No file ID provided' },
                { status: 400 }
            );
        }

        // Read the uploaded file
        const uploadsDir = join(process.cwd(), 'uploads');
        const files = await readFile(uploadsDir, 'utf-8').catch(() => null);

        // Find the file with matching ID
        const filePath = join(uploadsDir, fileId);
        const audioBuffer = await readFile(filePath);

        // Determine MIME type from file extension
        const extension = fileId.split('.').pop()?.toLowerCase();
        const mimeTypes: { [key: string]: string } = {
            'mp3': 'audio/mpeg',
            'wav': 'audio/wav',
            'mp4': 'audio/mp4',
            'm4a': 'audio/x-m4a',
            'webm': 'audio/webm',
        };
        const mimeType = mimeTypes[extension || ''] || 'audio/mpeg';

        // Transcribe using Gemini
        const transcription = await transcribeAudio(audioBuffer, mimeType);

        return NextResponse.json({
            success: true,
            transcription,
            id: `transcript-${Date.now()}`,
        });
    } catch (error) {
        console.error('Transcription error:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to transcribe audio' },
            { status: 500 }
        );
    }
}
