# ADN Ceiba Project - Cotizador de centros vacacionales (Frontend)

Hash de git relacionado: f70d8f99

<p align="center">
  <a href="https://reactjs.org/" target="blank"><img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" width="320" alt="React Logo" /></a>
</p>

## Caracteristicas

Las características principales de este bloque son:

### Uso del CLI create-react-app

- Construido con Typescript
- Soporte para enrutamiento con react-router.
- Soporte de redux, para almacenar el estado de la aplicación.
- Uso de Styled-components para maquetado de estilos encapsulados de componentes.
- Uso de Formik para la construcción de formularios reactivos.
- Soporte para peticiones Http con axios. Existe una instancia de axios que esta - configurada con información que es transversal a todas las peticiones. Cada que se - necesite acceder a una Api se recomienda usar esta instancia que se encuentra en src/core/config/AxiosConfig.ts
- Uso de variables por ambiente; existén dos archivos .env.development (variables en ambiente desarrollo) y .env.production (variables para producción, reemplazadas - cuando se ejecuta la tarea npm run build). Adicionalmente puede crear más archivos de variables como está descrito en el link.
- Soporte de pruebas unitarias con enzyme.
- Estructura del proyecto
- Se utiliza la guía de estilos de <a href="https://medium.com/@amcdnl/react-for-the-angular-dev-be21a39a382">Angular adaptada para react</a>.

## Estructura de carpetas del bloque

Para instalar este bloque se deben ejecutar los siguientes comandos:

- `npm install` para descargar las dependencias
- `npm start` inicia la aplicación en modo desarrollo, puede abrir el navegador en la siguiente url http://localhost:3000
- `npm test` para ejecutar las pruebas
- `npm run build` para generar el artefacto distribuible para producción
- `npm run cypress:run` para realizar las pruebas End to End (e2e) con Cypress CLI.
- `npm run cypress:open` para realizar las pruebas End to End (e2e) con Cypress Browser.
