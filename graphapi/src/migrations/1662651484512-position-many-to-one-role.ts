import {MigrationInterface, QueryRunner} from "typeorm";

export class positionManyToOneRole1662651484512 implements MigrationInterface {
    name = 'positionManyToOneRole1662651484512'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "position" DROP CONSTRAINT "FK_3143da069799a48db4cd2536b24"`);
        await queryRunner.query(`ALTER TABLE "position" DROP CONSTRAINT "REL_3143da069799a48db4cd2536b2"`);
        await queryRunner.query(`ALTER TABLE "position" ADD CONSTRAINT "FK_3143da069799a48db4cd2536b24" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "position" DROP CONSTRAINT "FK_3143da069799a48db4cd2536b24"`);
        await queryRunner.query(`ALTER TABLE "position" ADD CONSTRAINT "REL_3143da069799a48db4cd2536b2" UNIQUE ("roleId")`);
        await queryRunner.query(`ALTER TABLE "position" ADD CONSTRAINT "FK_3143da069799a48db4cd2536b24" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
