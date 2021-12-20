
import { TiposAcciones, TiposAccionesCategoriaUsuarios } from '../../acciones/categoriasusuarios/CategoriasUsuariosTiposAcciones';

import { CategoriaUsuarios } from '../../../../feature/Admin/models/CategoriaUsuarios';

const initialState: any = {
  categoriasUsuarios: Array<CategoriaUsuarios>(),
  categoriaUsuarios: null
};

export default function ( state = initialState, action: TiposAccionesCategoriaUsuarios ): any {
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
