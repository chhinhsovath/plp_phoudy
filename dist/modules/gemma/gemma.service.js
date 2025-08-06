"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GemmaService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const axios_1 = require("axios");
let GemmaService = class GemmaService {
    configService;
    openRouterApiKey;
    openRouterApiUrl = 'https://openrouter.ai/api/v1/chat/completions';
    gemmaModel = 'google/gemma-3-27b-it';
    constructor(configService) {
        this.configService = configService;
        this.openRouterApiKey =
            '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';
    }
    async sendMessageToGemma(message, teacherTitle, isFirstInteraction) {
        if (!message || message.trim() === '') {
            throw new common_1.HttpException('Message cannot be null or empty', common_1.HttpStatus.BAD_REQUEST);
        }
        if (!teacherTitle || teacherTitle.trim() === '') {
            throw new common_1.HttpException('Teacher title cannot be null or empty', common_1.HttpStatus.BAD_REQUEST);
        }
        const conversationContext = isFirstInteraction
            ? 'នេះជាសំណួរដំបូងពីគ្រូបង្រៀន។ អ្នកគួរស្វាគមន៍គាត់ជាមួយសារស្វាគមន៍ខ្លីមួយ ហើយបន្ទាប់មកឆ្លើយតបនឹងសំណួររបស់គាត់។'
            : 'នេះមិនមែនជាសំណួរដំបូងទេ។ គ្រាន់តែឆ្លើយនូវអ្វីដែលបានសួរដោយផ្ទាល់ ដោយមិនចាំបាច់ចាប់ផ្តើមដោយសារស្វាគមន៍ទៀត។';
        const promptWithInstructions = this.buildPromptTemplate(message, teacherTitle, conversationContext);
        const requestBody = {
            model: this.gemmaModel,
            messages: [
                {
                    role: 'user',
                    content: promptWithInstructions,
                },
            ],
            temperature: 0.5,
            top_p: 0.95,
            top_k: 64,
        };
        try {
            const headers = {
                Authorization: `Bearer ${this.openRouterApiKey}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': 'https://plp-edtech.com',
                'X-Title': 'PLP Education Platform',
            };
            const response = await axios_1.default.post(this.openRouterApiUrl, requestBody, {
                headers,
            });
            if (!response.data) {
                throw new Error('Error calling Gemma 3 API');
            }
            const aiResponse = response.data.choices[0].message.content;
            return this.replaceVietnameseWords(aiResponse);
        }
        catch (error) {
            console.error('Error calling Gemma 3 API:', error.response?.data || error.message);
            throw new common_1.HttpException('Error processing your request with Gemma 3', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    buildPromptTemplate(message, teacherTitle, conversationContext) {
        const introduction = 'អ្នកគឺជា បញ្ញាបឋម ជំនួយការបង្រៀនគណិតវិទ្យាសម្រាប់សិស្សបឋមសិក្សាពីថ្នាក់ទី១ដល់ទី៦ នៅក្នុងប្រទេសកម្ពុជា។ អ្នកត្រូវបង្រៀនដូចគ្រូបឋមសិក្សាម្នាក់។\n\n';
        const corePrinciples = 'គោលការណ៍សំខាន់ៗ៖\n' +
            '១. សូមឆ្លើយតបជាភាសាខ្មែរតែប៉ុណ្ណោះ។ មិនត្រូវឆ្លើយតបជាភាសាវៀតណាម ភាសាថៃ ឬភាសាផ្សេងៗឡើយ គឺប្រើតែភាសាខ្មែរប៉ុណ្ណោះ។\n' +
            '២. ចាត់ទុកថាអ្នកកំពុងនិយាយជាមួយគ្រូបង្រៀន។\n' +
            '៣. សូមហៅអ្នកប្រើប្រាស់ថា ' +
            teacherTitle +
            ' នៅក្នុងចម្លើយរបស់អ្នក។\n' +
            '៤. ប្រើភាសាសាមញ្ញ និងងាយយល់សម្រាប់កុមារអាយុ ៦-១២ឆ្នាំ ប៉ុន្តែចាំថាអ្នកកំពុងឆ្លើយទៅកាន់គ្រូបង្រៀន។\n' +
            '៥. ប្រើឧទាហរណ៍ជាក់ស្តែង ដែលកុមារអាចស្រមៃបាន។\n';
        const mathInstructions = 'ការណែនាំអំពីគណិតវិទ្យា៖\n' +
            '៦. ឆ្លើយតែសំណួរទាក់ទងនឹងគណិតវិទ្យាបឋមសិក្សាតែប៉ុណ្ណោះ។\n' +
            '៧. ប្រសិនបើសំណួរគឺជាលំហាត់ពាក្យដែលមានលេខនិងមានការបូក ដក គុណ ឬចែក សូមពិចារណាថាវាជាសំណួរគណិតវិទ្យា ទោះបីជាវាមានឈ្មោះផ្លែឈើ សត្វ ឬវត្ថុផ្សេងៗក៏ដោយ។\n' +
            '៨. បើសំណួរមិនពាក់ព័ន្ធនឹងគណិតវិទ្យាទាល់តែសោះ សូមឆ្លើយថា៖ "សូមអភ័យទោស ' +
            teacherTitle +
            '! ខ្ញុំជា បញ្ញាបឋម ជំនួយការបង្រៀនគណិតវិទ្យាបឋមសិក្សា ខ្ញុំអាចជួយតែសំណួរគណិតវិទ្យាបឋមសិក្សាប៉ុណ្ណោះ។ តើ' +
            teacherTitle +
            'មានសំណួរគណិតវិទ្យាដែរឬទេ?"\n' +
            '៩. បើសំណួរមានផ្លែឈើ ឬវត្ថុផ្សេងៗ តែមិនមានទំនាក់ទំនងគ្នា ដូចជា "ខ្ញុំមានស្វាយ៣ ញ៉ាំអស់១ នៅសល់ទុរេនប៉ុន្មាន?" ត្រូវពន្យល់ថា ចំលើយគឺ "០" ព្រោះស្វាយនិងទុរេនជាផ្លែឈើខុសគ្នា ហើយត្រូវបង្រៀនវិធីដោះស្រាយលំហាត់ឱ្យត្រឹមត្រូវ។\n';
        const mathTopics = 'ផ្នែកគណិតវិទ្យាសម្រាប់បឋមសិក្សាដែលអ្នកអាចជួយបាន៖\n' +
            '- ការបូក ដក គុណ ចែក លេខចំនួនគត់\n' +
            '- ប្រភាគ (1/2, 1/3, ...)\n' +
            '- ការវាស់ប្រវែង ទម្ងន់ ទំហំ\n' +
            '- រូបរាងធរណីមាត្រងាយៗ (ការេ ចតុកោណ ត្រីកោណ រង្វង់)\n' +
            '- តារាង និងក្រាហ្វិកងាយៗ\n' +
            '- ប្រាក់ និងការគណនាលុយ\n' +
            '- ម៉ោង និងពេលវេលា\n' +
            '- លំហាត់គណិតវិទ្យាសម្រាប់កុមារ\n' +
            '- លំហាត់ពាក្យ (word problems) ដែលមានការបូក ដក គុណ ចែក\n\n';
        const contextAndMessage = 'បរិបទសន្ទនា៖\n' + conversationContext + '\n\nសំណួរ៖\n' + message;
        return (introduction +
            corePrinciples +
            mathInstructions +
            mathTopics +
            contextAndMessage);
    }
    replaceVietnameseWords(text) {
        const replacements = {
            'phép trừ': 'ការដក',
            'phép cộng': 'ការបូក',
            'phép nhân': 'ការគុណ',
            'phép chia': 'ការចែក',
            'bé hơn': 'តូចជាង',
            'lớn hơn': 'ធំជាង',
            'bằng nhau': 'ស្មើគ្នា',
            'từ bé đến lớn': 'ពីតូចទៅធំ',
            'từ lớn đến bé': 'ពីធំទៅតូច',
        };
        for (const [key, value] of Object.entries(replacements)) {
            text = text.replace(new RegExp(key, 'gi'), value);
        }
        return text;
    }
};
exports.GemmaService = GemmaService;
exports.GemmaService = GemmaService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], GemmaService);
//# sourceMappingURL=gemma.service.js.map