import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSoundMetadataTable1753944727110
  implements MigrationInterface
{
  name = 'CreateSoundMetadataTable1753944727110';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "sound_metadata" (
                "id" SERIAL NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "filename" character varying NOT NULL,
                "original_name" character varying NOT NULL,
                "file_path" character varying NOT NULL,
                "url" character varying NOT NULL,
                "size" bigint NOT NULL,
                "mime_type" character varying NOT NULL,
                "tags" text array NOT NULL DEFAULT '{}',
                "description" character varying,
                "duration" double precision,
                "bitrate" integer,
                "sample_rate" integer,
                CONSTRAINT "UQ_sound_metadata_filename" UNIQUE ("filename"),
                CONSTRAINT "PK_sound_metadata_id" PRIMARY KEY ("id")
            )
        `);

    await queryRunner.query(`
            CREATE INDEX "IDX_sound_metadata_filename" ON "sound_metadata" ("filename")
        `);

    await queryRunner.query(`
            CREATE INDEX "IDX_sound_metadata_tags" ON "sound_metadata" ("tags")
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_sound_metadata_tags"`);
    await queryRunner.query(`DROP INDEX "IDX_sound_metadata_filename"`);
    await queryRunner.query(`DROP TABLE "sound_metadata"`);
  }
}
