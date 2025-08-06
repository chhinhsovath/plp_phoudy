"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextProcessor = void 0;
const gemini_constants_1 = require("../config/gemini.constants");
class TextProcessor {
    static replaceVietnameseWords(text) {
        if (!text || typeof text !== 'string') {
            return '';
        }
        let processedText = text;
        for (const [vietnamese, khmer] of Object.entries(gemini_constants_1.GEMINI_CONFIG.VIETNAMESE_REPLACEMENTS)) {
            processedText = processedText.replace(new RegExp(vietnamese, 'gi'), khmer);
        }
        return processedText;
    }
    static optimizePrompt(prompt) {
        if (!prompt || typeof prompt !== 'string') {
            return '';
        }
        return (prompt
            .replace(/\n{3,}/g, '\n\n')
            .replace(/ {2,}/g, ' ')
            .replace(/[ \t]+$/gm, '')
            .trim());
    }
    static compressInstructions(instructions) {
        if (!instructions)
            return '';
        const compressionRules = [
            {
                pattern: /សូម([^។]+)។\s*សូម([^។]+)។/g,
                replacement: 'សូម$1 និង$2។',
            },
            {
                pattern: /(\d+)\.\s+([^។\n]+)។\s*(\d+)\.\s+([^។\n]+)។/g,
                replacement: '$1. $2; $3. $4។',
            },
            {
                pattern: /ជាភាសាខ្មែរ[។\s]*ជាភាសាខ្មែរ/g,
                replacement: 'ជាភាសាខ្មែរ',
            },
        ];
        let compressed = instructions;
        for (const rule of compressionRules) {
            compressed = compressed.replace(rule.pattern, rule.replacement);
        }
        return this.optimizePrompt(compressed);
    }
    static truncateForTokenLimit(text, maxLength = 8000) {
        if (!text || text.length <= maxLength) {
            return text;
        }
        const truncated = text.substring(0, maxLength);
        const lastPeriod = truncated.lastIndexOf('។');
        const lastNewline = truncated.lastIndexOf('\n');
        const breakPoint = Math.max(lastPeriod, lastNewline);
        if (breakPoint > maxLength * 0.8) {
            return truncated.substring(0, breakPoint + 1);
        }
        return truncated + '...';
    }
    static normalizeText(text) {
        if (!text)
            return '';
        return (text
            .normalize('NFC')
            .replace(/[\u200B-\u200D\uFEFF]/g, '')
            .replace(/[""]/g, '"')
            .replace(/['']/g, "'")
            .replace(/[។]{2,}/g, '។')
            .replace(/[!]{2,}/g, '!')
            .replace(/[?]{2,}/g, '?')
            .trim());
    }
    static extractKeyInfo(data) {
        if (!data)
            return 'មិនមានទិន្នន័យ';
        try {
            if (Array.isArray(data)) {
                const summary = {
                    totalItems: data.length,
                    sampleItems: data.slice(0, 3),
                };
                return JSON.stringify(summary);
            }
            if (typeof data === 'object') {
                const essential = {};
                const importantFields = [
                    'id',
                    'name',
                    'title',
                    'score',
                    'average',
                    'total',
                    'count',
                    'classId',
                    'className',
                    'totalStudents',
                    'gradeLevel',
                    'total_average_score',
                    'total_time_spent',
                ];
                for (const field of importantFields) {
                    if (data[field] !== undefined) {
                        essential[field] = data[field];
                    }
                }
                if (data.analytics) {
                    essential.analytics = data.analytics;
                }
                if (data.students && Array.isArray(data.students)) {
                    essential.studentsCount = data.students.length;
                    essential.sampleStudents = data.students.slice(0, 2);
                }
                return JSON.stringify(essential);
            }
            return String(data);
        }
        catch (error) {
            return 'ទិន្នន័យមិនអាចដំណើរការបាន';
        }
    }
    static validateSVGContent(text) {
        if (!text.includes('<svg')) {
            return text;
        }
        return text
            .replace(/```xml\s*(<svg[\s\S]*?<\/svg>)\s*```/g, '$1')
            .replace(/```svg\s*(<svg[\s\S]*?<\/svg>)\s*```/g, '$1')
            .replace(/```\s*(<svg[\s\S]*?<\/svg>)\s*```/g, '$1');
    }
}
exports.TextProcessor = TextProcessor;
//# sourceMappingURL=text-processor.js.map