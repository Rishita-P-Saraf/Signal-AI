export enum InsightCategory {
    FEATURE_REQUEST = 'feature_request',
    BUG = 'bug',
    COMPETITOR = 'competitor',
    CASE_STUDY = 'case_study',
    OTHER = 'other'
}

export enum Priority {
    HIGH = 'high',
    MEDIUM = 'medium',
    LOW = 'low'
}

export interface Insight {
    id: string;
    category: InsightCategory;
    priority: Priority;
    title: string;
    description: string;
    quote: string;
    timestamp: string;
    callId: string;
    customerName?: string;
    metadata?: {
        competitorName?: string;
        featureName?: string;
        bugSeverity?: string;
        caseStudyPotential?: string;
    };
}

export interface Transcription {
    id: string;
    text: string;
    duration?: number;
    timestamp: string;
    fileName: string;
}

export interface AnalysisResult {
    insights: Insight[];
    summary: string;
    totalInsights: number;
    byCategory: {
        [key in InsightCategory]: number;
    };
}

export interface SlackMessage {
    text: string;
    blocks: SlackBlock[];
}

export interface SlackBlock {
    type: string;
    text?: {
        type: string;
        text: string;
    };
    fields?: Array<{
        type: string;
        text: string;
    }>;
    accessory?: any;
}

export interface UploadResponse {
    success: boolean;
    fileId: string;
    fileName: string;
    message?: string;
}

export interface ProcessingStatus {
    stage: 'uploading' | 'transcribing' | 'analyzing' | 'complete' | 'error';
    progress: number;
    message: string;
}
