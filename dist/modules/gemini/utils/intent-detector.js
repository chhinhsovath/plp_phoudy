"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntentDetector = void 0;
const gemini_constants_1 = require("../config/gemini.constants");
class IntentDetector {
    static patterns = [
        {
            keywords: [
                'សិស្សឈ្មោះ',
                'មានមុខវិជ្ជាអ្វីខ្លាំង',
                'អ្វីខ្សោយ',
                'ពូកែមុខវិជ្ជាអ្វី',
                'វិភាគសិស្ស',
                'សិស្សណា',
                'រៀនខ្សោយ',
                'រៀនលអ',
                'សិស្ស',
                'មានចំណុចខ្លាំង',
                'ចំណុចខ្សោយ',
                'តើសិស្ស',
                'ពូកែលើមុខវិជ្ជាអ្វី',
                'ពូកែលើ',
                'មុខវិជ្ជាអ្វី',
                'ខ្សោយលើមុខវិជ្ជាអ្វី',
                'ខ្សោយលើ',
                'តើ.*ពូកែលើ',
                'តើ.*ខ្សោយលើ',
                'student',
                'performance',
                'analysis',
                'which student',
                'strengths',
                'weaknesses',
            ],
            weight: 10,
            intent: gemini_constants_1.INTENT_TYPES.STUDENT_ANALYSIS,
        },
        {
            keywords: [
                'របាយការណ៍',
                'សង្ខេប',
                'ទិន្នន័យ',
                'ថ្ងៃនេះ',
                'ខែនេះ',
                'ឆ្នាំនេះ',
                'ថ្នាក់',
                'report',
                'summary',
                'class',
                'today',
                'this month',
                'data',
            ],
            weight: 8,
            intent: gemini_constants_1.INTENT_TYPES.CLASS_SUMMARY,
        },
        {
            keywords: [
                'គណិត',
                'គណិតវិទ្យា',
                'បូក',
                'ដក',
                'គុណ',
                'ចែក',
                'លេខ',
                'រៀនគណិត',
                'រៀនគណិតពូកែ',
                'គណិតពូកែ',
                'រៀនគណិតខ្សោយ',
                'គណិតខ្សោយ',
                'math',
                'mathematics',
                'arithmetic',
                'numbers',
            ],
            weight: 9,
            intent: gemini_constants_1.INTENT_TYPES.MATH_PERFORMANCE,
        },
        {
            keywords: ['ភាសាខ្មែរ', 'ខ្មែរ', 'អក្សរ', 'អាន', 'សរសេរ'],
            weight: 9,
            intent: gemini_constants_1.INTENT_TYPES.KHMER_PERFORMANCE,
        },
        {
            keywords: [
                'វិទ្យាសាស្ត្រ',
                'វិទ្យា',
                'ធម្មជាតិ',
                'រូបវិទ្យា',
                'គីមីវិទ្យា',
            ],
            weight: 9,
            intent: gemini_constants_1.INTENT_TYPES.SCIENCE_PERFORMANCE,
        },
        {
            keywords: ['លំហាត់', 'ខុសច្រើន', 'ត្រូវច្រើន', 'ធ្វើលំហាត់', 'សំណួរ'],
            weight: 8,
            intent: gemini_constants_1.INTENT_TYPES.EXERCISE_ANALYSIS,
        },
        {
            keywords: ['សម្ភារៈ', 'បង្រៀន', 'សកម្មភាព', 'មេរៀន', 'ឧបករណ៍'],
            weight: 7,
            intent: gemini_constants_1.INTENT_TYPES.TEACHING_MATERIALS,
        },
        {
            keywords: ['វាយតម្លៃ', 'តេស្ត', 'ប្រឡង', 'ពិន្ទុ', 'ការធ្វើតេស្ត'],
            weight: 8,
            intent: gemini_constants_1.INTENT_TYPES.ASSESSMENT,
        },
        {
            keywords: [
                'ពូកែបំផុត',
                'ខ្សោយបំផុត',
                'ប្រសើរជាងគេ',
                'ចំណាត់ថ្នាក់',
                'លំដាប់',
                'ខ្សោយជាងគេ',
                'រៀនខ្សោយ',
                'សិស្សណា',
                'អ្នកណា',
                'ខ្សោយ',
                'ពូកែ',
                'ពូកែជាងគេ',
                'តើសិស្សណា',
                'រៀនគណិតពូកែ',
                'រៀនគណិត',
                'រៀនគណិតខ្សោយ',
                'គណិតខ្សោយ',
                'ខ្សោយជាងគេ',
                'weakest',
                'strongest',
                'best',
                'worst',
                'ranking',
                'top',
                'bottom',
                'lowest',
                'highest',
            ],
            weight: 9,
            intent: gemini_constants_1.INTENT_TYPES.STUDENT_RANKING,
        },
        {
            keywords: ['មុខវិជ្ជាណា', 'ធ្វើច្រើន', 'ធ្វើតិច', 'សកម្ម', 'ចូលរួម'],
            weight: 7,
            intent: gemini_constants_1.INTENT_TYPES.SUBJECT_ACTIVITY,
        },
    ];
    static detectIntent(message) {
        if (!message || typeof message !== 'string') {
            return gemini_constants_1.INTENT_TYPES.GENERAL;
        }
        const lowerMessage = message.toLowerCase().trim();
        const scores = new Map();
        for (const pattern of this.patterns) {
            scores.set(pattern.intent, 0);
        }
        for (const pattern of this.patterns) {
            let matchCount = 0;
            for (const keyword of pattern.keywords) {
                if (lowerMessage.includes(keyword.toLowerCase())) {
                    matchCount++;
                }
            }
            if (matchCount > 0) {
                const score = (matchCount / pattern.keywords.length) * pattern.weight;
                scores.set(pattern.intent, (scores.get(pattern.intent) || 0) + score);
            }
        }
        let maxScore = 0;
        let detectedIntent = gemini_constants_1.INTENT_TYPES.GENERAL;
        for (const [intent, score] of scores.entries()) {
            if (score > maxScore) {
                maxScore = score;
                detectedIntent = intent;
            }
            if (lowerMessage.includes('សិស្សណារៀនគណិត')) {
                console.log(`Intent: ${intent}, Score: ${score}, Keywords matched for math ranking question`);
            }
            if (lowerMessage.includes('ពូកែលើមុខវិជ្ជា')) {
                console.log(`Intent: ${intent}, Score: ${score}, Keywords matched for student subject strength question`);
            }
            if (lowerMessage.includes('ខ្សោយលើមុខវិជ្ជា')) {
                console.log(`Intent: ${intent}, Score: ${score}, Keywords matched for student subject weakness question`);
            }
        }
        if (maxScore < 1) {
            return gemini_constants_1.INTENT_TYPES.GENERAL;
        }
        return detectedIntent;
    }
    static getConfidenceScore(message, intent) {
        if (!message || intent === gemini_constants_1.INTENT_TYPES.GENERAL) {
            return 0;
        }
        const pattern = this.patterns.find((p) => p.intent === intent);
        if (!pattern) {
            return 0;
        }
        const lowerMessage = message.toLowerCase();
        let matchCount = 0;
        for (const keyword of pattern.keywords) {
            if (lowerMessage.includes(keyword.toLowerCase())) {
                matchCount++;
            }
        }
        return (matchCount / pattern.keywords.length) * 100;
    }
    static getAlternativeIntents(message, limit = 3) {
        const lowerMessage = message.toLowerCase();
        const alternatives = [];
        for (const pattern of this.patterns) {
            let matchCount = 0;
            for (const keyword of pattern.keywords) {
                if (lowerMessage.includes(keyword.toLowerCase())) {
                    matchCount++;
                }
            }
            if (matchCount > 0) {
                const score = (matchCount / pattern.keywords.length) * pattern.weight;
                alternatives.push({ intent: pattern.intent, score });
            }
        }
        return alternatives.sort((a, b) => b.score - a.score).slice(0, limit);
    }
    static requiresRealData(intent) {
        const dataRequiredIntents = [
            gemini_constants_1.INTENT_TYPES.STUDENT_ANALYSIS,
            gemini_constants_1.INTENT_TYPES.CLASS_SUMMARY,
            gemini_constants_1.INTENT_TYPES.MATH_PERFORMANCE,
            gemini_constants_1.INTENT_TYPES.KHMER_PERFORMANCE,
            gemini_constants_1.INTENT_TYPES.SCIENCE_PERFORMANCE,
            gemini_constants_1.INTENT_TYPES.EXERCISE_ANALYSIS,
            gemini_constants_1.INTENT_TYPES.STUDENT_RANKING,
            gemini_constants_1.INTENT_TYPES.SUBJECT_ACTIVITY,
        ];
        return dataRequiredIntents.includes(intent);
    }
}
exports.IntentDetector = IntentDetector;
//# sourceMappingURL=intent-detector.js.map