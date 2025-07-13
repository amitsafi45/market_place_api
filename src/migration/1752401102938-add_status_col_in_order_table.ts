import { MigrationInterface, QueryRunner } from "typeorm";

export class AddStatusColInOrderTable1752401102938 implements MigrationInterface {
    name = 'AddStatusColInOrderTable1752401102938'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."order_entity_status_enum" AS ENUM('Pending', 'Paid', 'Cancelled')`);
        await queryRunner.query(`ALTER TABLE "order_entity" ADD "status" "public"."order_entity_status_enum" NOT NULL DEFAULT 'Pending'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_entity" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."order_entity_status_enum"`);
    }

}
