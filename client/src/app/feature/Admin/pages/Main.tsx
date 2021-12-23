import * as React from 'react';
import { GestionCotizaciones } from '../containers/GestionCotizaciones/index';
import { Layout } from 'app/shared/components/Layout';
import { ProveedorGestionCalendarios } from '../hoc/ProveedorGestionCalendarios';
import { ProveedorGestionCategoriasUsuarios } from '../hoc/ProveedorGestionCategoriasUsuarios';
import { ProveedorGestionCentrosVacacionales } from '../hoc/ProveedorGestionCentrosVacacionales';
import { RouteComponentProps } from 'react-router-dom';
import { Separation } from '../../../shared/components/Separation/index';

const AdminMainPage: React.FC<RouteComponentProps> = () => {
  return (
    <>
      <h1>Administrador</h1>
      <Layout title="Administrador" description="Administración">
        <p>En la siguiente interfaz podrá tomar acciones relacionadas con la gestión de <b>Calendarios de temporadas altas</b>, 
        <b>Categorías de usuarios</b> y <b>Centros Vacacionales</b>. <br/>Los calendarios personalizados gestionados en el módulo de <b>Gestión de calendarios</b> tienen un 
        impacto sobre el cálculo de la cotización final según el <b>Centro Vacacional</b> que lo tenga asignado, así como la <b>Categoría de usuarios</b> relacionada, que
        le permite realizar a un usuario diferentes cotizaciones según su rango salarial.</p>
        <Separation />

        {/* Proveedor Redux Gestión de Calendarios */}
        <ProveedorGestionCalendarios />
        
        {/* Proveedor Redux Gestión de Categorías de usuarios */}
        <ProveedorGestionCategoriasUsuarios />

        {/* Proveedor Redux Gestión de Centros vacacionales */}
        <ProveedorGestionCentrosVacacionales />

        {/* Gestión de Cotizaciones */}
        <GestionCotizaciones />

      </Layout>
    </>
  );
};

AdminMainPage.displayName = 'AdminMainPage';

export default AdminMainPage;
