import { MigrationInterface, QueryRunner } from "typeorm";
export declare class AddRandomAnswersToQuestions1754041200000 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
