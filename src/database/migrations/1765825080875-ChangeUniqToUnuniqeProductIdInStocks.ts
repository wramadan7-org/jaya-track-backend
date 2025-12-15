import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeUniqToUnuniqeProductIdInStocks1765825080875 implements MigrationInterface {
  name = 'ChangeUniqToUnuniqeProductIdInStocks1765825080875';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "stocks" DROP CONSTRAINT "UQ_cdcdc9a4b531cbd24c06bc4f9e7"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "stocks" ADD CONSTRAINT "UQ_cdcdc9a4b531cbd24c06bc4f9e7" UNIQUE ("product_id")`,
    );
  }
}
