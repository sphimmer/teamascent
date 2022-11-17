import {MigrationInterface, QueryRunner} from "typeorm";

export class uniqueSkillidUserid1668705411128 implements MigrationInterface {
    name = 'uniqueSkillidUserid1668705411128'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE UNIQUE INDEX "user_skill_unique" ON "user_to_skill" ("userId", "skillId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."user_skill_unique"`);
    }

}
