"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromptTemplate = void 0;
const base_prompts_1 = require("../prompts/base-prompts");
const system_prompts_1 = require("../prompts/system-prompts");
const gemini_constants_1 = require("../config/gemini.constants");
class PromptTemplate {
    options;
    constructor(options) {
        this.options = options;
    }
    build() {
        const systemPrompt = this.getSystemPrompt();
        if (systemPrompt) {
            return systemPrompt;
        }
        return this.buildGeneralTemplate();
    }
    getSystemPrompt() {
        const { intent, studentData, classData, message } = this.options;
        switch (intent) {
            case gemini_constants_1.INTENT_TYPES.STUDENT_ANALYSIS:
                return system_prompts_1.SystemPrompts.getStudentAnalysisPrompt(studentData, message);
            case gemini_constants_1.INTENT_TYPES.CLASS_SUMMARY:
                return system_prompts_1.SystemPrompts.getClassSummaryPrompt(classData);
            case gemini_constants_1.INTENT_TYPES.MATH_PERFORMANCE:
                return system_prompts_1.SystemPrompts.getMathPerformancePrompt(studentData);
            case gemini_constants_1.INTENT_TYPES.KHMER_PERFORMANCE:
                return system_prompts_1.SystemPrompts.getSubjectPerformancePrompt('ភាសាខ្មែរ', studentData);
            case gemini_constants_1.INTENT_TYPES.SCIENCE_PERFORMANCE:
                return system_prompts_1.SystemPrompts.getSubjectPerformancePrompt('វិទ្យាសាស្ត្រ', studentData);
            case gemini_constants_1.INTENT_TYPES.EXERCISE_ANALYSIS:
                return system_prompts_1.SystemPrompts.getExerciseAnalysisPrompt(studentData);
            case gemini_constants_1.INTENT_TYPES.TEACHING_MATERIALS:
                return system_prompts_1.SystemPrompts.getTeachingMaterialsPrompt();
            case gemini_constants_1.INTENT_TYPES.ASSESSMENT:
                return system_prompts_1.SystemPrompts.getAssessmentPrompt();
            case gemini_constants_1.INTENT_TYPES.STUDENT_RANKING:
                return system_prompts_1.SystemPrompts.getStudentRankingPrompt(studentData);
            case gemini_constants_1.INTENT_TYPES.SUBJECT_ACTIVITY:
                return system_prompts_1.SystemPrompts.getSubjectActivityPrompt(classData);
            default:
                return null;
        }
    }
    buildGeneralTemplate() {
        const { message, teacherTitle, isFirstInteraction } = this.options;
        const currentDate = new Date().toLocaleDateString('km-KH', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long',
        });
        const conversationContext = base_prompts_1.BasePrompts.getContextualInstructions(isFirstInteraction);
        const sections = [
            base_prompts_1.BasePrompts.getCorePrinciples(teacherTitle),
            base_prompts_1.BasePrompts.getMathInstructions(teacherTitle),
            base_prompts_1.BasePrompts.getMathTopics(),
            base_prompts_1.BasePrompts.getSVGInstructions(),
            this.getContextAndMessage(conversationContext, currentDate, message),
        ];
        return sections.join('');
    }
    getContextAndMessage(conversationContext, currentDate, message) {
        return ('បរិបទសន្ទនា៖\n' +
            conversationContext +
            base_prompts_1.BasePrompts.getDateInstructions(currentDate) +
            '\nសំណួរ៖\n' +
            message);
    }
    static create(options) {
        const template = new PromptTemplate(options);
        return template.build();
    }
}
exports.PromptTemplate = PromptTemplate;
//# sourceMappingURL=prompt-template.js.map