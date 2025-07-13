import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDescriptionColInProductTable1752401981729 implements MigrationInterface {
    name = 'AddDescriptionColInProductTable1752401981729'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_entity" ADD "description" character varying(200) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_entity" DROP COLUMN "description"`);
    }

}
