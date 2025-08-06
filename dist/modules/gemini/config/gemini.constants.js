"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.INTENT_TYPES = exports.GEMINI_CONFIG = void 0;
exports.GEMINI_CONFIG = {
    PERFORMANCE_THRESHOLDS: {
        HIGH_PERFORMER: 75,
        NEEDS_HELP: 50,
        STRONG_SUBJECT: 75,
        WEAK_SUBJECT: 50,
        HIGH_ENGAGEMENT: 70,
        MEDIUM_ENGAGEMENT: 50,
        HIGH_SUCCESS_RATE: 85,
        LOW_SUCCESS_RATE: 40,
        EXCELLENT_SCORE: 80,
        POOR_SCORE: 60,
        GOOD_SCORE: 7,
        BAD_SCORE: 5,
        EXCELLENT_SCORE_DETAILED: 7.5,
    },
    API: {
        GEMINI_URL: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
        GENERATION_CONFIG: {
            temperature: 0.5,
            topP: 0.95,
            topK: 64,
        },
    },
    LIMITS: {
        TOP_ACTIVE_STUDENTS: 5,
        TOP_PERFORMERS: 5,
        STUDENTS_NEEDING_HELP: 5,
    },
    VIETNAMESE_REPLACEMENTS: {
        'phép trừ': 'ការដក',
        'phép cộng': 'ការបូក',
        'phép nhân': 'ការគុណ',
        'phép chia': 'ការចែក',
        'bé hơn': 'តូចជាង',
        'lớn hơn': 'ធំជាង',
        'bằng nhau': 'ស្មើគ្នា',
        'từ bé đến lớn': 'ពីតូចទៅធំ',
        'từ lớn đến bé': 'ពីធំទៅតូច',
    },
    ENGAGEMENT_LEVELS: {
        HIGH: 'ខ្ពស់',
        MEDIUM: 'មធ្យម',
        LOW: 'ទាប',
    },
};
exports.INTENT_TYPES = {
    STUDENT_ANALYSIS: 'student_analysis',
    CLASS_SUMMARY: 'class_summary',
    MATH_PERFORMANCE: 'math_performance',
    KHMER_PERFORMANCE: 'khmer_performance',
    SCIENCE_PERFORMANCE: 'science_performance',
    EXERCISE_ANALYSIS: 'exercise_analysis',
    TEACHING_MATERIALS: 'teaching_materials',
    ASSESSMENT: 'assessment',
    STUDENT_RANKING: 'student_ranking',
    SUBJECT_ACTIVITY: 'subject_activity',
    GENERAL: 'general',
};
//# sourceMappingURL=gemini.constants.js.map