import * as React from 'react';
import { Layout } from './shared/components/Layout';

const MainPage = () => (
  <Layout title="Inicio" description="Página inicial">

    <h1>Inicio</h1>
    <hr/>

    <h2>Características</h2>
    <p>Las características principales de este bloque son:</p>

    <div>
      <ol>
        <li>Uso del CLI <a target="_blank" rel="noopener noreferrer" href="https://github.com/facebook/create-react-app">create-react-app.</a></li>
        <li>Construido con <a target="_blank" rel="noopener noreferrer" href="https://www.typescriptlang.org/docs/handbook/react.html">Typescript.</a></li>
        <li>Soporte para enrutamiento con <a target="_blank" rel="noopener noreferrer" href="https://reacttraining.com/react-router/web/guides/quick-start">react-router</a>. </li>
        <li>Soporte de <a target="_blank" rel="noopener noreferrer" href="https://react-redux.js.org/introduction/quick-start">redux</a>, para almacenar el estado de la aplicación.</li>
        <li>Uso de <a target="_blank" rel="noopener noreferrer" href="https://styled-components.com/docs">Styled-components</a> para maquetado de estilos encapsulados de componentes.</li>
        <li>Uso de <a target="_blank" rel="noopener noreferrer" href="https://jaredpalmer.com/formik">Formik</a> para la construcción de formularios reactivos.</li>
        <li>Soporte para peticiones Http con <a target="_blank" rel="noopener noreferrer" href="https://github.com/axios/axios">axios</a>. 
        Existe una instancia de axios que esta configurada con información que es transversal a todas las peticiones. Cada que se necesite acceder a una Api se recomienda usar 
        esta instancia que se encuentra en <strong>src/core/config/AxiosConfig.ts</strong></li>
        <li>Uso de  <a target="_blank" rel="noopener noreferrer" href="https://create-react-app.dev/docs/adding-custom-environment-variables/">variables por ambiente</a>; 
        existén dos archivos .env.development (variables en ambiente desarrollo) y .env.production (variables para producción, reemplazadas cuando se ejecuta la tarea 
        <strong>npm run build</strong>). Adicionalmente puede crear más archivos de variables como está descrito en el link. </li>
        <li>Soporte de pruebas unitarias con <a target="_blank" rel="noopener noreferrer" href="https://enzymejs.github.io/enzyme/">enzyme</a>.</li>
      </ol>
    </div>

    <h2>Estructura del proyecto</h2>
    <ol>
      <li>Se utiliza la guía de estilos de <a href="https://angular.io/guide/styleguide">Angular</a> adaptada para 
      <a href="https://medium.com/@amcdnl/react-for-the-angular-dev-be21a39a382">react.</a></li>
    </ol>

    <h2>Ejecución del proyecto</h2>
    <p>Para instalar este bloque se deben ejecutar los siguientes comandos:</p>

    <div>
      <ol>
        <li><code>npm install</code> para descargar las dependencias</li>
        <li><code>npm start</code> inicia la aplicación en modo desarrollo, puede abrir el navegador en la siguiente url 
        <a href="http://localhost:3000">http://localhost:3000</a></li>
        <li><code>npm test</code> para ejecutar las pruebas</li>
        <li><code>npm run build</code> para generar el artefacto distribuible para producción </li>
      </ol>
    </div>
  </Layout>
);

export default MainPage;
