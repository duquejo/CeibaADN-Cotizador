import { Module } from '@nestjs/common';

import { CotizacionControlador } from 'src/infraestructura/cotizacion/controlador/cotizacion.controlador';
import { CotizacionProveedorModule } from 'src/infraestructura/cotizacion/proveedor/cotizacion-proveedor.module';

@Module({
  imports: [
    CotizacionProveedorModule
  ],
  controllers: [CotizacionControlador]
})
export class CotizacionModule {}
