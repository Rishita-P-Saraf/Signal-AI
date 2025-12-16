'use client';

import { useState, useCallback } from 'react';

interface UploadZoneProps {
    onUploadComplete: (fileId: string, fileName: string) => void;
    onUploadError: (error: string) => void;
}

export default function UploadZone({ onUploadComplete, onUploadError }: UploadZoneProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const uploadFile = async (file: File) => {
        setIsUploading(true);
        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (data.success) {
                onUploadComplete(data.fileId, data.fileName);
            } else {
                onUploadError(data.message || 'Upload failed');
            }
        } catch (error) {
            onUploadError('Failed to upload file');
        } finally {
            setIsUploading(false);
        }
    };

    const handleDrop = useCallback(async (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        const files = Array.from(e.dataTransfer.files);
        if (files.length > 0) {
            await uploadFile(files[0]);
        }
    }, []);

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            await uploadFile(files[0]);
        }
    };

    return (
        <div
            className={`glass-effect rounded-2xl p-8 transition-all duration-300 hover-lift ${isDragging ? 'border-2 border-primary scale-105' : ''
                }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <div className="text-center">
                <div className="mb-4">
                    <svg
                        className="mx-auto h-16 w-16 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                    </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Upload Customer Call Recording</h3>
                <p className="text-gray-400 mb-6">
                    Drag and drop an audio file here, or click to browse
                </p>
                <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    accept="audio/*"
                    onChange={handleFileSelect}
                    disabled={isUploading}
                />
                <label
                    htmlFor="file-upload"
                    className={`inline-block px-6 py-3 bg-gradient-to-r from-primary to-secondary rounded-lg font-medium cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 ${isUploading ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                >
                    {isUploading ? 'Uploading...' : 'Choose File'}
                </label>
                <p className="text-sm text-gray-500 mt-4">
                    Supported formats: MP3, WAV, M4A, WebM
                </p>
            </div>
        </div>
    );
}
