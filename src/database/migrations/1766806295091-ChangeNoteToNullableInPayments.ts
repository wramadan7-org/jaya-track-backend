import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeNoteToNullableInPayments1766806295091 implements MigrationInterface {
  name = 'ChangeNoteToNullableInPayments1766806295091';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "payments" ALTER COLUMN "note" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "payments" ALTER COLUMN "note" SET NOT NULL`,
    );
  }
}
