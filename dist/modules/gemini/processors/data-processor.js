"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataProcessor = void 0;
const gemini_constants_1 = require("../config/gemini.constants");
const data_validator_1 = require("../validators/data-validator");
const text_processor_1 = require("../utils/text-processor");
class DataProcessor {
    static getKhmerSubjectName(subjectId) {
        const subjectMapping = {
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
        };
        return subjectMapping[String(subjectId)] || `មុខវិជ្ជាដទៃ`;
    }
    static formatKhmerStudentName(student) {
        let name = '';
        if (student.student_first_name || student.student_last_name) {
            name =
                `${student.student_first_name || ''} ${student.student_last_name || ''}`.trim();
        }
        if (!name && (student.first_name || student.last_name)) {
            name = `${student.first_name || ''} ${student.last_name || ''}`.trim();
        }
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
        if (!name && student.id) {
            name = `សិស្សលេខ ${student.id}`;
        }
        if (!name)
            return 'មិនបានបញ្ជាក់ឈ្មោះ';
        if (/[\u1780-\u17FF]/.test(name)) {
            return name;
        }
        return name;
    }
    static processAnalysisData(analysisData) {
        if (!analysisData || !analysisData.students) {
            throw new Error('Invalid analysis data structure');
        }
        const students = analysisData.students;
        const { HIGH_PERFORMER, NEEDS_HELP } = gemini_constants_1.GEMINI_CONFIG.PERFORMANCE_THRESHOLDS;
        const classAverageScore = students.length > 0
            ? students.reduce((sum, student) => sum + student.total_average_score, 0) / students.length
            : 0;
        const totalClassTime = students.reduce((sum, student) => sum + student.total_time_spent, 0);
        const highPerformers = students.filter((student) => student.total_average_score > HIGH_PERFORMER);
        const needsHelp = students.filter((student) => student.total_average_score < NEEDS_HELP);
        const mostActiveStudents = students
            .sort((a, b) => b.responses.length - a.responses.length)
            .slice(0, gemini_constants_1.GEMINI_CONFIG.LIMITS.TOP_ACTIVE_STUDENTS);
        const enrichedStudents = students.map((student) => this.processIndividualStudent(student));
        const processedClassData = {
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
                mostActiveStudents: mostActiveStudents.map((student) => this.processIndividualStudent(student)),
                engagementLevel: this.calculateEngagementLevel(classAverageScore),
            },
        };
        return {
            studentData: enrichedStudents,
            classData: processedClassData,
        };
    }
    static processIndividualStudent(student) {
        const correctAnswers = student.responses.filter((response) => response.is_correct).length;
        const totalResponses = student.responses.length;
        const subjectPerformance = new Map();
        student.responses.forEach((response) => {
            const subjectId = response.subject_id;
            if (!subjectPerformance.has(subjectId)) {
                subjectPerformance.set(subjectId, { correct: 0, total: 0 });
            }
            const subject = subjectPerformance.get(subjectId);
            subject.total++;
            if (response.is_correct)
                subject.correct++;
        });
        const strongSubjects = [];
        const weakSubjects = [];
        subjectPerformance.forEach((perf, subjectId) => {
            const score = (perf.correct / perf.total) * 100;
            const subjectName = DataProcessor.getKhmerSubjectName(subjectId);
            if (score > gemini_constants_1.GEMINI_CONFIG.PERFORMANCE_THRESHOLDS.STRONG_SUBJECT) {
                strongSubjects.push({ subject: subjectName, score });
            }
            if (score < gemini_constants_1.GEMINI_CONFIG.PERFORMANCE_THRESHOLDS.WEAK_SUBJECT) {
                weakSubjects.push({ subject: subjectName, score });
            }
        });
        return {
            id: student.id,
            name: DataProcessor.formatKhmerStudentName(student),
            performance: {
                averageScore: student.total_average_score,
                totalTimeSpent: student.total_time_spent,
                averageTimePerExercise: totalResponses > 0 ? student.total_time_spent / totalResponses : 0,
                totalExercisesCompleted: correctAnswers,
                exerciseCompletionRate: totalResponses > 0 ? (correctAnswers / totalResponses) * 100 : 0,
                detailedScores: student.responses,
                strongSubjects,
                weakSubjects,
                totalQuestions: totalResponses,
                correctAnswers,
            },
        };
    }
    static calculateEngagementLevel(averageScore) {
        if (averageScore > gemini_constants_1.GEMINI_CONFIG.PERFORMANCE_THRESHOLDS.HIGH_ENGAGEMENT) {
            return gemini_constants_1.GEMINI_CONFIG.ENGAGEMENT_LEVELS.HIGH;
        }
        if (averageScore > gemini_constants_1.GEMINI_CONFIG.PERFORMANCE_THRESHOLDS.MEDIUM_ENGAGEMENT) {
            return gemini_constants_1.GEMINI_CONFIG.ENGAGEMENT_LEVELS.MEDIUM;
        }
        return gemini_constants_1.GEMINI_CONFIG.ENGAGEMENT_LEVELS.LOW;
    }
    static processFallbackData(teacherUserId, students) {
        const processedStudents = students.map((student, index) => ({
            ...student,
            id: student.id || index,
            name: DataProcessor.formatKhmerStudentName(student) ||
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
    static validateAndCleanData(studentData, classData) {
        const errors = [];
        const studentValidation = data_validator_1.DataValidator.validateStudentData(studentData);
        if (!studentValidation.isValid) {
            errors.push(...studentValidation.errors);
        }
        const classValidation = data_validator_1.DataValidator.validateClassData(classData);
        if (!classValidation.isValid) {
            errors.push(...classValidation.errors);
        }
        return {
            validStudentData: studentValidation.cleanedData || studentData,
            validClassData: classValidation.cleanedData || classData,
            errors,
        };
    }
    static optimizeForPrompt(data) {
        if (!data)
            return 'មិនមានទិន្នន័យ';
        const keyInfo = text_processor_1.TextProcessor.extractKeyInfo(data);
        const sanitized = data_validator_1.DataValidator.sanitizeForPrompt(keyInfo);
        return text_processor_1.TextProcessor.truncateForTokenLimit(sanitized, 5000);
    }
    static createPerformanceSummary(studentData) {
        const { HIGH_PERFORMER, NEEDS_HELP } = gemini_constants_1.GEMINI_CONFIG.PERFORMANCE_THRESHOLDS;
        const { TOP_PERFORMERS, STUDENTS_NEEDING_HELP } = gemini_constants_1.GEMINI_CONFIG.LIMITS;
        const topPerformers = studentData
            .filter((student) => student.performance.averageScore > HIGH_PERFORMER)
            .sort((a, b) => b.performance.averageScore - a.performance.averageScore)
            .slice(0, TOP_PERFORMERS);
        const needingHelp = studentData
            .filter((student) => student.performance.averageScore < NEEDS_HELP)
            .sort((a, b) => a.performance.averageScore - b.performance.averageScore)
            .slice(0, STUDENTS_NEEDING_HELP);
        const classAverage = studentData.length > 0
            ? studentData.reduce((sum, student) => sum + student.performance.averageScore, 0) / studentData.length
            : 0;
        const completionRate = studentData.length > 0
            ? studentData.reduce((sum, student) => sum + student.performance.exerciseCompletionRate, 0) / studentData.length
            : 0;
        const totalTimeSpent = studentData.reduce((sum, student) => sum + student.performance.totalTimeSpent, 0);
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
exports.DataProcessor = DataProcessor;
//# sourceMappingURL=data-processor.js.map