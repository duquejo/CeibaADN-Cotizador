import { Module } from '@nestjs/common';
import { CategoriaUsuariosControlador } from 'src/infraestructura/categoriausuarios/controlador/categoriausuarios.controlador';
import { CategoriaUsuariosProveedorModule } from 'src/infraestructura/categoriausuarios/proveedor/categoriausuarios-proveedor.module';
@Module({
  imports: [
    CategoriaUsuariosProveedorModule
  ],
  controllers: [ CategoriaUsuariosControlador ]
})
export class CategoriaUsuariosModule {}
