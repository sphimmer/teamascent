import {MigrationInterface, QueryRunner} from "typeorm";

export class teamPosition1659068724851 implements MigrationInterface {
    name = 'teamPosition1659068724851'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "position" ("id" SERIAL NOT NULL, "roleId" integer, "userId" uuid, "teamId" integer, CONSTRAINT "REL_3143da069799a48db4cd2536b2" UNIQUE ("roleId"), CONSTRAINT "REL_039f90c019013ef5d8d032f32f" UNIQUE ("userId"), CONSTRAINT "PK_b7f483581562b4dc62ae1a5b7e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "team" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "state" character varying NOT NULL, CONSTRAINT "PK_f57d8293406df4af348402e4b74" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "position" ADD CONSTRAINT "FK_3143da069799a48db4cd2536b24" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "position" ADD CONSTRAINT "FK_039f90c019013ef5d8d032f32f1" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "position" ADD CONSTRAINT "FK_daeb7287d99beecfcf1824db4bf" FOREIGN KEY ("teamId") REFERENCES "team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "position" DROP CONSTRAINT "FK_daeb7287d99beecfcf1824db4bf"`);
        await queryRunner.query(`ALTER TABLE "position" DROP CONSTRAINT "FK_039f90c019013ef5d8d032f32f1"`);
        await queryRunner.query(`ALTER TABLE "position" DROP CONSTRAINT "FK_3143da069799a48db4cd2536b24"`);
        await queryRunner.query(`DROP TABLE "team"`);
        await queryRunner.query(`DROP TABLE "position"`);
    }

}
