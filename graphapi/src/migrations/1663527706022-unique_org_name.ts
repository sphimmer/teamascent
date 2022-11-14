import {MigrationInterface, QueryRunner} from "typeorm";

export class uniqueOrgName1663527706022 implements MigrationInterface {
    name = 'uniqueOrgName1663527706022'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_c21e615583a3ebbb0977452afb" ON "organization" ("name") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_c21e615583a3ebbb0977452afb"`);
    }

}
