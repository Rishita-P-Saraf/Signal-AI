'use client';

import { useState, useEffect } from 'react';
import UploadZone from './components/UploadZone';
import InsightCard from './components/InsightCard';
import ProcessingStatusComponent from './components/ProcessingStatus';
import DailySummary from './components/DailySummary';
import { Insight, InsightCategory, Priority, ProcessingStatus, AnalysisResult } from './types';
import { mockInsights, mockAnalysisResult } from './lib/mockData';

export default function Home() {
    const [insights, setInsights] = useState<Insight[]>(mockInsights);
    const [processingStatus, setProcessingStatus] = useState<ProcessingStatus | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<InsightCategory | 'all'>('all');
    const [selectedPriority, setSelectedPriority] = useState<Priority | 'all'>('all');
    const [analysisResults, setAnalysisResults] = useState<AnalysisResult[]>([mockAnalysisResult]);

    const handleUploadComplete = async (fileId: string, fileName: string) => {
        setProcessingStatus({
            stage: 'transcribing',
            progress: 30,
            message: `Transcribing ${fileName}...`,
        });

        try {
            const transcribeResponse = await fetch('/api/transcribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ fileId, useMock: true }),
            });

            const transcribeData = await transcribeResponse.json();

            if (!transcribeData.success) {
                throw new Error('Transcription failed');
            }

            setProcessingStatus({
                stage: 'analyzing',
                progress: 60,
                message: 'Analyzing transcription for insights...',
            });

            const analyzeResponse = await fetch('/api/analyze', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    transcription: transcribeData.transcription,
                    callId: fileId,
                }),
            });

            const analyzeData = await analyzeResponse.json();

            if (!analyzeData.success) {
                throw new Error('Analysis failed');
            }

            setProcessingStatus({
                stage: 'complete',
                progress: 100,
                message: `Found ${analyzeData.totalInsights} insights!`,
            });

            setInsights(prev => [...analyzeData.insights, ...prev]);
            setAnalysisResults(prev => [...prev, analyzeData]);

            setTimeout(() => setProcessingStatus(null), 3000);
        } catch (error) {
            setProcessingStatus({
                stage: 'error',
                progress: 0,
                message: 'Processing failed. Please try again.',
            });
        }
    };

    const handleUploadError = (error: string) => {
        setProcessingStatus({
            stage: 'error',
            progress: 0,
            message: error,
        });
    };

    const filteredInsights = insights.filter(insight => {
        if (selectedCategory !== 'all' && insight.category !== selectedCategory) {
            return false;
        }
        if (selectedPriority !== 'all' && insight.priority !== selectedPriority) {
            return false;
        }
        return true;
    });

    const categoryCount = (category: InsightCategory) => {
        return insights.filter(i => i.category === category).length;
    };

    return (
        <main className="min-h-screen p-8 relative z-10">
            <div className="max-w-7xl mx-auto">

                <div className="text-center mb-16 relative">

                    <div className="absolute -top-10 left-1/4 w-40 h-40 bg-neon-blue rounded-full blur-3xl opacity-20 float"></div>
                    <div className="absolute -top-10 right-1/4 w-40 h-40 bg-neon-purple rounded-full blur-3xl opacity-20 float" style={{ animationDelay: '2s' }}></div>

                    <div className="relative">
                        <h1 className="text-8xl font-bold mb-6 relative inline-block">
                            <span className="gradient-text">Signal AI</span>
                            <div className="absolute -top-6 -right-10 w-5 h-5 bg-neon-blue rounded-full animate-ping"></div>
                            <div className="absolute -bottom-2 -left-8 w-3 h-3 bg-neon-pink rounded-full animate-pulse"></div>
                        </h1>
                    </div>

                    <p className="text-2xl text-gray-300 mb-8 font-light max-w-3xl mx-auto">
                        Transform customer calls into <span className="text-neon-blue font-semibold">actionable insights</span> with AI-powered analysis
                    </p>

                    <div className="flex items-center justify-center gap-6 mt-10">
                        <div className="flex items-center gap-3 px-8 py-4 glass-effect rounded-full neon-border shimmer hover-lift">
                            <div className="w-3 h-3 bg-success rounded-full animate-pulse glow"></div>
                            <span className="text-sm font-semibold tracking-wide">Powered by Gemini AI</span>
                        </div>
                        <div className="flex items-center gap-3 px-8 py-4 glass-effect rounded-full neon-border shimmer hover-lift">
                            <span className="text-2xl">💬</span>
                            <span className="text-sm font-semibold tracking-wide">Slack Integration</span>
                        </div>
                    </div>
                </div>


                <div className="mb-12">
                    <UploadZone
                        onUploadComplete={handleUploadComplete}
                        onUploadError={handleUploadError}
                    />
                </div>


                {processingStatus && (
                    <div className="mb-12">
                        <ProcessingStatusComponent status={processingStatus} />
                    </div>
                )}


                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    <div className="lg:col-span-2">
                        <div className="glass-effect rounded-3xl p-8 mb-8 scan-lines relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-96 h-96 bg-neon-purple rounded-full blur-3xl opacity-10"></div>
                            <div className="absolute bottom-0 left-0 w-96 h-96 bg-neon-blue rounded-full blur-3xl opacity-10"></div>

                            <div className="relative z-10">
                                <div className="flex items-center gap-4 mb-8">
                                    <span className="text-5xl">📈</span>
                                    <h2 className="text-4xl font-bold gradient-text">Insights Dashboard</h2>
                                </div>


                                <div className="flex flex-wrap gap-6 mb-10">
                                    <div className="flex-1 min-w-[200px]">
                                        <label className="block text-sm text-gray-400 mb-3 font-semibold uppercase tracking-wider">Category</label>
                                        <select
                                            value={selectedCategory}
                                            onChange={(e) => setSelectedCategory(e.target.value as any)}
                                            className="w-full px-6 py-4 glass-effect rounded-xl border-2 border-neon-blue border-opacity-30 focus:border-opacity-100 focus:outline-none transition-all duration-300 font-medium text-lg hover-lift"
                                        >
                                            <option value="all">All Categories</option>
                                            <option value={InsightCategory.FEATURE_REQUEST}>
                                                💡 Feature Requests ({categoryCount(InsightCategory.FEATURE_REQUEST)})
                                            </option>
                                            <option value={InsightCategory.BUG}>
                                                🐛 Bugs ({categoryCount(InsightCategory.BUG)})
                                            </option>
                                            <option value={InsightCategory.COMPETITOR}>
                                                ⚔️ Competitors ({categoryCount(InsightCategory.COMPETITOR)})
                                            </option>
                                            <option value={InsightCategory.CASE_STUDY}>
                                                ⭐ Case Studies ({categoryCount(InsightCategory.CASE_STUDY)})
                                            </option>
                                        </select>
                                    </div>

                                    <div className="flex-1 min-w-[200px]">
                                        <label className="block text-sm text-gray-400 mb-3 font-semibold uppercase tracking-wider">Priority</label>
                                        <select
                                            value={selectedPriority}
                                            onChange={(e) => setSelectedPriority(e.target.value as any)}
                                            className="w-full px-6 py-4 glass-effect rounded-xl border-2 border-neon-purple border-opacity-30 focus:border-opacity-100 focus:outline-none transition-all duration-300 font-medium text-lg hover-lift"
                                        >
                                            <option value="all">All Priorities</option>
                                            <option value={Priority.HIGH}>🔴 High</option>
                                            <option value={Priority.MEDIUM}>🟡 Medium</option>
                                            <option value={Priority.LOW}>🟢 Low</option>
                                        </select>
                                    </div>
                                </div>


                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
                                    <div className="glass-effect rounded-2xl p-6 text-center hover-lift neon-border relative overflow-hidden group">
                                        <div className="absolute inset-0 bg-gradient-to-br from-neon-blue to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                                        <div className="text-4xl font-bold gradient-text mb-2">{insights.length}</div>
                                        <div className="text-xs text-gray-400 uppercase tracking-widest font-semibold">Total Insights</div>
                                    </div>
                                    <div className="glass-effect rounded-2xl p-6 text-center hover-lift neon-border relative overflow-hidden group">
                                        <div className="absolute inset-0 bg-gradient-to-br from-error to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                                        <div className="text-4xl font-bold text-error mb-2">
                                            {insights.filter(i => i.priority === Priority.HIGH).length}
                                        </div>
                                        <div className="text-xs text-gray-400 uppercase tracking-widest font-semibold">High Priority</div>
                                    </div>
                                    <div className="glass-effect rounded-2xl p-6 text-center hover-lift neon-border relative overflow-hidden group">
                                        <div className="absolute inset-0 bg-gradient-to-br from-neon-blue to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                                        <div className="text-4xl font-bold text-neon-blue mb-2">
                                            {categoryCount(InsightCategory.FEATURE_REQUEST)}
                                        </div>
                                        <div className="text-xs text-gray-400 uppercase tracking-widest font-semibold">Features</div>
                                    </div>
                                    <div className="glass-effect rounded-2xl p-6 text-center hover-lift neon-border relative overflow-hidden group">
                                        <div className="absolute inset-0 bg-gradient-to-br from-success to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                                        <div className="text-4xl font-bold text-success mb-2">
                                            {categoryCount(InsightCategory.CASE_STUDY)}
                                        </div>
                                        <div className="text-xs text-gray-400 uppercase tracking-widest font-semibold">Case Studies</div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="space-y-6">
                            {filteredInsights.length > 0 ? (
                                filteredInsights.map(insight => (
                                    <InsightCard key={insight.id} insight={insight} />
                                ))
                            ) : (
                                <div className="glass-effect rounded-2xl p-16 text-center neon-border">
                                    <p className="text-xl text-gray-400">No insights found matching your filters.</p>
                                </div>
                            )}
                        </div>
                    </div>


                    <div className="lg:col-span-1 space-y-6">
                        <DailySummary results={analysisResults} />


                        <div className="glass-effect rounded-2xl p-8 neon-border hover-lift">
                            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                <span className="text-3xl">ℹ️</span>
                                <span className="gradient-text">How It Works</span>
                            </h3>
                            <ol className="space-y-4 text-sm">
                                <li className="flex gap-4 items-start">
                                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-neon-blue bg-opacity-20 flex items-center justify-center font-bold text-neon-blue">1</span>
                                    <span className="text-gray-300 pt-1">Upload customer call recordings (audio files)</span>
                                </li>
                                <li className="flex gap-4 items-start">
                                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-neon-purple bg-opacity-20 flex items-center justify-center font-bold text-neon-purple">2</span>
                                    <span className="text-gray-300 pt-1">AI transcribes and analyzes the conversation</span>
                                </li>
                                <li className="flex gap-4 items-start">
                                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-neon-pink bg-opacity-20 flex items-center justify-center font-bold text-neon-pink">3</span>
                                    <span className="text-gray-300 pt-1">Insights are automatically categorized</span>
                                </li>
                                <li className="flex gap-4 items-start">
                                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-success bg-opacity-20 flex items-center justify-center font-bold text-success">4</span>
                                    <span className="text-gray-300 pt-1">Daily summaries sent to your Slack channel</span>
                                </li>
                            </ol>
                        </div>


                        <div className="glass-effect rounded-2xl p-8 border-2 border-warning border-opacity-40 hover-lift relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-warning rounded-full blur-3xl opacity-10"></div>
                            <div className="relative z-10">
                                <h3 className="text-xl font-bold mb-3 flex items-center gap-3">
                                    <span className="text-2xl">🎯</span>
                                    <span className="text-warning">Demo Mode</span>
                                </h3>
                                <p className="text-sm text-gray-300 leading-relaxed">
                                    This is a working prototype using mock data. Upload any audio file to see the AI analysis in action!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
