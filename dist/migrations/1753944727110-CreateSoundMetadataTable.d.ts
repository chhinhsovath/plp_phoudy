import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class CreateSoundMetadataTable1753944727110 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
