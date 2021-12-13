import { Module } from '@nestjs/common';
import { UsuarioControlador } from 'src/infraestructura/usuario/controlador/usuario.controlador';
import { UsuarioProveedorModule } from 'src/infraestructura/usuario/proveedor/usuario-proveedor.module';
@Module({
  imports: [
    UsuarioProveedorModule
  ],
  controllers: [UsuarioControlador],
})
export class UsuarioModule {}