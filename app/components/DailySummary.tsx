'use client';

import { useState } from 'react';
import { AnalysisResult } from '../types';

interface DailySummaryProps {
    results: AnalysisResult[];
}

export default function DailySummary({ results }: DailySummaryProps) {
    const [isSending, setIsSending] = useState(false);
    const [sendStatus, setSendStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const totalInsights = results.reduce((sum, r) => sum + r.totalInsights, 0);

    const handleSendToSlack = async () => {
        setIsSending(true);
        setSendStatus('idle');

        try {
            const response = await fetch('/api/slack/send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ results }),
            });

            const data = await response.json();

            if (data.success) {
                setSendStatus('success');
            } else {
                setSendStatus('error');
            }
        } catch (error) {
            setSendStatus('error');
        } finally {
            setIsSending(false);
        }
    };

    const handleTestSlack = async () => {
        setIsSending(true);
        setSendStatus('idle');

        try {
            const response = await fetch('/api/slack/send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ test: true }),
            });

            const data = await response.json();

            if (data.success) {
                setSendStatus('success');
            } else {
                setSendStatus('error');
            }
        } catch (error) {
            setSendStatus('error');
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div className="glass-effect rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">📊 Daily Summary</h3>
                <span className="text-sm text-gray-400">
                    {new Date().toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })}
                </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-black bg-opacity-30 rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold gradient-text">{totalInsights}</div>
                    <div className="text-sm text-gray-400 mt-1">Total Insights</div>
                </div>
                <div className="bg-black bg-opacity-30 rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold gradient-text">{results.length}</div>
                    <div className="text-sm text-gray-400 mt-1">Calls Analyzed</div>
                </div>
            </div>

            <div className="space-y-3 mb-6">
                {results.length > 0 && results[0].byCategory && (
                    <>
                        {Object.entries(results[0].byCategory).map(([category, count]) => {
                            if (count === 0) return null;

                            const categoryEmojis: { [key: string]: string } = {
                                feature_request: '💡',
                                bug: '🐛',
                                competitor: '⚔️',
                                case_study: '⭐',
                                other: '📝',
                            };

                            const categoryNames: { [key: string]: string } = {
                                feature_request: 'Feature Requests',
                                bug: 'Bugs & Issues',
                                competitor: 'Competitor Mentions',
                                case_study: 'Case Studies',
                                other: 'Other',
                            };

                            return (
                                <div key={category} className="flex items-center justify-between p-3 bg-black bg-opacity-20 rounded-lg">
                                    <span className="flex items-center gap-2">
                                        <span className="text-xl">{categoryEmojis[category]}</span>
                                        <span className="text-sm">{categoryNames[category]}</span>
                                    </span>
                                    <span className="font-semibold">{count}</span>
                                </div>
                            );
                        })}
                    </>
                )}
            </div>

            <div className="space-y-3">
                <button
                    onClick={handleSendToSlack}
                    disabled={isSending || results.length === 0}
                    className="w-full px-6 py-3 bg-gradient-to-r from-primary to-secondary rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSending ? 'Sending...' : '📤 Send to Slack'}
                </button>

                <button
                    onClick={handleTestSlack}
                    disabled={isSending}
                    className="w-full px-6 py-3 bg-gray-700 rounded-lg font-medium transition-all duration-300 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Test Slack Connection
                </button>
            </div>

            {sendStatus === 'success' && (
                <div className="mt-4 p-3 bg-green-500 bg-opacity-20 rounded-lg border border-green-500">
                    <p className="text-sm text-green-400">✅ Successfully sent to Slack!</p>
                </div>
            )}

            {sendStatus === 'error' && (
                <div className="mt-4 p-3 bg-red-500 bg-opacity-20 rounded-lg border border-red-500">
                    <p className="text-sm text-red-400">❌ Failed to send. Check your Slack webhook URL.</p>
                </div>
            )}
        </div>
    );
}
