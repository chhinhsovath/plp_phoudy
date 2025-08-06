export declare const GEMINI_CONFIG: {
    readonly PERFORMANCE_THRESHOLDS: {
        readonly HIGH_PERFORMER: 75;
        readonly NEEDS_HELP: 50;
        readonly STRONG_SUBJECT: 75;
        readonly WEAK_SUBJECT: 50;
        readonly HIGH_ENGAGEMENT: 70;
        readonly MEDIUM_ENGAGEMENT: 50;
        readonly HIGH_SUCCESS_RATE: 85;
        readonly LOW_SUCCESS_RATE: 40;
        readonly EXCELLENT_SCORE: 80;
        readonly POOR_SCORE: 60;
        readonly GOOD_SCORE: 7;
        readonly BAD_SCORE: 5;
        readonly EXCELLENT_SCORE_DETAILED: 7.5;
    };
    readonly API: {
        readonly GEMINI_URL: "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
        readonly GENERATION_CONFIG: {
            readonly temperature: 0.5;
            readonly topP: 0.95;
            readonly topK: 64;
        };
    };
    readonly LIMITS: {
        readonly TOP_ACTIVE_STUDENTS: 5;
        readonly TOP_PERFORMERS: 5;
        readonly STUDENTS_NEEDING_HELP: 5;
    };
    readonly VIETNAMESE_REPLACEMENTS: {
        readonly 'ph\u00E9p tr\u1EEB': "ការដក";
        readonly 'ph\u00E9p c\u1ED9ng': "ការបូក";
        readonly 'ph\u00E9p nh\u00E2n': "ការគុណ";
        readonly 'ph\u00E9p chia': "ការចែក";
        readonly 'b\u00E9 h\u01A1n': "តូចជាង";
        readonly 'l\u1EDBn h\u01A1n': "ធំជាង";
        readonly 'b\u1EB1ng nhau': "ស្មើគ្នា";
        readonly 't\u1EEB b\u00E9 \u0111\u1EBFn l\u1EDBn': "ពីតូចទៅធំ";
        readonly 't\u1EEB l\u1EDBn \u0111\u1EBFn b\u00E9': "ពីធំទៅតូច";
    };
    readonly ENGAGEMENT_LEVELS: {
        readonly HIGH: "ខ្ពស់";
        readonly MEDIUM: "មធ្យម";
        readonly LOW: "ទាប";
    };
};
export declare const INTENT_TYPES: {
    readonly STUDENT_ANALYSIS: "student_analysis";
    readonly CLASS_SUMMARY: "class_summary";
    readonly MATH_PERFORMANCE: "math_performance";
    readonly KHMER_PERFORMANCE: "khmer_performance";
    readonly SCIENCE_PERFORMANCE: "science_performance";
    readonly EXERCISE_ANALYSIS: "exercise_analysis";
    readonly TEACHING_MATERIALS: "teaching_materials";
    readonly ASSESSMENT: "assessment";
    readonly STUDENT_RANKING: "student_ranking";
    readonly SUBJECT_ACTIVITY: "subject_activity";
    readonly GENERAL: "general";
};
export type IntentType = (typeof INTENT_TYPES)[keyof typeof INTENT_TYPES];
