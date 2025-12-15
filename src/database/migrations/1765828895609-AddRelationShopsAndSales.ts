import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRelationShopsAndSales1765828895609 implements MigrationInterface {
    name = 'AddRelationShopsAndSales1765828895609'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sales" DROP COLUMN "store_id"`);
        await queryRunner.query(`ALTER TABLE "sales" ADD "store_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sales" ADD CONSTRAINT "FK_6c1fae113ae666969a94d79d637" FOREIGN KEY ("store_id") REFERENCES "shops"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sales" DROP CONSTRAINT "FK_6c1fae113ae666969a94d79d637"`);
        await queryRunner.query(`ALTER TABLE "sales" DROP COLUMN "store_id"`);
        await queryRunner.query(`ALTER TABLE "sales" ADD "store_id" character varying NOT NULL`);
    }

}
