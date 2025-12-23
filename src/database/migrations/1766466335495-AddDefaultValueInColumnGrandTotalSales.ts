import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDefaultValueInColumnGrandTotalSales1766466335495 implements MigrationInterface {
  name = 'AddDefaultValueInColumnGrandTotalSales1766466335495';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sales" ALTER COLUMN "grand_total" SET DEFAULT '0'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sales" ALTER COLUMN "grand_total" DROP DEFAULT`,
    );
  }
}
