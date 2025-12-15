import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeUniqToUnuniqeProductIdAndReferenceIdInStocksMovemens1765825309449 implements MigrationInterface {
  name =
    'ChangeUniqToUnuniqeProductIdAndReferenceIdInStocksMovemens1765825309449';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "stock_movements" DROP CONSTRAINT "UQ_2c1bb05b80ddcc562cd28d826c6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "stock_movements" DROP CONSTRAINT "UQ_47ff43584c23092389aa9d9396f"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "stock_movements" ADD CONSTRAINT "UQ_47ff43584c23092389aa9d9396f" UNIQUE ("reference_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "stock_movements" ADD CONSTRAINT "UQ_2c1bb05b80ddcc562cd28d826c6" UNIQUE ("product_id")`,
    );
  }
}
