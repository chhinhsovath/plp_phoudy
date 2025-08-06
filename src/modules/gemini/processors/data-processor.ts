import { GEMINI_CONFIG } from '../config/gemini.constants';
import { DataValidator } from '../validators/data-validator';
import { TextProcessor } from '../utils/text-processor';

export interface ProcessedStudentData {
  id?: string | number;
  name?: string;
  performance: {
    averageScore: number;
    totalTimeSpent: number;
    averageTimePerExercise: number;
    totalExercisesCompleted: number;
    exerciseCompletionRate: number;
    detailedScores: any[];
    strongSubjects: Array<{ subject: string; score: number }>;
    weakSubjects: Array<{ subject: string; score: number }>;
    totalQuestions: number;
    correctAnswers: number;
  };
}

export interface ProcessedClassData {
  classId: number;
  className: string;
  gradeLevel: number;
  totalStudents: number;
  teacherName: string;
  students: ProcessedStudentData[];
  analytics: {
    classAverageScore: number;
    totalClassTimeSpent: number;
    averageCompletionRate: number;
    highPerformersCount: number;
    studentsNeedingHelpCount: number;
    mostActiveStudents: ProcessedStudentData[];
    engagementLevel: string;
  };
}

export class DataProcessor {
  /**
   * Map subject IDs to Khmer names
   */
  static getKhmerSubjectName(subjectId: number | string): string {
    const subjectMapping: Record<string, string> = {
      '1': 'គណិតវិទ្យា',
      '2': 'ភាសាខ្មែរ',
      '3': 'វិទ្យាសាស្ត្រ',
      '4': 'សង្គមវិទ្យា',
      '5': 'ភាសាអង់គ្លេស',
      '6': 'កីឡា',
      '7': 'សិល្បៈ',
      '8': 'ព័ត៌មានវិទ្យា',
      '9': 'ប្រវត្តិសាស្ត្រ',
      '10': 'ភូមិសាស្ត្រ',
      '11': 'រូបវិទ្យា',
      '12': 'គីមីវិទ្យា',
      '13': 'ជីវវិទ្យា',
      '14': 'ទស្សនវិជ្ជា',
      '15': 'គណិតវិទ្យា',
      '16': 'ភាសាបារាំង',
      '17': 'ភាសាចិន',
      '18': 'ភាសាជប៉ុន',
      '19': 'សេដ្ឋកិច្ច',
      '20': 'នីតិវិទ្យា',
      // Add more mappings as needed
    };

    return subjectMapping[String(subjectId)] || `មុខវិជ្ជាដទៃ`;
  }

  /**
   * Format student name properly for Khmer display
   */
  static formatKhmerStudentName(student: any): string {
    let name = '';

    // Priority order for name construction
    // 1. Try student_first_name + student_last_name (from analysis service)
    if (student.student_first_name || student.student_last_name) {
      name =
        `${student.student_first_name || ''} ${student.student_last_name || ''}`.trim();
    }

    // 2. Try first_name + last_name (general fallback)
    if (!name && (student.first_name || student.last_name)) {
      name = `${student.first_name || ''} ${student.last_name || ''}`.trim();
    }

    // 3. Check other single name fields
    if (!name) {
      const possibleNameFields = [
        'name',
        'full_name',
        'student_name',
        'username',
      ];

      for (const field of possibleNameFields) {
        if (student[field] && typeof student[field] === 'string') {
          name = student[field].trim();
          break;
        }
      }
    }

    // 4. If still no name, try to use ID or username
    if (!name && student.id) {
      name = `សិស្សលេខ ${student.id}`;
    }

    if (!name) return 'មិនបានបញ្ជាក់ឈ្មោះ';

    // If name is already in Khmer, return as is
    if (/[\u1780-\u17FF]/.test(name)) {
      return name;
    }

    // For English names, format appropriately
    return name;
  }
  /**
   * Process and enrich student data from analysis service
   */
  static processAnalysisData(analysisData: any): {
    studentData: ProcessedStudentData[];
    classData: ProcessedClassData;
  } {
    if (!analysisData || !analysisData.students) {
      throw new Error('Invalid analysis data structure');
    }

    const students = analysisData.students;
    const { HIGH_PERFORMER, NEEDS_HELP } = GEMINI_CONFIG.PERFORMANCE_THRESHOLDS;

    // Calculate class-level analytics
    const classAverageScore =
      students.length > 0
        ? students.reduce(
            (sum: number, student: any) => sum + student.total_average_score,
            0,
          ) / students.length
        : 0;

    const totalClassTime = students.reduce(
      (sum: number, student: any) => sum + student.total_time_spent,
      0,
    );

    const highPerformers = students.filter(
      (student: any) => student.total_average_score > HIGH_PERFORMER,
    );
    const needsHelp = students.filter(
      (student: any) => student.total_average_score < NEEDS_HELP,
    );

    const mostActiveStudents = students
      .sort((a: any, b: any) => b.responses.length - a.responses.length)
      .slice(0, GEMINI_CONFIG.LIMITS.TOP_ACTIVE_STUDENTS);

    // Process individual students
    const enrichedStudents = students.map((student: any) =>
      this.processIndividualStudent(student),
    );

    const processedClassData: ProcessedClassData = {
      classId: analysisData.class_id,
      className: `Grade ${analysisData.class_grade_level}`,
      gradeLevel: analysisData.class_grade_level,
      totalStudents: students.length,
      teacherName: `${analysisData.teacher_first_name} ${analysisData.teacher_last_name}`,
      students: enrichedStudents,
      analytics: {
        classAverageScore,
        totalClassTimeSpent: totalClassTime,
        averageCompletionRate: classAverageScore,
        highPerformersCount: highPerformers.length,
        studentsNeedingHelpCount: needsHelp.length,
        mostActiveStudents: mostActiveStudents.map((student: any) =>
          this.processIndividualStudent(student),
        ),
        engagementLevel: this.calculateEngagementLevel(classAverageScore),
      },
    };

    return {
      studentData: enrichedStudents,
      classData: processedClassData,
    };
  }

  /**
   * Process individual student data
   */
  private static processIndividualStudent(student: any): ProcessedStudentData {
    const correctAnswers = student.responses.filter(
      (response: any) => response.is_correct,
    ).length;
    const totalResponses = student.responses.length;
    const subjectPerformance = new Map();

    // Group responses by subject
    student.responses.forEach((response: any) => {
      const subjectId = response.subject_id;
      if (!subjectPerformance.has(subjectId)) {
        subjectPerformance.set(subjectId, { correct: 0, total: 0 });
      }
      const subject = subjectPerformance.get(subjectId);
      subject.total++;
      if (response.is_correct) subject.correct++;
    });

    // Calculate strong and weak subjects
    const strongSubjects: Array<{ subject: string; score: number }> = [];
    const weakSubjects: Array<{ subject: string; score: number }> = [];

    subjectPerformance.forEach((perf, subjectId) => {
      const score = (perf.correct / perf.total) * 100;
      const subjectName = DataProcessor.getKhmerSubjectName(subjectId);

      if (score > GEMINI_CONFIG.PERFORMANCE_THRESHOLDS.STRONG_SUBJECT) {
        strongSubjects.push({ subject: subjectName, score });
      }
      if (score < GEMINI_CONFIG.PERFORMANCE_THRESHOLDS.WEAK_SUBJECT) {
        weakSubjects.push({ subject: subjectName, score });
      }
    });

    return {
      id: student.id,
      name: DataProcessor.formatKhmerStudentName(student),
      performance: {
        averageScore: student.total_average_score,
        totalTimeSpent: student.total_time_spent,
        averageTimePerExercise:
          totalResponses > 0 ? student.total_time_spent / totalResponses : 0,
        totalExercisesCompleted: correctAnswers,
        exerciseCompletionRate:
          totalResponses > 0 ? (correctAnswers / totalResponses) * 100 : 0,
        detailedScores: student.responses,
        strongSubjects,
        weakSubjects,
        totalQuestions: totalResponses,
        correctAnswers,
      },
    };
  }

  /**
   * Calculate engagement level in Khmer
   */
  private static calculateEngagementLevel(averageScore: number): string {
    if (averageScore > GEMINI_CONFIG.PERFORMANCE_THRESHOLDS.HIGH_ENGAGEMENT) {
      return GEMINI_CONFIG.ENGAGEMENT_LEVELS.HIGH;
    }
    if (averageScore > GEMINI_CONFIG.PERFORMANCE_THRESHOLDS.MEDIUM_ENGAGEMENT) {
      return GEMINI_CONFIG.ENGAGEMENT_LEVELS.MEDIUM;
    }
    return GEMINI_CONFIG.ENGAGEMENT_LEVELS.LOW;
  }

  /**
   * Process fallback data when API fails
   */
  static processFallbackData(
    teacherUserId: number,
    students: any[],
  ): {
    studentData: any[];
    classData: any;
  } {
    const processedStudents = students.map((student, index) => ({
      ...student,
      id: student.id || index,
      name:
        DataProcessor.formatKhmerStudentName(student) ||
        `សិស្សលេខ ${index + 1}`,
    }));

    const fallbackClassData = {
      totalStudents: students.length,
      students: processedStudents,
      teacherUserId,
      dataSource: 'fallback',
    };

    return {
      studentData: processedStudents,
      classData: fallbackClassData,
    };
  }

  /**
   * Validate and clean data before processing
   */
  static validateAndCleanData(
    studentData?: unknown,
    classData?: unknown,
  ): {
    validStudentData: unknown;
    validClassData: unknown;
    errors: string[];
  } {
    const errors: string[] = [];

    // Validate student data
    const studentValidation = DataValidator.validateStudentData(studentData);
    if (!studentValidation.isValid) {
      errors.push(...studentValidation.errors);
    }

    // Validate class data
    const classValidation = DataValidator.validateClassData(classData);
    if (!classValidation.isValid) {
      errors.push(...classValidation.errors);
    }

    return {
      validStudentData: studentValidation.cleanedData || studentData,
      validClassData: classValidation.cleanedData || classData,
      errors,
    };
  }

  /**
   * Optimize data for prompt injection
   */
  static optimizeForPrompt(data: unknown): string {
    if (!data) return 'មិនមានទិន្នន័យ';

    // Extract key information to reduce token usage
    const keyInfo = TextProcessor.extractKeyInfo(data);

    // Sanitize for security
    const sanitized = DataValidator.sanitizeForPrompt(keyInfo);

    // Ensure it fits within reasonable limits
    return TextProcessor.truncateForTokenLimit(sanitized, 5000);
  }

  /**
   * Create performance summary for quick analysis
   */
  static createPerformanceSummary(studentData: ProcessedStudentData[]): {
    topPerformers: ProcessedStudentData[];
    needingHelp: ProcessedStudentData[];
    averageMetrics: {
      classAverage: number;
      completionRate: number;
      totalTimeSpent: number;
    };
  } {
    const { HIGH_PERFORMER, NEEDS_HELP } = GEMINI_CONFIG.PERFORMANCE_THRESHOLDS;
    const { TOP_PERFORMERS, STUDENTS_NEEDING_HELP } = GEMINI_CONFIG.LIMITS;

    const topPerformers = studentData
      .filter((student) => student.performance.averageScore > HIGH_PERFORMER)
      .sort((a, b) => b.performance.averageScore - a.performance.averageScore)
      .slice(0, TOP_PERFORMERS);

    const needingHelp = studentData
      .filter((student) => student.performance.averageScore < NEEDS_HELP)
      .sort((a, b) => a.performance.averageScore - b.performance.averageScore)
      .slice(0, STUDENTS_NEEDING_HELP);

    const classAverage =
      studentData.length > 0
        ? studentData.reduce(
            (sum, student) => sum + student.performance.averageScore,
            0,
          ) / studentData.length
        : 0;

    const completionRate =
      studentData.length > 0
        ? studentData.reduce(
            (sum, student) => sum + student.performance.exerciseCompletionRate,
            0,
          ) / studentData.length
        : 0;

    const totalTimeSpent = studentData.reduce(
      (sum, student) => sum + student.performance.totalTimeSpent,
      0,
    );

    return {
      topPerformers,
      needingHelp,
      averageMetrics: {
        classAverage,
        completionRate,
        totalTimeSpent,
      },
    };
  }
}
