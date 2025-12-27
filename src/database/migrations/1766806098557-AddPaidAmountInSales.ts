import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPaidAmountInSales1766806098557 implements MigrationInterface {
  name = 'AddPaidAmountInSales1766806098557';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sales" ADD "paid_amount" integer NOT NULL DEFAULT '0'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "sales" DROP COLUMN "paid_amount"`);
  }
}
