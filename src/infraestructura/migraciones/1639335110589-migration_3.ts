import {MigrationInterface, QueryRunner} from "typeorm";

export class migration31639335110589 implements MigrationInterface {
    name = 'migration31639335110589'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `cotizacion` CHANGE `totalPorDia` `totalIndividual` int NOT NULL", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `cotizacion` CHANGE `totalIndividual` `totalPorDia` int NOT NULL", undefined);
    }

}
