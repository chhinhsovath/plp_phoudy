"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddQuestionsPerBatchToExaminations1754100100000 = void 0;
class AddQuestionsPerBatchToExaminations1754100100000 {
    name = 'AddQuestionsPerBatchToExaminations1754100100000';
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "examinations" ADD "questions_per_batch" character varying`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "examinations" DROP COLUMN "questions_per_batch"`);
    }
}
exports.AddQuestionsPerBatchToExaminations1754100100000 = AddQuestionsPerBatchToExaminations1754100100000;
//# sourceMappingURL=1754100100000-AddQuestionsPerBatchToExaminations.js.map