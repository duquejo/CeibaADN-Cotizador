/// <reference types="cypress" />
export {};

describe('Pruebas e2e sobre el administrador de la plataforma de las cotizaciones', () => {

  beforeEach(() => {
    cy.visit('/administrador');
  });

  it('Debería estar la sección de consulta de cotizaciones renderizada', () => {
    cy.get('h1').should('have.text', 'Administrador');
    cy.url().should('include', '/administrador');
    cy.contains('Búsqueda de cotizaciones por Identificador');
  });
});