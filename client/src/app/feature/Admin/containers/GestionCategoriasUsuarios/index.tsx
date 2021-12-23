import * as PropTypes from 'prop-types';
import * as React from 'react';
import { DivContainer, DivRow } from '../styles';
import { AccionesCategorias } from '../../components/categoriausuarios/AccionesCategorias/index';
import { CategoriaUsuarios } from '../../models/CategoriaUsuarios';
import { CrearCategoria } from '../../components/categoriausuarios/CrearCategoria/index';
import { Separation } from '../../../../shared/components/Separation/index';
import { useEffect } from 'react';

interface GestionCategoriasUsuariosProps {
  categoriasUsuarios: Array<CategoriaUsuarios>;
  listarCategoriasUsuarios: () => void;
  agregarNuevaCategoriaUsuarios: ( categoriaUsuarios: CategoriaUsuarios ) => void;
}

export const GestionCategoriasUsuarios: React.FC<GestionCategoriasUsuariosProps> = ({
  categoriasUsuarios,
  listarCategoriasUsuarios,
  agregarNuevaCategoriaUsuarios
}) => {
  
  /**
   * Efecto estado inicial
   */
   useEffect( () => {
    listarCategoriasUsuarios();
  }, [ listarCategoriasUsuarios ] );

  return (
    <>
      <h2>Gestión de categorías de usuarios <span role="img" title="Categorías de usuarios" aria-label="Categorías de usuarios">👤</span></h2>
      <p>Gestione las categorías de usuarios que podrá asignar a los Centros Vacacionales, estas categorías tienen influencia sobre el valor de 
        la cotización que un usuario obtendrá.</p>   
      <DivContainer>
        <DivRow>
        <CrearCategoria onSubmit={ agregarNuevaCategoriaUsuarios } />
        </DivRow>
        <DivRow>
          <AccionesCategorias categorias={ categoriasUsuarios } />
        </DivRow>
      </DivContainer>
      <Separation />
    </>
  );
};

GestionCategoriasUsuarios.propTypes = {
  categoriasUsuarios: PropTypes.array.isRequired
};
