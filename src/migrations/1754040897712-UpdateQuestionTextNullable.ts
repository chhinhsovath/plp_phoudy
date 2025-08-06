import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateQuestionTextNullable1754040897712 implements MigrationInterface {
    name = 'UpdateQuestionTextNullable1754040897712'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "questions" ALTER COLUMN "question_text" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "questions" ALTER COLUMN "question_text" SET NOT NULL`);
    }

}
