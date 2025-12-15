import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRelationStockMovementsAndSales1765829365118 implements MigrationInterface {
    name = 'AddRelationStockMovementsAndSales1765829365118'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stock_movements" DROP COLUMN "reference_id"`);
        await queryRunner.query(`ALTER TABLE "stock_movements" ADD "reference_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "stock_movements" ADD CONSTRAINT "FK_47ff43584c23092389aa9d9396f" FOREIGN KEY ("reference_id") REFERENCES "sales"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stock_movements" DROP CONSTRAINT "FK_47ff43584c23092389aa9d9396f"`);
        await queryRunner.query(`ALTER TABLE "stock_movements" DROP COLUMN "reference_id"`);
        await queryRunner.query(`ALTER TABLE "stock_movements" ADD "reference_id" character varying NOT NULL`);
    }

}
