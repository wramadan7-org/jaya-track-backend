import { MigrationInterface, QueryRunner } from 'typeorm';

export class RefactorStockMovementsReference1766255910736 implements MigrationInterface {
  name = 'RefactorStockMovementsReference1766255910736';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "stock_movements" DROP CONSTRAINT "FK_47ff43584c23092389aa9d9396f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "stock_movements" ALTER COLUMN "reference_id" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "stock_movements" ALTER COLUMN "reference_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "stock_movements" ADD CONSTRAINT "FK_47ff43584c23092389aa9d9396f" FOREIGN KEY ("reference_id") REFERENCES "sales"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }
}
