import {MigrationInterface, QueryRunner} from "typeorm";

export class migration11639330845102 implements MigrationInterface {
    name = 'migration11639330845102'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `categoriausuarios` (`id` int NOT NULL AUTO_INCREMENT, `nombre` varchar(100) NOT NULL, `descripcion` varchar(500) NOT NULL, `valorAlta` int NOT NULL, `valorBaja` int NOT NULL, `fecha_creacion` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `fecha_actualizacion` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `centrovacacional` (`id` int NOT NULL AUTO_INCREMENT, `nombre` varchar(100) NOT NULL, `descripcion` varchar(500) NOT NULL DEFAULT '', `calendarioActivo` int NULL, `fecha_creacion` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `fecha_actualizacion` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `calendariofestivos` (`id` int NOT NULL AUTO_INCREMENT, `nombre` varchar(100) NOT NULL, `descripcion` varchar(500) NOT NULL, `festivos` text NOT NULL, `fecha_creacion` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `fecha_actualizacion` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `cotizacion` (`id` int NOT NULL AUTO_INCREMENT, `codigo` varchar(100) NOT NULL, `personas` int NOT NULL, `total` int NOT NULL, `fechaInicio` varchar(100) NOT NULL, `fechaFin` varchar(100) NOT NULL, `fecha_creacion` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `fecha_actualizacion` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `centroVacacionalId` int NOT NULL, `categoriaUsuariosId` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `usuario` (`id` int NOT NULL AUTO_INCREMENT, `nombre` varchar(255) NOT NULL, `clave` varchar(255) NOT NULL, `fechaCreacion` datetime NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `centrovacacional_calendariofestivos` (`centrovacacionalId` int NOT NULL, `calendariofestivosId` int NOT NULL, INDEX `IDX_248f46ebea13c1640c9f735637` (`centrovacacionalId`), INDEX `IDX_3780b7f88aaae48528f23555ca` (`calendariofestivosId`), PRIMARY KEY (`centrovacacionalId`, `calendariofestivosId`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `centrovacacional_categoriausuarios` (`centrovacacionalId` int NOT NULL, `categoriausuariosId` int NOT NULL, INDEX `IDX_c6e1918451b0b3b939860afb5b` (`centrovacacionalId`), INDEX `IDX_97a6d1053cee71fa1df6c7ff1f` (`categoriausuariosId`), PRIMARY KEY (`centrovacacionalId`, `categoriausuariosId`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `cotizacion` ADD CONSTRAINT `FK_8e9e0a6e57b0a91a4b502c87dbd` FOREIGN KEY (`centroVacacionalId`) REFERENCES `centrovacacional`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `cotizacion` ADD CONSTRAINT `FK_5d50a49071a2571d23b6afaad51` FOREIGN KEY (`categoriaUsuariosId`) REFERENCES `categoriausuarios`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `centrovacacional_calendariofestivos` ADD CONSTRAINT `FK_248f46ebea13c1640c9f735637a` FOREIGN KEY (`centrovacacionalId`) REFERENCES `centrovacacional`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `centrovacacional_calendariofestivos` ADD CONSTRAINT `FK_3780b7f88aaae48528f23555ca9` FOREIGN KEY (`calendariofestivosId`) REFERENCES `calendariofestivos`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `centrovacacional_categoriausuarios` ADD CONSTRAINT `FK_c6e1918451b0b3b939860afb5b6` FOREIGN KEY (`centrovacacionalId`) REFERENCES `centrovacacional`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `centrovacacional_categoriausuarios` ADD CONSTRAINT `FK_97a6d1053cee71fa1df6c7ff1ff` FOREIGN KEY (`categoriausuariosId`) REFERENCES `categoriausuarios`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `centrovacacional_categoriausuarios` DROP FOREIGN KEY `FK_97a6d1053cee71fa1df6c7ff1ff`", undefined);
        await queryRunner.query("ALTER TABLE `centrovacacional_categoriausuarios` DROP FOREIGN KEY `FK_c6e1918451b0b3b939860afb5b6`", undefined);
        await queryRunner.query("ALTER TABLE `centrovacacional_calendariofestivos` DROP FOREIGN KEY `FK_3780b7f88aaae48528f23555ca9`", undefined);
        await queryRunner.query("ALTER TABLE `centrovacacional_calendariofestivos` DROP FOREIGN KEY `FK_248f46ebea13c1640c9f735637a`", undefined);
        await queryRunner.query("ALTER TABLE `cotizacion` DROP FOREIGN KEY `FK_5d50a49071a2571d23b6afaad51`", undefined);
        await queryRunner.query("ALTER TABLE `cotizacion` DROP FOREIGN KEY `FK_8e9e0a6e57b0a91a4b502c87dbd`", undefined);
        await queryRunner.query("DROP INDEX `IDX_97a6d1053cee71fa1df6c7ff1f` ON `centrovacacional_categoriausuarios`", undefined);
        await queryRunner.query("DROP INDEX `IDX_c6e1918451b0b3b939860afb5b` ON `centrovacacional_categoriausuarios`", undefined);
        await queryRunner.query("DROP TABLE `centrovacacional_categoriausuarios`", undefined);
        await queryRunner.query("DROP INDEX `IDX_3780b7f88aaae48528f23555ca` ON `centrovacacional_calendariofestivos`", undefined);
        await queryRunner.query("DROP INDEX `IDX_248f46ebea13c1640c9f735637` ON `centrovacacional_calendariofestivos`", undefined);
        await queryRunner.query("DROP TABLE `centrovacacional_calendariofestivos`", undefined);
        await queryRunner.query("DROP TABLE `usuario`", undefined);
        await queryRunner.query("DROP TABLE `cotizacion`", undefined);
        await queryRunner.query("DROP TABLE `calendariofestivos`", undefined);
        await queryRunner.query("DROP TABLE `centrovacacional`", undefined);
        await queryRunner.query("DROP TABLE `categoriausuarios`", undefined);
    }

}
