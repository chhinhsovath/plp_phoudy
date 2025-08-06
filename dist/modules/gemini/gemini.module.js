"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeminiModule = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const config_1 = require("@nestjs/config");
const gemini_controller_1 = require("./gemini.controller");
const gemini_service_1 = require("./gemini.service");
const students_module_1 = require("../students/students.module");
const classes_module_1 = require("../classes/classes.module");
const analysis_module_1 = require("../analysis/analysis.module");
let GeminiModule = class GeminiModule {
};
exports.GeminiModule = GeminiModule;
exports.GeminiModule = GeminiModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule,
            axios_1.HttpModule,
            students_module_1.StudentsModule,
            classes_module_1.ClassesModule,
            analysis_module_1.AnalysisModule,
        ],
        controllers: [gemini_controller_1.GeminiController],
        providers: [gemini_service_1.GeminiService],
        exports: [gemini_service_1.GeminiService],
    })
], GeminiModule);
//# sourceMappingURL=gemini.module.js.map