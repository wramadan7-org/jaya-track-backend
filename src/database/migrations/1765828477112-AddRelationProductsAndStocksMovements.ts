import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRelationProductsAndStocksMovements1765828477112 implements MigrationInterface {
  name = 'AddRelationProductsAndStocksMovements1765828477112';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "stock_movements" DROP COLUMN "product_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "stock_movements" ADD "product_id" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "stock_movements" ADD CONSTRAINT "FK_2c1bb05b80ddcc562cd28d826c6" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "stock_movements" DROP CONSTRAINT "FK_2c1bb05b80ddcc562cd28d826c6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "stock_movements" DROP COLUMN "product_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "stock_movements" ADD "product_id" character varying NOT NULL`,
    );
  }
}
