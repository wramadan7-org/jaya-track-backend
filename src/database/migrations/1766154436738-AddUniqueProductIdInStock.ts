import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUniqueProductIdInStock1766154436738 implements MigrationInterface {
  name = 'AddUniqueProductIdInStock1766154436738';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "stocks" DROP CONSTRAINT "FK_cdcdc9a4b531cbd24c06bc4f9e7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "stocks" ADD CONSTRAINT "UQ_cdcdc9a4b531cbd24c06bc4f9e7" UNIQUE ("product_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "stocks" ADD CONSTRAINT "FK_cdcdc9a4b531cbd24c06bc4f9e7" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "stocks" DROP CONSTRAINT "FK_cdcdc9a4b531cbd24c06bc4f9e7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "stocks" DROP CONSTRAINT "UQ_cdcdc9a4b531cbd24c06bc4f9e7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "stocks" ADD CONSTRAINT "FK_cdcdc9a4b531cbd24c06bc4f9e7" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
