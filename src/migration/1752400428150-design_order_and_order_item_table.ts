import { MigrationInterface, QueryRunner } from 'typeorm';

export class DesignOrderAndOrderItemTable1752400428150
  implements MigrationInterface
{
  name = 'DesignOrderAndOrderItemTable1752400428150';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "order_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, "totalPrice" numeric NOT NULL, "buyer_id" uuid, CONSTRAINT "PK_428b558237e70f2cd8462e1bea1" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "order_item_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "quantity" integer NOT NULL, "priceAtPurchase" numeric NOT NULL, "order_id" uuid, "product_id" uuid, CONSTRAINT "PK_c12e105219e59720676c72957dc" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_entity" ADD CONSTRAINT "FK_8739c5cf9dff270577779d7b2bb" FOREIGN KEY ("buyer_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_item_entity" ADD CONSTRAINT "FK_3fc9facca59c33ee8dcc5a88171" FOREIGN KEY ("order_id") REFERENCES "order_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_item_entity" ADD CONSTRAINT "FK_b8f621e85f144d499dd6bdd936e" FOREIGN KEY ("product_id") REFERENCES "product_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "order_item_entity" DROP CONSTRAINT "FK_b8f621e85f144d499dd6bdd936e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_item_entity" DROP CONSTRAINT "FK_3fc9facca59c33ee8dcc5a88171"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_entity" DROP CONSTRAINT "FK_8739c5cf9dff270577779d7b2bb"`,
    );
    await queryRunner.query(`DROP TABLE "order_item_entity"`);
    await queryRunner.query(`DROP TABLE "order_entity"`);
  }
}
