import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddColumnFillPerSackInSalesItems1766465071226 implements MigrationInterface {
  name = 'AddColumnFillPerSackInSalesItems1766465071226';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sales_items" ADD "fill_per_sack" integer NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sales_items" DROP COLUMN "fill_per_sack"`,
    );
  }
}
