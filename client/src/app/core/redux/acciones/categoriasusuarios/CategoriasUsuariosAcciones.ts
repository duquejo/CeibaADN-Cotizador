import Swal from 'sweetalert2';

import { CategoriaUsuarios } from '../../../../feature/Admin/models/CategoriaUsuarios';
import { TiposAccionesCategoriaUsuarios, TiposAcciones } from '../categoriasusuarios/CategoriasUsuariosTiposAcciones';
import { CategoriaUsuariosRepositorio } from '../../../api/categoriasusuarios.repositorio';

export function listarCategoriasUsuarios( categoriasUsuarios: Array<CategoriaUsuarios> ): TiposAccionesCategoriaUsuarios {
  return {
    type: TiposAcciones.LISTAR_CATEGORIA_USUARIOS,
    payload: categoriasUsuarios
  };
}

export function agregarNuevaCategoriaUsuarios( categoriaUsuarios: CategoriaUsuarios ): TiposAccionesCategoriaUsuarios {
  return {
    type: TiposAcciones.AGREGAR_CATEGORIA_USUARIOS,
    payload: categoriaUsuarios
  };
}

export const guardarNuevaCategoriaUsuariosAsync = ( nuevaCategoriaUsuarios: CategoriaUsuarios ) => {
  return async ( dispatch: any ) => {
    try {
      const { data, status } = await CategoriaUsuariosRepositorio.guardar( nuevaCategoriaUsuarios );
      if( status === 201 ) {
        dispatch( agregarNuevaCategoriaUsuarios( data ) );
        Swal.fire( 'Éxito', `La categoría de usuarios <u>${ data.nombre}</u> ha sido añadida!`, 'success' );
      }
    } catch (error) {
      console.error( error );
      Swal.fire( 'Error', `Algo ha sucedido, recarga la vista e intenta de nuevo.`, 'error' );
    }
  };
};


export const listarCategoriasUsuariosAsync = () => {
  return async ( dispatch: any ) => {
    try {
      const { data: categoriasUsuarios } = await CategoriaUsuariosRepositorio.obtener();
      dispatch( listarCategoriasUsuarios( categoriasUsuarios ) );
    } catch (error) {
      console.error( error );
      Swal.fire( 'Error', `No se han listado las categorías de usuarios, comprueba tu conexión a internet e intenta nuevamente`, 'error' );
    }
  };
};
