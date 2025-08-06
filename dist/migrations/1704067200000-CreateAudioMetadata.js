"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAudioMetadata1704067200000 = void 0;
const typeorm_1 = require("typeorm");
class CreateAudioMetadata1704067200000 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'audio_metadata',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'filename',
                    type: 'varchar',
                    length: '255',
                },
                {
                    name: 'original_name',
                    type: 'varchar',
                    length: '255',
                },
                {
                    name: 'url',
                    type: 'varchar',
                    length: '500',
                },
                {
                    name: 'path',
                    type: 'varchar',
                    length: '500',
                },
                {
                    name: 'size',
                    type: 'bigint',
                },
                {
                    name: 'duration',
                    type: 'int',
                    isNullable: true,
                },
                {
                    name: 'mime_type',
                    type: 'varchar',
                    length: '100',
                },
                {
                    name: 'tags',
                    type: 'json',
                    isNullable: true,
                },
                {
                    name: 'description',
                    type: 'text',
                    isNullable: true,
                },
                {
                    name: 'alt_text',
                    type: 'text',
                    isNullable: true,
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                    onUpdate: 'CURRENT_TIMESTAMP',
                },
            ],
        }), true);
    }
    async down(queryRunner) {
        await queryRunner.dropTable('audio_metadata');
    }
}
exports.CreateAudioMetadata1704067200000 = CreateAudioMetadata1704067200000;
//# sourceMappingURL=1704067200000-CreateAudioMetadata.js.map