import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSalesTable1765824803385 implements MigrationInterface {
  name = 'CreateSalesTable1765824803385';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."status" AS ENUM('PAID', 'PARTIAL', 'UNPAID')`,
    );
    await queryRunner.query(
      `CREATE TABLE "sales" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "store_id" character varying NOT NULL, "invoice_number" integer NOT NULL, "grand_total" integer NOT NULL, "status" "public"."status" NOT NULL DEFAULT 'PAID', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_4f0bc990ae81dba46da680895ea" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "sales"`);
    await queryRunner.query(`DROP TYPE "public"."status"`);
  }
}
