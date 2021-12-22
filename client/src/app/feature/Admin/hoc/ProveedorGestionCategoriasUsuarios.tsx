import {
  guardarNuevaCategoriaUsuariosAsync,
  listarCategoriasUsuariosAsync
} from '../../../core/redux/acciones/categoriasusuarios/CategoriasUsuariosAcciones';

import { EstadoGeneral } from '../../../core/redux/modelo/EstadoGeneral';
import { GestionCategoriasUsuarios } from '../containers/GestionCategoriasUsuarios/index';
import { connect } from 'react-redux';

const mapStateToProps = ( state: EstadoGeneral ) => {
  return state.categoriasUsuarios;
};

export const ProveedorGestionCategoriasUsuarios = connect( mapStateToProps, {
  listarCategoriasUsuarios: listarCategoriasUsuariosAsync,
  agregarNuevaCategoriaUsuarios: guardarNuevaCategoriaUsuariosAsync
})( GestionCategoriasUsuarios );
