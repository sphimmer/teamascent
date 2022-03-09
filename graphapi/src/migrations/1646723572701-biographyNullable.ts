import { MigrationInterface, QueryRunner } from 'typeorm';

export class biographyNullable1646723572701 implements MigrationInterface {
  name = 'biographyNullable1646723572701';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "biography" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "biography" SET NOT NULL`,
    );
  }
}
