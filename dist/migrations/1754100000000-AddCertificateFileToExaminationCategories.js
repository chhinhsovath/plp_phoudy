"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddCertificateFileToExaminationCategories1754100000000 = void 0;
class AddCertificateFileToExaminationCategories1754100000000 {
    name = 'AddCertificateFileToExaminationCategories1754100000000';
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "examination_categories" ADD "certificate_file" character varying`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "examination_categories" DROP COLUMN "certificate_file"`);
    }
}
exports.AddCertificateFileToExaminationCategories1754100000000 = AddCertificateFileToExaminationCategories1754100000000;
//# sourceMappingURL=1754100000000-AddCertificateFileToExaminationCategories.js.map