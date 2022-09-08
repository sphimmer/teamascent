import {MigrationInterface, QueryRunner} from "typeorm";

export class defaultTeamState1662650110988 implements MigrationInterface {
    name = 'defaultTeamState1662650110988'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "team" ALTER COLUMN "state" SET DEFAULT 'DRAFT'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "team" ALTER COLUMN "state" DROP DEFAULT`);
    }

}
