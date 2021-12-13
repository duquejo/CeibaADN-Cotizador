import {MigrationInterface, QueryRunner} from "typeorm";

export class migration41639341611059 implements MigrationInterface {
    name = 'migration41639341611059'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `cotizacion` DROP COLUMN `totalIndividual`", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `cotizacion` ADD `totalIndividual` int NOT NULL", undefined);
    }

}
