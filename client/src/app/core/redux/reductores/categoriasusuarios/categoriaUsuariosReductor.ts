
import { TiposAcciones, TiposAccionesCategoriaUsuarios } from '../../acciones/categoriasusuarios/CategoriasUsuariosTiposAcciones';

import { CategoriaUsuarios } from '../../../../feature/Admin/models/CategoriaUsuarios';
import { EstadoCategoriaUsuarios } from '../../modelo/EstadoCategoriaUsuarios';

const initialState: EstadoCategoriaUsuarios = {
  categoriasUsuarios: Array<CategoriaUsuarios>()
};

export default function ( state = initialState, action: TiposAccionesCategoriaUsuarios ): EstadoCategoriaUsuarios {
  switch ( action.type ) {

    case TiposAcciones.LISTAR_CATEGORIA_USUARIOS: {
      return {
        ...state,
        categoriasUsuarios: [ ...action.payload ]
      };
    }

    case TiposAcciones.AGREGAR_CATEGORIA_USUARIOS: {
      return {
        ...state,
        categoriasUsuarios: [...state.categoriasUsuarios, {
          id: action.payload.id,
          nombre: action.payload.nombre,
          descripcion: action.payload.descripcion,
          valorAlta: action.payload.valorAlta,
          valorBaja: action.payload.valorBaja
         } ],
      };
    }

    default:
      return state;
  }
}
