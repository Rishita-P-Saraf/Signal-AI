'use client';

import { ProcessingStatus } from '../types';

interface ProcessingStatusProps {
    status: ProcessingStatus;
}

export default function ProcessingStatusComponent({ status }: ProcessingStatusProps) {
    const stages = [
        { key: 'uploading', label: 'Uploading', icon: '📤' },
        { key: 'transcribing', label: 'Transcribing', icon: '🎙️' },
        { key: 'analyzing', label: 'Analyzing', icon: '🧠' },
        { key: 'complete', label: 'Complete', icon: '✅' },
    ];

    const currentStageIndex = stages.findIndex(s => s.key === status.stage);

    return (
        <div className="glass-effect rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Processing Status</h3>

            <div className="space-y-4">
                {stages.map((stage, index) => {
                    const isActive = index === currentStageIndex;
                    const isComplete = index < currentStageIndex || status.stage === 'complete';
                    const isError = status.stage === 'error' && isActive;

                    return (
                        <div key={stage.key} className="flex items-center gap-4">
                            <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center text-xl transition-all duration-300 ${isComplete
                                        ? 'bg-green-500'
                                        : isActive
                                            ? isError
                                                ? 'bg-red-500 animate-pulse'
                                                : 'bg-primary animate-pulse'
                                            : 'bg-gray-700'
                                    }`}
                            >
                                {isComplete ? '✓' : isError ? '✗' : stage.icon}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                    <span className={`font-medium ${isActive ? 'text-primary' : ''}`}>
                                        {stage.label}
                                    </span>
                                    {isActive && !isError && (
                                        <span className="text-sm text-gray-400">{status.progress}%</span>
                                    )}
                                </div>
                                {isActive && (
                                    <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                                        <div
                                            className={`h-full transition-all duration-300 ${isError ? 'bg-red-500' : 'bg-gradient-to-r from-primary to-secondary'
                                                }`}
                                            style={{ width: `${status.progress}%` }}
                                        ></div>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {status.message && (
                <div className={`mt-4 p-3 rounded-lg ${status.stage === 'error' ? 'bg-red-500 bg-opacity-20' : 'bg-blue-500 bg-opacity-20'
                    }`}>
                    <p className="text-sm">{status.message}</p>
                </div>
            )}
        </div>
    );
}
