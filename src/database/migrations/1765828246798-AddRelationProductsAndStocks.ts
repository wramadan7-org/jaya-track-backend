import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRelationProductsAndStocks1765828246798 implements MigrationInterface {
  name = 'AddRelationProductsAndStocks1765828246798';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "stocks" DROP COLUMN "product_id"`);
    await queryRunner.query(
      `ALTER TABLE "stocks" ADD "product_id" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "stocks" ADD CONSTRAINT "FK_cdcdc9a4b531cbd24c06bc4f9e7" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "stocks" DROP CONSTRAINT "FK_cdcdc9a4b531cbd24c06bc4f9e7"`,
    );
    await queryRunner.query(`ALTER TABLE "stocks" DROP COLUMN "product_id"`);
    await queryRunner.query(
      `ALTER TABLE "stocks" ADD "product_id" character varying NOT NULL`,
    );
  }
}
