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

  it('Debería fallar al intentar enviar sin los campos obligatorios', () => {
    cy.get('.cotizacion__form button[type="submit"]')
    .click();

    cy.get('.cotizacion__form span')
    .should('have.length', 1 )
    .and('have.text', 'El campo ID debe ser positivo');
  });  

  it('Debería campo ID no debería permitir ingresar números negativos o letras', () => {

    cy.get('.cotizacion__form input[name="id"]')
    .type('-5')
    .should('have.text', '' );

    cy.get('.cotizacion__form input[name="id"]')
    .type('Número')
    .should('have.text', '' );

    cy.get('.cotizacion__form input[name="id"]')
    .type('e')
    .should('have.text', '' );
  });  

  it('Debería campo ID debería mostrar el detalle de la cotización si existe.', () => {

    cy.get('.cotizacion__form input[name="id"]')
    .type('1')
    .should('have.text', '' );
  });  
});