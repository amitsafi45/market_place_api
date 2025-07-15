import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveDuplicateCol1752404946682 implements MigrationInterface {
  name = 'RemoveDuplicateCol1752404946682';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "order_item_entity" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_item_entity" ADD "updated_at" TIMESTAMP DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_item_entity" ADD "deleted_at" TIMESTAMP`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "order_item_entity" DROP COLUMN "deleted_at"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_item_entity" DROP COLUMN "updated_at"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_item_entity" DROP COLUMN "created_at"`,
    );
  }
}
