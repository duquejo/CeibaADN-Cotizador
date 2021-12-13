import { Module } from '@nestjs/common';
import { CalendarioFestivosControlador } from 'src/infraestructura/calendariofestivos/controlador/calendariofestivos.controlador';
import { CalendarioFestivosProveedorModule } from 'src/infraestructura/calendariofestivos/proveedor/calendariofestivos-proveedor.module';

@Module({
  imports: [
    CalendarioFestivosProveedorModule
  ],
  controllers: [CalendarioFestivosControlador]
})
export class CalendarioFestivosModule {}
