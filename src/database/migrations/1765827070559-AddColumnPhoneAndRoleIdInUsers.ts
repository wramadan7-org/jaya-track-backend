import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddColumnPhoneAndRoleIdInUsers1765827070559 implements MigrationInterface {
  name = 'AddColumnPhoneAndRoleIdInUsers1765827070559';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "role_id" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "phone" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phone"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "role_id"`);
  }
}
