import { CategoriaUsuarios } from 'app/feature/Admin/models/CategoriaUsuarios';

export enum TiposAcciones {
  LISTAR_CATEGORIA_USUARIOS = 'LISTAR_CATEGORIA_USUARIOS',
  AGREGAR_CATEGORIA_USUARIOS = 'AGREGAR_CATEGORIA_USUARIOS',
}

interface AccionListarCategoriasUsuarios {
  type: typeof TiposAcciones.LISTAR_CATEGORIA_USUARIOS;
  payload: CategoriaUsuarios[];
}

interface AccionAgregarCategoriaUsuarios {
  type: typeof TiposAcciones.AGREGAR_CATEGORIA_USUARIOS;
  payload: CategoriaUsuarios;
}

export type TiposAccionesCategoriaUsuarios = 
  | AccionListarCategoriasUsuarios 
  | AccionAgregarCategoriaUsuarios;
