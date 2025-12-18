import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUniqueNameNormalized1765949549442 implements MigrationInterface {
  name = 'AddUniqueNameNormalized1765949549442';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "roles" ADD CONSTRAINT "UQ_3f3e4df6015e00993d4da24f1ff" UNIQUE ("name_normalized")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "roles" DROP CONSTRAINT "UQ_3f3e4df6015e00993d4da24f1ff"`,
    );
  }
}
