"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddRandomAnswersToQuestions1754041200000 = void 0;
class AddRandomAnswersToQuestions1754041200000 {
    name = 'AddRandomAnswersToQuestions1754041200000';
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "questions" ADD "random_answers" boolean NOT NULL DEFAULT false`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "questions" DROP COLUMN "random_answers"`);
    }
}
exports.AddRandomAnswersToQuestions1754041200000 = AddRandomAnswersToQuestions1754041200000;
//# sourceMappingURL=1754041200000-AddRandomAnswersToQuestions.js.map