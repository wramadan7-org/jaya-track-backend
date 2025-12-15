import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRelationSalesAndSalesItems1765829807485 implements MigrationInterface {
    name = 'AddRelationSalesAndSalesItems1765829807485'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sales_items" DROP COLUMN "sales_id"`);
        await queryRunner.query(`ALTER TABLE "sales_items" ADD "sales_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sales_items" ADD CONSTRAINT "FK_00c5470b7884170bba20642b04c" FOREIGN KEY ("sales_id") REFERENCES "sales"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sales_items" DROP CONSTRAINT "FK_00c5470b7884170bba20642b04c"`);
        await queryRunner.query(`ALTER TABLE "sales_items" DROP COLUMN "sales_id"`);
        await queryRunner.query(`ALTER TABLE "sales_items" ADD "sales_id" character varying NOT NULL`);
    }

}
