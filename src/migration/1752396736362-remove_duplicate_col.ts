import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveDuplicateCol1752396736362 implements MigrationInterface {
    name = 'RemoveDuplicateCol1752396736362'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_entity" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "product_entity" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "product_entity" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "product_entity" ADD "updated_at" TIMESTAMP DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "product_entity" ADD "deleted_at" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_entity" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "product_entity" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "product_entity" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "product_entity" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "product_entity" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

}
