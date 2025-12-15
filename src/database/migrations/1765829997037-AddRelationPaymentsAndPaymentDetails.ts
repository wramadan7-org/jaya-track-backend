import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRelationPaymentsAndPaymentDetails1765829997037 implements MigrationInterface {
    name = 'AddRelationPaymentsAndPaymentDetails1765829997037'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment_details" DROP COLUMN "payment_id"`);
        await queryRunner.query(`ALTER TABLE "payment_details" ADD "payment_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payment_details" ADD CONSTRAINT "FK_416bfb88e82a92320be124ba622" FOREIGN KEY ("payment_id") REFERENCES "payments"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment_details" DROP CONSTRAINT "FK_416bfb88e82a92320be124ba622"`);
        await queryRunner.query(`ALTER TABLE "payment_details" DROP COLUMN "payment_id"`);
        await queryRunner.query(`ALTER TABLE "payment_details" ADD "payment_id" character varying NOT NULL`);
    }

}
