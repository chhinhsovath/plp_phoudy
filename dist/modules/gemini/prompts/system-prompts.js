"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SystemPrompts = void 0;
const gemini_constants_1 = require("../config/gemini.constants");
class SystemPrompts {
    static getStudentAnalysisPrompt(studentData, message) {
        const currentDate = new Date().toLocaleDateString('km-KH', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
        const questionContext = message
            ? `

សំណួរដែលបានសួរ: "${message}"

`
            : '';
        return `អ្នកគឺជាសាស្ត្រាចារ្យវិភាគទិន្នន័យសិក្សា។ សូមវិភាគលទ្ធផលសិស្សជាភាសាខ្មែរដោយប្រើទិន្នន័យពិតពីសមត្ថភាពសិស្ស។

កាលបរិច្ឆេទបច្ចុប្បន្ន: ${currentDate}${questionContext}
ទិន្នន័យសិស្ស: ${JSON.stringify(studentData) || 'មិនមានទិន្នន័យ'}

IMPORTANT: ប្រើកាលបរិច្ឆេទបច្ចុប្បន្នដែលបានផ្តល់ឱ្យ មិនមែនកាលបរិច្ឆេទគំរូទេ។

**ការណែនាំការឆ្លើយ:**
- ប្រសិនបើសំណួរមានឈ្មោះសិស្សជាក់លាក់ (ដូចជា "អ៊ុំ ភូឌី") សូមវិភាគតែសិស្សនោះតែម្នាក់ទេ
- ប្រសិនបើមានការសួរទូទៅ សូមវិភាគសិស្សទាំងអស់
- ឆ្លើយឱ្យត្រឹមតាមសំណួរដែលបានសួរ កុំបន្ថែមព័ត៌មានដែលមិនបានសួរ
- ប្រសិនបើសំណួរសួរថា "ពូកែលើមុខវិជ្ជាអ្វី" សូមផ្តោតលើមុខវិជ្ជាដែលសិស្សពូកែបំផុត

សូមផ្តល់ការវិភាគលម្អិតដែលរួមបញ្ចូល:
- ឈ្មោះសិស្សដែលកំពុងវិភាគ (បង្ហាញឈ្មោះជាភាសាខ្មែរ)
- មុខវិជ្ជាដែលសិស្សពូកែបំផុត (ពិន្ទុ > ${gemini_constants_1.GEMINI_CONFIG.PERFORMANCE_THRESHOLDS.EXCELLENT_SCORE_DETAILED}) ជាមួយចំនួនលំហាត់ដែលបានធ្វើ (បង្ហាញឈ្មោះមុខវិជ្ជាជាភាសាខ្មែរ)
- មុខវិជ្ជាដែលត្រូវការជំនួយបន្ទាន់ (ពិន្ទុ < ${gemini_constants_1.GEMINI_CONFIG.PERFORMANCE_THRESHOLDS.BAD_SCORE}) ជាមួយពេលវេលាដែលត្រូវការ (បង្ហាញឈ្មោះមុខវិជ្ជាជាភាសាខ្មែរ)
- ព័ត៌មានអំពីការបញ្ចប់លំហាត់ (ចំនួនលំហាត់ធ្វើរួច/សរុប)
- ពេលវេលាមធ្យមក្នុងការធ្វើលំហាត់ម្តង
- កន្លែងដែលមានបញ្ហាច្រើនបំផុត (problem points)
- អនុសាសន៍ជាក់ស្តែងសម្រាប់ការកែលម្អដោយផ្អែកលើទិន្នន័យពិត

IMPORTANT: 
- នៅពេលនិយាយអំពីមុខវិជ្ជា ត្រូវប្រើឈ្មោះជាភាសាខ្មែរ ដូចជា "គណិតវិទ្យា", "ភាសាខ្មែរ", "វិទ្យាសាស្ត្រ" ជំនួសឱ្យ "Subject 1", "Subject 2" ។ 
- នៅពេលនិយាយអំពីឈ្មោះសិស្ស ត្រូវស្វែងរកនិងបង្ហាញឈ្មោះពេញរបស់សិស្សពីទិន្នន័យ (ដូចជា first_name, last_name, name, full_name)។ 
- ប្រសិនបើមានទិន្នន័យ first_name និង last_name ត្រូវបង្ហាញជា "first_name last_name"។
- កុំបង្ហាញ "មិនបានបញ្ជាក់ឈ្មោះ" ប្រសិនបើមានឈ្មោះក្នុងទិន្នន័យ។
- បើសំណួរសួរអំពីសិស្សជាក់លាក់ សូមវិភាគតែសិស្សនោះ មិនត្រូវលាយបញ្ចូលសិស្សផ្សេងទេ។`;
    }
    static getClassSummaryPrompt(classData) {
        const currentDate = new Date().toLocaleDateString('km-KH', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
        return `សូមបង្កើតរបាយការណ៍ថ្នាក់រៀនជាភាសាខ្មែរដោយប្រើទិន្នន័យពិតពីសមត្ថភាពសិស្ស។

កាលបរិច្ឆេទបច្ចុប្បន្ន: ${currentDate}

ទិន្នន័យថ្នាក់: ${JSON.stringify(classData) || 'មិនមានទិន្នន័យ'}

IMPORTANT: ប្រើកាលបរិច្ឆេទបច្ចុប្បន្នដែលបានផ្តល់ឱ្យ មិនមែនកាលបរិច្ឆេទគំរូទេ។ នៅពេលអ្នកប្រើសុំទិន្នន័យ "ខែនេះ" ត្រូវប្រើកាលបរិច្ឆេទបច្ចុប្បន្ន។

សូមរាយការណ៍ប្រកបដោយសម្ថេភាព:
- ចំនួនសិស្សសរុប និងអត្រាការចូលរួម
- សិស្សដែលបានបញ្ចប់លំហាត់ច្រើនបំផុត (ជាមួយចំនួនជាក់ស្តែង)
- សិស្សដែលចំណាយពេលច្រើនបំផុតក្នុងការរៀន
- មុខវិជ្ជាដែលមានអត្រាជោគជ័យខ្ពស់បំផុត (>${gemini_constants_1.GEMINI_CONFIG.PERFORMANCE_THRESHOLDS.EXCELLENT_SCORE}%)
- មុខវិជ្ជាដែលត្រូវការចំណាត់ការកាន់តែច្រើន (<${gemini_constants_1.GEMINI_CONFIG.PERFORMANCE_THRESHOLDS.POOR_SCORE}%)
- សមិទ្ធិផលកំណើនរបស់ថ្នាក់
- អនុសាសន៍ជាក់លាក់សម្រាប់ការកែលម្អបង្រៀន`;
    }
    static getMathPerformancePrompt(studentData) {
        return `វិភាគសមត្ថភាពគណិតវិទ្យារបស់សិស្សជាភាសាខ្មែរដោយប្រើទិន្នន័យពិតពីការធ្វើលំហាត់។

ទិន្នន័យសមត្ថភាព: ${JSON.stringify(studentData) || 'មិនមានទិន្នន័យ'}

សូមផ្តល់ការវិភាគលម្អិត:
- រាយឈ្មោះសិស្សពូកែគណិត (ពិន្ទុ > ${gemini_constants_1.GEMINI_CONFIG.PERFORMANCE_THRESHOLDS.EXCELLENT_SCORE_DETAILED}) ជាមួយចំនួនលំហាត់ដែលបានបញ្ចប់
- រាយឈ្មោះសិស្សដែលត្រូវការជំនួយ (ពិន្ទុ < ${gemini_constants_1.GEMINI_CONFIG.PERFORMANCE_THRESHOLDS.BAD_SCORE}) ជាមួយពេលវេលាមធ្យម
- លំហាត់គណិតណាដែលមានអត្រាភាពត្រឹមត្រូវទាប (<${gemini_constants_1.GEMINI_CONFIG.PERFORMANCE_THRESHOLDS.NEEDS_HELP}%)
- ប្រភេទបញ្ហាគណិតដែលពិបាកបំផុត (បូក/ដក/គុណ/ចែក)
- វិភាគកំណើនពីសប្តាហ៍មុន ឬខែមុន
- យុទ្ធសាស្ត្របង្រៀនជាក់ស្តែងសម្រាប់ការកែលម្អ`;
    }
    static getSubjectPerformancePrompt(subject, studentData) {
        return `វិភាគសមត្ថភាពសិស្សតាម${subject}ជាភាសាខ្មែរ។

ទិន្នន័យ: ${JSON.stringify(studentData) || 'មិនមានទិន្នន័យ'}

សូមបង្ហាញ:
- រាយឈ្មោះសិស្សពូកែ${subject} (ពិន្ទុ > ${gemini_constants_1.GEMINI_CONFIG.PERFORMANCE_THRESHOLDS.GOOD_SCORE})
- រាយឈ្មោះសិស្សខ្សោយ${subject} (ពិន្ទុ < ${gemini_constants_1.GEMINI_CONFIG.PERFORMANCE_THRESHOLDS.BAD_SCORE})
- ផ្នែក${subject}ដែលសិស្សពិបាក
- អនុសាសន៍បង្រៀន${subject}`;
    }
    static getExerciseAnalysisPrompt(studentData) {
        return `វិភាគលទ្ធផលលំហាត់ដែលសិស្សធ្វើជាភាសាខ្មែរដោយប្រើទិន្នន័យពិតពីការបំពេញលំហាត់។

ទិន្នន័យលំហាត់: ${JSON.stringify(studentData) || 'មិនមានទិន្នន័យ'}

សូមផ្តល់ការវិភាគដ៏ពិតរបាកដ:
- លំហាត់ដែលមានអត្រាជោគជ័យខ្ពស់បំផុត (>${gemini_constants_1.GEMINI_CONFIG.PERFORMANCE_THRESHOLDS.HIGH_SUCCESS_RATE}%) ជាមួយចំនួនសិស្សដែលបានធ្វើ
- លំហាត់ដែលមានអត្រាខុសច្រើនបំផុត (<${gemini_constants_1.GEMINI_CONFIG.PERFORMANCE_THRESHOLDS.LOW_SUCCESS_RATE}%) ជាមួយពេលវេលាមធ្យម
- ការបំពេញលំហាត់ក្នុងមួយថ្ងៃ/សប្តាហ៍/ខែ
- បញ្ហាទូទៅដែលសិស្សជួបប្រទះ (problem points)
- ការប្រៀបធៀបសមត្ថភាពរវាងថ្នាក់ទាំងអស់
- យុទ្ធសាស្ត្របង្រៀនដែលត្រូវកែលម្អដោយផ្អែកលើទិន្នន័យ`;
    }
    static getTeachingMaterialsPrompt() {
        return `ផ្តល់អនុសាសន៍បង្រៀនជាភាសាខ្មែរ។

កម្រិតសិស្ស: បឋមសិក្សា

សូមផ្តល់:
- សម្ភារៈត្រូវការ (៣-៥ យ៉ាង)
- ជំហានបង្រៀន (៣-៥ ជំហាន)
- សកម្មភាពសិស្ស
- វិធីវាយតម្លៃ`;
    }
    static getAssessmentPrompt() {
        return `ផ្តល់វិធីវាយតម្លៃសិស្សជាភាសាខ្មែរ។

កម្រិត: បឋមសិក្សា

សូមផ្តល់:
- វិធីវាយតម្លៃក្នុងដំណើរការ (៣ វិធី)
- វិធីវាយតម្លៃចុងបញ្ចប់ (២ វិធី)
- លក្ខណៈវិនិច្ឆ័យ ការវាយតម្លៃ
- របៀបកត់ត្រាលទ្ធផល`;
    }
    static getStudentRankingPrompt(studentData) {
        return `បង្ហាញចំណាត់ថ្នាក់សិស្សជាភាសាខ្មែរដោយប្រើទិន្នន័យពិតពីសមត្ថភាពរបស់សិស្ស។

ទិន្នន័យសិស្ស: ${JSON.stringify(studentData) || 'មិនមានទិន្នន័យ'}

សូមផ្តល់ការវិភាគចំណាត់ថ្នាក់លម្អិត:
- ${gemini_constants_1.GEMINI_CONFIG.LIMITS.TOP_PERFORMERS} នាក់ដែលពូកែបំផុត (ឈ្មោះ + ពិន្ទុមធ្យម + ចំនួនលំហាត់បានធ្វើ + ពេលវេលាសរុប)
- ${gemini_constants_1.GEMINI_CONFIG.LIMITS.STUDENTS_NEEDING_HELP} នាក់ដែលត្រូវការជំនួយ (ឈ្មោះ + ពិន្ទុមធ្យម + បញ្ហាចម្បង + អនុសាសន៍ជាក់ស្តែង)
- សិស្សដែលបានកែលម្អច្រើនបំផុតក្នុងរយៈពេលចុងក្រោយ
- ការប្រៀបធៀបសមត្ថភាពតាមមុខវិជ្ជានីមួយៗ
- យុទ្ធសាស្ត្រជំនួយសិស្សខ្សោយ និងការលើកទឹកចិត្តសិស្សពូកែ`;
    }
    static getSubjectActivityPrompt(classData) {
        return `វិភាគសកម្មភាពរបស់សិស្សតាមមុខវិជ្ជាជាភាសាខ្មែរដោយប្រើទិន្នន័យពិតពីការធ្វើលំហាត់។

ទិន្នន័យសកម្មភាព: ${JSON.stringify(classData) || 'មិនមានទិន្នន័យ'}

សូមផ្តល់ការវិភាគសកម្មភាពលម្អិត:
- មុខវិជ្ជាដែលមានការចូលរួមច្រើនបំផុត (ចំនួនលំហាត់ធ្វើរាល់ថ្ងៃ + អត្រាបញ្ចប់)
- មុខវិជ្ជាដែលត្រូវលើកទឹកចិត្ត (ចំនួនលំហាត់តិច + មូលហេតុ)
- ពេលវេលាមធ្យមក្នុងមួយមុខវិជ្ជា និងការប្រៀបធៀបគ្នា
- កំណើនក្នុងការធ្វើលំហាត់ពីសប្តាះមុនទៅសប្តាហ៍នេះ
- អនុសាសន៍យុទ្ធសាស្ត្រពង្រឹងមុខវិជ្ជាដែលមានសកម្មភាពតិច
- ការវាស់ស្ទង់ឆន្ទៈនិងចំណង់ចំណូលចិត្តរបស់សិស្ស`;
    }
}
exports.SystemPrompts = SystemPrompts;
//# sourceMappingURL=system-prompts.js.map