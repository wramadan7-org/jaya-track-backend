import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateStocksMovementsTable1765823896264 implements MigrationInterface {
  name = 'CreateStocksMovementsTable1765823896264';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."type" AS ENUM('IN', 'OUT', 'RETURN', 'ADJUSTMENT')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."reference_type" AS ENUM('INVOICE', 'PURCHASE_ORDER', 'STOCK_ADJUSTMENT')`,
    );
    await queryRunner.query(
      `CREATE TABLE "stock_movements" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "product_id" character varying NOT NULL, "unitType" "public"."unit_type" NOT NULL DEFAULT 'DOZENS', "qty_before" integer NOT NULL, "qty_change" integer NOT NULL, "qty_after" integer NOT NULL, "type" "public"."type" NOT NULL DEFAULT 'IN', "referenceType" "public"."reference_type" NOT NULL DEFAULT 'STOCK_ADJUSTMENT', "reference_id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_2c1bb05b80ddcc562cd28d826c6" UNIQUE ("product_id"), CONSTRAINT "UQ_47ff43584c23092389aa9d9396f" UNIQUE ("reference_id"), CONSTRAINT "PK_57a26b190618550d8e65fb860e7" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "stock_movements"`);
    await queryRunner.query(`DROP TYPE "public"."reference_type"`);
    await queryRunner.query(`DROP TYPE "public"."type"`);
  }
}
