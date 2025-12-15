import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSalesItemsTable1765825701165 implements MigrationInterface {
  name = 'CreateSalesItemsTable1765825701165';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "sales_items" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "sales_id" character varying NOT NULL, "product_id" character varying NOT NULL, "unitType" "public"."unit_type" NOT NULL DEFAULT 'DOZENS', "qty" integer NOT NULL, "price" integer NOT NULL, "subtotal" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_534cb3df276d77c81b1234c02b5" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "sales_items"`);
  }
}
