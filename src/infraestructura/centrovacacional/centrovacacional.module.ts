import { Module } from '@nestjs/common';
import { CentroVacacionalControlador } from 'src/infraestructura/centrovacacional/controlador/centrovacacional.controlador';
import { CentroVacacionalProveedorModule } from 'src/infraestructura/centrovacacional/proveedor/centrovacacional-proveedor.module';

@Module({
  imports: [
    CentroVacacionalProveedorModule
  ],
  controllers: [CentroVacacionalControlador]
})
export class CentroVacacionalModule {}
