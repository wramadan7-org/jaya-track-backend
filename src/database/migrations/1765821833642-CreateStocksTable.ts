import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateStocksTable1765821833642 implements MigrationInterface {
    name = 'CreateStocksTable1765821833642'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."unit_type" AS ENUM('DOZENS', 'SACK')`);
        await queryRunner.query(`CREATE TABLE "stocks" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "product_id" character varying NOT NULL, "qty" integer NOT NULL, "unitType" "public"."unit_type" NOT NULL DEFAULT 'DOZENS', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_cdcdc9a4b531cbd24c06bc4f9e7" UNIQUE ("product_id"), CONSTRAINT "PK_b5b1ee4ac914767229337974575" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "stocks"`);
        await queryRunner.query(`DROP TYPE "public"."unit_type"`);
    }

}
