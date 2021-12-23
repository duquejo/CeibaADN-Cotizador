import * as PropTypes from 'prop-types';
import * as React from 'react';
import { CategoriaUsuarios } from '../../../models/CategoriaUsuarios';
import { Small } from '../../../../../shared/components/Small/index';
import { Table } from './styles';

export interface AccionesCategoriasProps {
  categorias: Array<CategoriaUsuarios>;
}

export const AccionesCategorias: React.FC<AccionesCategoriasProps> = ({ categorias }) => {
  return (
    <>
      <h3>Listado de categorías de usuarios</h3>
      {
        categorias && categorias.length ?
          <Table className="category">
            <thead className="category__header">
              <tr>
                <th>
                  <b>Título</b>
                </th>
                <th>
                  <b>Descripción</b>
                </th>
                <th>
                  <b>Valor alta</b>
                </th>
                <th>
                  <b>Valor baja</b>
                </th>
              </tr>
            </thead>
            <tbody className="calendar__body">
            {
              categorias.map( ( categoria: CategoriaUsuarios ) => {
                return (
                  <tr className="calendar__details" key={ categoria.id }>
                    <td>{ categoria.nombre }</td>
                    <td><Small>{ categoria.descripcion ? categoria.descripcion : 'Sin descripción' }</Small></td>
                    <td>$ { categoria.valorAlta ? categoria.valorAlta : 0 }</td>
                    <td>$ { categoria.valorBaja ? categoria.valorBaja : 0 }</td>
                  </tr>
                );
              })
            }
            </tbody>
          </Table>
        : <p>No hay categorías de usuarios disponibles actualmente. <i>Prueba creando una.</i></p>
      }
    </>
  );
};

AccionesCategorias.propTypes = {
  categorias: PropTypes.array.isRequired
};
