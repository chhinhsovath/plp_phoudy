"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateQuestionTextNullable1754040897712 = void 0;
class UpdateQuestionTextNullable1754040897712 {
    name = 'UpdateQuestionTextNullable1754040897712';
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "questions" ALTER COLUMN "question_text" DROP NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "questions" ALTER COLUMN "question_text" SET NOT NULL`);
    }
}
exports.UpdateQuestionTextNullable1754040897712 = UpdateQuestionTextNullable1754040897712;
//# sourceMappingURL=1754040897712-UpdateQuestionTextNullable.js.map