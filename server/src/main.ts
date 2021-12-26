import * as helmet from 'helmet';
import * as compression from 'compression';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from 'src/app.module';
import { AppLogger } from 'src/infraestructura/configuracion/ceiba-logger.service';
import { ConfigService } from '@nestjs/config';
import { EnvVariables } from 'src/infraestructura/configuracion/environment/env-variables.enum';
import { FiltroExcepcionesDeNegocio } from './infraestructura/excepciones/filtro-excepciones-negocio';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const logger = await app.resolve(AppLogger);
  const configService = app.get(ConfigService);

  // Compression gzip strategy
  app.use( compression() );  

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new FiltroExcepcionesDeNegocio(logger));

  app.setGlobalPrefix(configService.get(EnvVariables.APPLICATION_CONTEXT_PATH));

  const swaggerOptions = new DocumentBuilder()
    .setTitle('Bloque Arquitectura Hexagonal Node')
    .setDescription('Bloque que hace uso de Nest.js para la creación de API\'s con Node.js')
    .setVersion('1.0')
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('/api/doc', app, swaggerDocument);
  
  // CSP Protection
  app.use( helmet() );
  
  await app.listen( configService.get( EnvVariables.APPLICATION_PORT ) );
}
bootstrap();
