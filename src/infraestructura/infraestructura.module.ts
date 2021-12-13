import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';

/**
 * Módulos de la aplicación
 */
import { UsuarioModule } from 'src/infraestructura/usuario/usuario.module';
import { CentroVacacionalModule } from 'src/infraestructura/centrovacacional/centrovacacional.module';
import { CalendarioFestivosModule } from 'src/infraestructura/calendariofestivos/calendariofestivos.module';
import { CotizacionModule } from 'src/infraestructura/cotizacion/cotizacion.module';
import { CategoriaUsuariosModule } from 'src/infraestructura/categoriausuarios/categoriausuarios.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { AppLogger } from 'src/infraestructura/configuracion/ceiba-logger.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NodeEnv } from 'src/infraestructura/configuracion/environment/env-node.enum';
import { databaseConfigFactory } from 'src/infraestructura/configuracion/database.config';

@Module({
  providers: [AppLogger],
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: databaseConfigFactory,
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `env/${process.env.NODE_ENV}.env`,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid(NodeEnv.DEVELOPMENT, NodeEnv.PRODUCTION)
          .required(),
      }),
    }),
    UsuarioModule,
    CentroVacacionalModule,
    CalendarioFestivosModule,
    CotizacionModule,
    CategoriaUsuariosModule
  ],
})
export class InfraestructuraModule {}
