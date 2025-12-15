import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRelationProductsAndSalesItems1765829147097 implements MigrationInterface {
  name = 'AddRelationProductsAndSalesItems1765829147097';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sales_items" DROP COLUMN "product_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales_items" ADD "product_id" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales_items" ADD CONSTRAINT "FK_2e62caaea771f155d11324a50fb" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sales_items" DROP CONSTRAINT "FK_2e62caaea771f155d11324a50fb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales_items" DROP COLUMN "product_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sales_items" ADD "product_id" character varying NOT NULL`,
    );
  }
}
