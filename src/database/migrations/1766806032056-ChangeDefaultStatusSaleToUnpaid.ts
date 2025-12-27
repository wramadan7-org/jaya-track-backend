import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeDefaultStatusSaleToUnpaid1766806032056 implements MigrationInterface {
  name = 'ChangeDefaultStatusSaleToUnpaid1766806032056';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sales" ALTER COLUMN "status" SET DEFAULT 'UNPAID'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sales" ALTER COLUMN "status" SET DEFAULT 'PAID'`,
    );
  }
}
