import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePaymentsTable1765826178069 implements MigrationInterface {
  name = 'CreatePaymentsTable1765826178069';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."payments_method_enum" AS ENUM('CASH', 'TRANSFER')`,
    );
    await queryRunner.query(
      `CREATE TABLE "payments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "store_id" character varying NOT NULL, "amount_paid" integer NOT NULL, "method" "public"."payments_method_enum" NOT NULL DEFAULT 'CASH', "note" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_197ab7af18c93fbb0c9b28b4a59" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "payments"`);
    await queryRunner.query(`DROP TYPE "public"."payments_method_enum"`);
  }
}
