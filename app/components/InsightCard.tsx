'use client';

import { Insight, InsightCategory, Priority } from '../types';

interface InsightCardProps {
    insight: Insight;
}

const categoryColors = {
    [InsightCategory.FEATURE_REQUEST]: 'from-neon-blue via-blue-500 to-indigo-600',
    [InsightCategory.BUG]: 'from-error via-red-500 to-pink-600',
    [InsightCategory.COMPETITOR]: 'from-neon-purple via-purple-500 to-violet-600',
    [InsightCategory.CASE_STUDY]: 'from-success via-green-500 to-emerald-600',
    [InsightCategory.OTHER]: 'from-gray-500 to-slate-600',
};

const categoryBorderColors = {
    [InsightCategory.FEATURE_REQUEST]: 'border-neon-blue',
    [InsightCategory.BUG]: 'border-error',
    [InsightCategory.COMPETITOR]: 'border-neon-purple',
    [InsightCategory.CASE_STUDY]: 'border-success',
    [InsightCategory.OTHER]: 'border-gray-500',
};

const categoryIcons = {
    [InsightCategory.FEATURE_REQUEST]: '💡',
    [InsightCategory.BUG]: '🐛',
    [InsightCategory.COMPETITOR]: '⚔️',
    [InsightCategory.CASE_STUDY]: '⭐',
    [InsightCategory.OTHER]: '📝',
};

const categoryLabels = {
    [InsightCategory.FEATURE_REQUEST]: 'Feature Request',
    [InsightCategory.BUG]: 'Bug Report',
    [InsightCategory.COMPETITOR]: 'Competitor',
    [InsightCategory.CASE_STUDY]: 'Case Study',
    [InsightCategory.OTHER]: 'Other',
};

const priorityColors = {
    [Priority.HIGH]: 'bg-error shadow-error',
    [Priority.MEDIUM]: 'bg-warning shadow-warning',
    [Priority.LOW]: 'bg-success shadow-success',
};

const priorityGlow = {
    [Priority.HIGH]: 'shadow-lg shadow-error/50',
    [Priority.MEDIUM]: 'shadow-lg shadow-warning/50',
    [Priority.LOW]: 'shadow-lg shadow-success/50',
};

export default function InsightCard({ insight }: InsightCardProps) {
    const timeAgo = (timestamp: string) => {
        const now = new Date();
        const then = new Date(timestamp);
        const diffMs = now.getTime() - then.getTime();
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

        if (diffHours < 1) return 'Just now';
        if (diffHours < 24) return `${diffHours}h ago`;
        const diffDays = Math.floor(diffHours / 24);
        return `${diffDays}d ago`;
    };

    return (
        <div className={`glass-effect rounded-2xl p-8 hover-lift relative overflow-hidden group border-2 ${categoryBorderColors[insight.category]} border-opacity-30`}>
            {/* Background gradient on hover */}
            <div className={`absolute inset-0 bg-gradient-to-br ${categoryColors[insight.category]} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>

            {/* Scan line effect */}
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-neon-blue to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <span className="text-4xl">{categoryIcons[insight.category]}</span>
                        <div>
                            <span className={`inline-block px-4 py-2 rounded-xl text-sm font-bold bg-gradient-to-r ${categoryColors[insight.category]} text-white shadow-lg`}>
                                {categoryLabels[insight.category]}
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className={`w-3 h-3 rounded-full ${priorityColors[insight.priority]} animate-pulse`}></span>
                        <span className="text-xs text-gray-400 uppercase tracking-widest font-bold">{insight.priority}</span>
                    </div>
                </div>

                <h3 className="text-2xl font-bold mb-4 text-white">{insight.title}</h3>
                <p className="text-gray-300 text-base mb-6 leading-relaxed">{insight.description}</p>

                <div className={`glass-effect rounded-xl p-5 mb-6 border-l-4 ${categoryBorderColors[insight.category]} relative overflow-hidden`}>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-neon-blue rounded-full blur-3xl opacity-5"></div>
                    <p className="text-base italic text-gray-200 relative z-10">"{insight.quote}"</p>
                </div>

                <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center text-white font-bold text-xs">
                            {insight.customerName?.charAt(0) || 'A'}
                        </div>
                        <span className="text-gray-400 font-medium">{insight.customerName || 'Anonymous'}</span>
                    </div>
                    <span className="text-gray-500 font-medium">{timeAgo(insight.timestamp)}</span>
                </div>

                {insight.metadata && Object.keys(insight.metadata).length > 0 && (
                    <div className="mt-6 pt-6 border-t border-gray-700 border-opacity-50">
                        <div className="grid grid-cols-1 gap-2">
                            {Object.entries(insight.metadata).map(([key, value]) => (
                                <div key={key} className="flex items-center gap-2 text-sm">
                                    <span className="text-neon-blue font-semibold">
                                        {key.replace(/([A-Z])/g, ' $1').trim()}:
                                    </span>
                                    <span className="text-gray-300">{value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
