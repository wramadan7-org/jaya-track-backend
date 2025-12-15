import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeColumnTypeToNumberInProducts1765822184645 implements MigrationInterface {
  name = 'ChangeColumnTypeToNumberInProducts1765822184645';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "products" DROP COLUMN "fill_per_sack"`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD "fill_per_sack" integer NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "base_price"`);
    await queryRunner.query(
      `ALTER TABLE "products" ADD "base_price" integer NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "base_price"`);
    await queryRunner.query(
      `ALTER TABLE "products" ADD "base_price" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" DROP COLUMN "fill_per_sack"`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD "fill_per_sack" character varying NOT NULL`,
    );
  }
}
