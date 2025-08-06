import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCertificateFileToExaminationCategories1754100000000 implements MigrationInterface {
    name = 'AddCertificateFileToExaminationCategories1754100000000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "examination_categories" ADD "certificate_file" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "examination_categories" DROP COLUMN "certificate_file"`);
    }
}