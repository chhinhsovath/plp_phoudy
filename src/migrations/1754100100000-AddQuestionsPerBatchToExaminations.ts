import { MigrationInterface, QueryRunner } from "typeorm";

export class AddQuestionsPerBatchToExaminations1754100100000 implements MigrationInterface {
    name = 'AddQuestionsPerBatchToExaminations1754100100000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "examinations" ADD "questions_per_batch" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "examinations" DROP COLUMN "questions_per_batch"`);
    }
}