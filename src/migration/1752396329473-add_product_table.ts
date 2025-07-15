import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddProductTable1752396329473 implements MigrationInterface {
  name = 'AddProductTable1752396329473';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "product_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "price" numeric NOT NULL, "stock" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "seller_id" uuid, CONSTRAINT "PK_6e8f75045ddcd1c389c765c896e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_entity" ADD CONSTRAINT "FK_7c6830f1f4f5d98c09f87141adb" FOREIGN KEY ("seller_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product_entity" DROP CONSTRAINT "FK_7c6830f1f4f5d98c09f87141adb"`,
    );
    await queryRunner.query(`DROP TABLE "product_entity"`);
  }
}
