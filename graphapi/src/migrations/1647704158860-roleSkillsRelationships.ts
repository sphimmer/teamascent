import { MigrationInterface, QueryRunner } from 'typeorm';

export class roleSkillsRelationships1647704158860
  implements MigrationInterface
{
  name = 'roleSkillsRelationships1647704158860';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "skill" DROP CONSTRAINT "FK_808b02519fd89b7c934ec2f0e7b"`,
    );
    await queryRunner.query(
      `CREATE TABLE "role_skills_skill" ("roleId" integer NOT NULL, "skillId" integer NOT NULL, CONSTRAINT "PK_868cc3879d63e1e5190f2eacc1f" PRIMARY KEY ("roleId", "skillId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_daea7097d6cbeabe72c851b128" ON "role_skills_skill" ("roleId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_4dbdfe33f60d59de920794e0b7" ON "role_skills_skill" ("skillId") `,
    );
    await queryRunner.query(`ALTER TABLE "skill" DROP COLUMN "roleId"`);
    await queryRunner.query(
      `ALTER TABLE "role_skills_skill" ADD CONSTRAINT "FK_daea7097d6cbeabe72c851b128c" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "role_skills_skill" ADD CONSTRAINT "FK_4dbdfe33f60d59de920794e0b78" FOREIGN KEY ("skillId") REFERENCES "skill"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "role_skills_skill" DROP CONSTRAINT "FK_4dbdfe33f60d59de920794e0b78"`,
    );
    await queryRunner.query(
      `ALTER TABLE "role_skills_skill" DROP CONSTRAINT "FK_daea7097d6cbeabe72c851b128c"`,
    );
    await queryRunner.query(`ALTER TABLE "skill" ADD "roleId" integer`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_4dbdfe33f60d59de920794e0b7"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_daea7097d6cbeabe72c851b128"`,
    );
    await queryRunner.query(`DROP TABLE "role_skills_skill"`);
    await queryRunner.query(
      `ALTER TABLE "skill" ADD CONSTRAINT "FK_808b02519fd89b7c934ec2f0e7b" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
