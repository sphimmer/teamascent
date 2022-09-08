import {MigrationInterface, QueryRunner} from "typeorm";

export class positionTeamidIndex1662656334050 implements MigrationInterface {
    name = 'positionTeamidIndex1662656334050'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX "IDX_daeb7287d99beecfcf1824db4b" ON "position" ("teamId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_daeb7287d99beecfcf1824db4b"`);
    }

}
