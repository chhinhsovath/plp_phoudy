import { BasePrompts } from '../prompts/base-prompts';
import { SystemPrompts } from '../prompts/system-prompts';
import { IntentType, INTENT_TYPES } from '../config/gemini.constants';

export interface PromptTemplateOptions {
  message: string;
  teacherTitle: string;
  isFirstInteraction: boolean;
  intent: IntentType;
  studentData?: unknown;
  classData?: unknown;
}

export class PromptTemplate {
  private options: PromptTemplateOptions;

  constructor(options: PromptTemplateOptions) {
    this.options = options;
  }

  build(): string {
    // Check if we need a specialized system prompt
    const systemPrompt = this.getSystemPrompt();
    if (systemPrompt) {
      return systemPrompt;
    }

    // Build general template
    return this.buildGeneralTemplate();
  }

  private getSystemPrompt(): string | null {
    const { intent, studentData, classData, message } = this.options;

    switch (intent) {
      case INTENT_TYPES.STUDENT_ANALYSIS:
        return SystemPrompts.getStudentAnalysisPrompt(studentData, message);

      case INTENT_TYPES.CLASS_SUMMARY:
        return SystemPrompts.getClassSummaryPrompt(classData);

      case INTENT_TYPES.MATH_PERFORMANCE:
        return SystemPrompts.getMathPerformancePrompt(studentData);

      case INTENT_TYPES.KHMER_PERFORMANCE:
        return SystemPrompts.getSubjectPerformancePrompt(
          'ភាសាខ្មែរ',
          studentData,
        );

      case INTENT_TYPES.SCIENCE_PERFORMANCE:
        return SystemPrompts.getSubjectPerformancePrompt(
          'វិទ្យាសាស្ត្រ',
          studentData,
        );

      case INTENT_TYPES.EXERCISE_ANALYSIS:
        return SystemPrompts.getExerciseAnalysisPrompt(studentData);

      case INTENT_TYPES.TEACHING_MATERIALS:
        return SystemPrompts.getTeachingMaterialsPrompt();

      case INTENT_TYPES.ASSESSMENT:
        return SystemPrompts.getAssessmentPrompt();

      case INTENT_TYPES.STUDENT_RANKING:
        return SystemPrompts.getStudentRankingPrompt(studentData);

      case INTENT_TYPES.SUBJECT_ACTIVITY:
        return SystemPrompts.getSubjectActivityPrompt(classData);

      default:
        return null;
    }
  }

  private buildGeneralTemplate(): string {
    const { message, teacherTitle, isFirstInteraction } = this.options;
    const currentDate = new Date().toLocaleDateString('km-KH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
    });

    const conversationContext =
      BasePrompts.getContextualInstructions(isFirstInteraction);

    // Build template sections
    const sections = [
      BasePrompts.getCorePrinciples(teacherTitle),
      BasePrompts.getMathInstructions(teacherTitle),
      BasePrompts.getMathTopics(),
      BasePrompts.getSVGInstructions(),
      this.getContextAndMessage(conversationContext, currentDate, message),
    ];

    return sections.join('');
  }

  private getContextAndMessage(
    conversationContext: string,
    currentDate: string,
    message: string,
  ): string {
    return (
      'បរិបទសន្ទនា៖\n' +
      conversationContext +
      BasePrompts.getDateInstructions(currentDate) +
      '\nសំណួរ៖\n' +
      message
    );
  }

  static create(options: PromptTemplateOptions): string {
    const template = new PromptTemplate(options);
    return template.build();
  }
}
