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
    .clear()
    .type('-5')
    .should('have.text', '' );

    cy.get('.cotizacion__form input[name="id"]')
    .clear()    
    .type('Número')
    .should('have.text', '' );

    cy.get('.cotizacion__form input[name="id"]')
    .clear()    
    .type('e')
    .should('have.text', '' );
  });  


  it('Debería mostrar un aviso de no encontrado si no se encuentra la factura', () => {

    const busquedaMal = '10000';

    cy.get('.cotizacion__form input[name="id"]')
    .clear()
    .type( busquedaMal );

    cy.get('.cotizacion__form button[type="submit"]')
    .click('bottom');    

    // Swal modal confirmation
    cy.get('.swal2-container')
    .should('contain.text', `No se encontró alguna cotización con el identificador #${ busquedaMal }` )
    .get('button.swal2-confirm')
    .click('bottom');

  });    

  it('Debería mostrar los detalles de la cotización si existen.', () => {

    cy.get('.cotizacion__form input[name="id"]')
    .clear()    
    .type('1')

    cy.get('.cotizacion__form button[type="submit"]')
    .click('bottom');

    // Swal modal confirmation
    cy.get('.swal2-container')
    .should('contain.text', 'Información de la cotización' )
    .get('button.swal2-confirm')
    .click('bottom');

  });  
});