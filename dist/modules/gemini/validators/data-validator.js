"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataValidator = void 0;
const common_1 = require("@nestjs/common");
class DataValidator {
    static validateMessage(message) {
        if (!message || typeof message !== 'string' || message.trim() === '') {
            throw new common_1.HttpException('Message cannot be null or empty', common_1.HttpStatus.BAD_REQUEST);
        }
        if (message.length > 5000) {
            throw new common_1.HttpException('Message too long. Maximum 5000 characters allowed.', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    static validateTeacherTitle(teacherTitle) {
        if (!teacherTitle ||
            typeof teacherTitle !== 'string' ||
            teacherTitle.trim() === '') {
            throw new common_1.HttpException('Teacher title cannot be null or empty', common_1.HttpStatus.BAD_REQUEST);
        }
        if (teacherTitle.length > 100) {
            throw new common_1.HttpException('Teacher title too long. Maximum 100 characters allowed.', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    static validateStudentData(studentData) {
        const errors = [];
        if (!studentData) {
            return { isValid: true, errors: [], cleanedData: null };
        }
        try {
            if (typeof studentData !== 'object') {
                errors.push('Student data must be an object or array');
                return { isValid: false, errors };
            }
            if (Array.isArray(studentData)) {
                const validatedStudents = studentData
                    .map((student, index) => {
                    const validation = this.validateSingleStudent(student, index);
                    if (!validation.isValid) {
                        errors.push(...validation.errors);
                    }
                    return validation.cleanedData;
                })
                    .filter(Boolean);
                return {
                    isValid: errors.length === 0,
                    errors,
                    cleanedData: validatedStudents,
                };
            }
            const validation = this.validateSingleStudent(studentData, 0);
            return {
                isValid: validation.isValid,
                errors: validation.errors,
                cleanedData: validation.cleanedData,
            };
        }
        catch (error) {
            errors.push(`Data validation error: ${error.message}`);
            return { isValid: false, errors };
        }
    }
    static validateClassData(classData) {
        const errors = [];
        if (!classData) {
            return { isValid: true, errors: [], cleanedData: null };
        }
        try {
            if (typeof classData !== 'object' || Array.isArray(classData)) {
                errors.push('Class data must be an object');
                return { isValid: false, errors };
            }
            const data = classData;
            const cleanedData = {};
            if (data.classId &&
                typeof data.classId !== 'number' &&
                typeof data.classId !== 'string') {
                errors.push('Class ID must be a number or string');
            }
            else if (data.classId) {
                cleanedData.classId = data.classId;
            }
            if (data.className && typeof data.className !== 'string') {
                errors.push('Class name must be a string');
            }
            else if (data.className) {
                cleanedData.className = data.className;
            }
            if (data.totalStudents && typeof data.totalStudents !== 'number') {
                errors.push('Total students must be a number');
            }
            else if (data.totalStudents) {
                cleanedData.totalStudents = Math.max(0, data.totalStudents);
            }
            if (data.students) {
                const studentValidation = this.validateStudentData(data.students);
                if (!studentValidation.isValid) {
                    errors.push(...studentValidation.errors);
                }
                else {
                    cleanedData.students = studentValidation.cleanedData;
                }
            }
            if (data.analytics && typeof data.analytics === 'object') {
                cleanedData.analytics = this.sanitizeAnalytics(data.analytics);
            }
            return {
                isValid: errors.length === 0,
                errors,
                cleanedData,
            };
        }
        catch (error) {
            errors.push(`Class data validation error: ${error.message}`);
            return { isValid: false, errors };
        }
    }
    static validateSingleStudent(student, index) {
        const errors = [];
        const cleanedData = {};
        if (!student || typeof student !== 'object') {
            errors.push(`Student at index ${index} must be an object`);
            return { isValid: false, errors };
        }
        if (student.id) {
            cleanedData.id = student.id;
        }
        if (student.name && typeof student.name === 'string') {
            cleanedData.name = student.name.trim();
        }
        if (student.total_average_score !== undefined) {
            const score = parseFloat(student.total_average_score);
            if (isNaN(score) || score < 0 || score > 100) {
                errors.push(`Invalid average score for student at index ${index}`);
            }
            else {
                cleanedData.total_average_score = score;
            }
        }
        if (student.total_time_spent !== undefined) {
            const time = parseFloat(student.total_time_spent);
            if (isNaN(time) || time < 0) {
                errors.push(`Invalid time spent for student at index ${index}`);
            }
            else {
                cleanedData.total_time_spent = time;
            }
        }
        if (student.responses && Array.isArray(student.responses)) {
            cleanedData.responses = student.responses.filter((response) => response &&
                typeof response === 'object' &&
                typeof response.is_correct === 'boolean');
        }
        return {
            isValid: errors.length === 0,
            errors,
            cleanedData,
        };
    }
    static sanitizeAnalytics(analytics) {
        const sanitized = {};
        if (typeof analytics.classAverageScore === 'number') {
            sanitized.classAverageScore = Math.max(0, Math.min(100, analytics.classAverageScore));
        }
        if (typeof analytics.totalClassTimeSpent === 'number') {
            sanitized.totalClassTimeSpent = Math.max(0, analytics.totalClassTimeSpent);
        }
        if (typeof analytics.highPerformersCount === 'number') {
            sanitized.highPerformersCount = Math.max(0, analytics.highPerformersCount);
        }
        if (typeof analytics.studentsNeedingHelpCount === 'number') {
            sanitized.studentsNeedingHelpCount = Math.max(0, analytics.studentsNeedingHelpCount);
        }
        if (typeof analytics.engagementLevel === 'string') {
            sanitized.engagementLevel = analytics.engagementLevel;
        }
        return sanitized;
    }
    static sanitizeForPrompt(data) {
        if (!data)
            return 'មិនមានទិន្នន័យ';
        try {
            const sanitized = JSON.stringify(data, (key, value) => {
                if (['password', 'token', 'secret', 'key'].some((sensitive) => key.toLowerCase().includes(sensitive))) {
                    return '[REDACTED]';
                }
                return value;
            });
            if (sanitized.length > 10000) {
                return sanitized.substring(0, 10000) + '... [TRUNCATED]';
            }
            return sanitized;
        }
        catch (error) {
            return 'ទិន្នន័យមិនអាចដំណើរការបាន';
        }
    }
}
exports.DataValidator = DataValidator;
//# sourceMappingURL=data-validator.js.map