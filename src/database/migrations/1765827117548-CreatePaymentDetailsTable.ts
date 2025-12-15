import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePaymentDetailsTable1765827117548 implements MigrationInterface {
  name = 'CreatePaymentDetailsTable1765827117548';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "payment_details" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "payment_id" character varying NOT NULL, "sales_id" character varying NOT NULL, "amount" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_309f873cfbc20f57796956a1d33" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "payment_details"`);
  }
}
