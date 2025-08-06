import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRandomAnswersToQuestions1754041200000 implements MigrationInterface {
    name = 'AddRandomAnswersToQuestions1754041200000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "questions" ADD "random_answers" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "questions" DROP COLUMN "random_answers"`);
    }
}