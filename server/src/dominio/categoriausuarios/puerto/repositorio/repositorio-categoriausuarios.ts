import { CategoriaUsuarios } from 'src/dominio/categoriausuarios/modelo/categoriausuarios';

import { CategoriaUsuariosEntidad } from 'src/infraestructura/categoriausuarios/entidad/categoriausuarios.entidad';

export abstract class RepositorioCategoriaUsuarios {

     /**
      * Reglas negocio
      */
     abstract validarCategorias( categoriasUsuariosId: CategoriaUsuariosEntidad[] ): Promise<[ CategoriaUsuariosEntidad[], number]>;
     abstract existeCategoriaUsuarios( categoriasUsuarioId: number): Promise<boolean>;
     abstract obtenerUnaCategoriaUsuarios( categoriasUsuarioId: number): Promise<CategoriaUsuariosEntidad>;
     
     /**
      * Operaciones transaccionales
      */
     abstract guardar( categoriaUsuarios: CategoriaUsuarios ): Promise<CategoriaUsuariosEntidad>;
     abstract borrar( categoriaId : number ): Promise<void>;
}
