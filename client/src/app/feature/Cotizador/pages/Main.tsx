import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Layout } from 'app/shared/components/Layout';
import { ProveedorGestionCotizaciones } from '../hoc/ProveedorGestionCotizaciones';

const AdminMainPage: React.FC<RouteComponentProps> = () => {
  return (
    
    <Layout title="Cotizador" description="Generación de cotizaciones">

      {/* Proveedor Redux Gestión de Cotizaciones */}
      <ProveedorGestionCotizaciones />

    </Layout>
  );
};

AdminMainPage.displayName = 'AdminMainPage';

export default AdminMainPage;
