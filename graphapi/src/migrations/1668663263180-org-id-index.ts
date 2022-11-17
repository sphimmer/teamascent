import {MigrationInterface, QueryRunner} from "typeorm";

export class orgIdIndex1668663263180 implements MigrationInterface {
    name = 'orgIdIndex1668663263180'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX "IDX_dfda472c0af7812401e592b6a6" ON "user" ("organizationId") `);
        await queryRunner.query(`CREATE INDEX "IDX_2bcd50772082305f3bcee6b6da" ON "role" ("organizationId") `);
        await queryRunner.query(`CREATE INDEX "IDX_12e10686074dba7e8fd02f41bf" ON "team" ("organizationId") `);
        await queryRunner.query(`CREATE INDEX "IDX_242071aa3ac50f8cfbb729c7e3" ON "position" ("organizationId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_242071aa3ac50f8cfbb729c7e3"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_12e10686074dba7e8fd02f41bf"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2bcd50772082305f3bcee6b6da"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_dfda472c0af7812401e592b6a6"`);
    }

}
