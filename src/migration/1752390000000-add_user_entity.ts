import { MigrationInterface, QueryRunner } from "typeorm";

export class MigrationAddUserEntity1752390000000 implements MigrationInterface {
    name = 'MigrationAddUserEntity1752390000000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "user" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP DEFAULT now(),
                "deleted_at" TIMESTAMP,
                "name" character varying NOT NULL,
                "email" character varying NOT NULL,
                "password" character varying NOT NULL,
                CONSTRAINT "UQ_415c35b9b3b6fe45a3b065030f5" UNIQUE ("email"),
                CONSTRAINT "PK_b54f8ea623b17094db7667d8206" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }
}
