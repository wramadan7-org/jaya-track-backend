import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRelationShopsAndPayments1765829606327 implements MigrationInterface {
    name = 'AddRelationShopsAndPayments1765829606327'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payments" DROP COLUMN "store_id"`);
        await queryRunner.query(`ALTER TABLE "payments" ADD "store_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payments" ADD CONSTRAINT "FK_8afabeaa460738befe497e857c7" FOREIGN KEY ("store_id") REFERENCES "shops"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payments" DROP CONSTRAINT "FK_8afabeaa460738befe497e857c7"`);
        await queryRunner.query(`ALTER TABLE "payments" DROP COLUMN "store_id"`);
        await queryRunner.query(`ALTER TABLE "payments" ADD "store_id" character varying NOT NULL`);
    }

}
