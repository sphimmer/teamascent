import {MigrationInterface, QueryRunner} from "typeorm";

export class renameCompetency1675207452306 implements MigrationInterface {
    name = 'renameCompetency1675207452306'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_to_skill" RENAME COLUMN "compentencyLevel" TO "competencyLevel"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_to_skill" RENAME COLUMN "competencyLevel" TO "compentencyLevel"`);
    }

}
