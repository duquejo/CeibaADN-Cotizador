import {MigrationInterface, QueryRunner} from "typeorm";

export class migration21639334929750 implements MigrationInterface {
    name = 'migration21639334929750'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `cotizacion` ADD `totalPorDia` int NOT NULL", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `cotizacion` DROP COLUMN `totalPorDia`", undefined);
    }

}
