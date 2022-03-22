import { MigrationInterface, QueryRunner } from 'typeorm';

export class roles1647666017834 implements MigrationInterface {
  name = 'roles1647666017834';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "role" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" text NOT NULL, "responsibilities" text NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "skill" ADD "roleId" integer`);
    await queryRunner.query(
      `ALTER TABLE "skill" ADD CONSTRAINT "FK_808b02519fd89b7c934ec2f0e7b" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "skill" DROP CONSTRAINT "FK_808b02519fd89b7c934ec2f0e7b"`,
    );
    await queryRunner.query(`ALTER TABLE "skill" DROP COLUMN "roleId"`);
    await queryRunner.query(`DROP TABLE "role"`);
  }
}
