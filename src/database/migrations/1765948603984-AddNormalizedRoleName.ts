import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddNormalizedRoleName1765948603984 implements MigrationInterface {
  name = 'AddNormalizedRoleName1765948603984';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "roles" ADD "name_normalized" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "roles" DROP COLUMN "name_normalized"`,
    );
  }
}
