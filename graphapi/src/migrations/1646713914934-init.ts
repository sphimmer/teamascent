import { MigrationInterface, QueryRunner } from 'typeorm';

export class init1646713914934 implements MigrationInterface {
  name = 'init1646713914934';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "skill" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_a0d33334424e64fb78dc3ce7196" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_to_skill" ("userToSkillId" SERIAL NOT NULL, "userId" uuid NOT NULL, "skillId" integer NOT NULL, "compentencyLevel" integer NOT NULL, CONSTRAINT "PK_160bda22a245ebc00c8b052a910" PRIMARY KEY ("userToSkillId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "dateOfBirth" TIMESTAMP NOT NULL, "biography" character varying NOT NULL, "password" character varying NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_to_skill" ADD CONSTRAINT "FK_4d79a314fde425dfb28080628d8" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_to_skill" ADD CONSTRAINT "FK_25710855a4face4ed617cedd33a" FOREIGN KEY ("skillId") REFERENCES "skill"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_to_skill" DROP CONSTRAINT "FK_25710855a4face4ed617cedd33a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_to_skill" DROP CONSTRAINT "FK_4d79a314fde425dfb28080628d8"`,
    );
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "user_to_skill"`);
    await queryRunner.query(`DROP TABLE "skill"`);
  }
}
