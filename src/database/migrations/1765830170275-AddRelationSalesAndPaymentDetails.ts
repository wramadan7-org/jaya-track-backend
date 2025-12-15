import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRelationSalesAndPaymentDetails1765830170275 implements MigrationInterface {
    name = 'AddRelationSalesAndPaymentDetails1765830170275'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment_details" DROP COLUMN "sales_id"`);
        await queryRunner.query(`ALTER TABLE "payment_details" ADD "sales_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payment_details" ADD CONSTRAINT "FK_d986cd3893d6d660ae4e49435a6" FOREIGN KEY ("sales_id") REFERENCES "sales"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment_details" DROP CONSTRAINT "FK_d986cd3893d6d660ae4e49435a6"`);
        await queryRunner.query(`ALTER TABLE "payment_details" DROP COLUMN "sales_id"`);
        await queryRunner.query(`ALTER TABLE "payment_details" ADD "sales_id" character varying NOT NULL`);
    }

}
