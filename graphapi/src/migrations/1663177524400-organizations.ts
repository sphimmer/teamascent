import {MigrationInterface, QueryRunner} from "typeorm";

export class organizations1663177524400 implements MigrationInterface {
    name = 'organizations1663177524400'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "organization" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_472c1f99a32def1b0abb219cd67" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD "organizationId" uuid`);
        await queryRunner.query(`ALTER TABLE "role" ADD "organizationId" uuid`);
        await queryRunner.query(`ALTER TABLE "team" ADD "organizationId" uuid`);
        await queryRunner.query(`ALTER TABLE "position" ADD "organizationId" uuid`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_dfda472c0af7812401e592b6a61" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "role" ADD CONSTRAINT "FK_2bcd50772082305f3bcee6b6da4" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "team" ADD CONSTRAINT "FK_12e10686074dba7e8fd02f41bf4" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "position" ADD CONSTRAINT "FK_242071aa3ac50f8cfbb729c7e3e" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "position" DROP CONSTRAINT "FK_242071aa3ac50f8cfbb729c7e3e"`);
        await queryRunner.query(`ALTER TABLE "team" DROP CONSTRAINT "FK_12e10686074dba7e8fd02f41bf4"`);
        await queryRunner.query(`ALTER TABLE "role" DROP CONSTRAINT "FK_2bcd50772082305f3bcee6b6da4"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_dfda472c0af7812401e592b6a61"`);
        await queryRunner.query(`ALTER TABLE "position" DROP COLUMN "organizationId"`);
        await queryRunner.query(`ALTER TABLE "team" DROP COLUMN "organizationId"`);
        await queryRunner.query(`ALTER TABLE "role" DROP COLUMN "organizationId"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "organizationId"`);
        await queryRunner.query(`DROP TABLE "organization"`);
    }

}
