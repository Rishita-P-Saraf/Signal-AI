import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json(
                { success: false, message: 'No file provided' },
                { status: 400 }
            );
        }


        const validTypes = ['audio/mpeg', 'audio/wav', 'audio/mp4', 'audio/webm', 'audio/x-m4a'];
        if (!validTypes.includes(file.type)) {
            return NextResponse.json(
                { success: false, message: 'Invalid file type. Please upload an audio file.' },
                { status: 400 }
            );
        }


        const uploadsDir = join(process.cwd(), 'uploads');
        if (!existsSync(uploadsDir)) {
            await mkdir(uploadsDir, { recursive: true });
        }


        const fileId = `${Date.now()}-${Math.random().toString(36).substring(7)}`;
        const fileName = file.name;
        const fileExtension = fileName.split('.').pop();
        const filePath = join(uploadsDir, `${fileId}.${fileExtension}`);


        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        await writeFile(filePath, buffer);

        return NextResponse.json({
            success: true,
            fileId,
            fileName,
            message: 'File uploaded successfully',
        });
    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to upload file' },
            { status: 500 }
        );
    }
}

