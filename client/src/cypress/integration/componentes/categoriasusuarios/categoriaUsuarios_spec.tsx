/// <reference types="cypress" />
export {};

describe('Pruebas e2e sobre el administrador de la plataforma de las categorías', () => {

  beforeEach(() => {
    cy.visit('/administrador');
  });

  it('Debería estar la sección de gestión de categorías de usuarios renderizada', () => {
    cy.get('h1').should('have.text', 'Administrador');
    cy.url().should('include', '/administrador');
    cy.contains('Gestión de categorías de usuarios');
    cy.contains('Listado de categorías de usuarios');
    cy.get('.category__form input[name="title"]').should('have.length', 1 );
    cy.get('.category__form textarea[name="description"]').should('have.length', 1 );
    cy.get('.category__form input[name="priceHigh"]').should('have.length', 1 );
    cy.get('.category__form input[name="priceLow"]').should('have.length', 1 );
  });

  it('Debería permitir interactuar con los campos del formulario de Gestión de calendarios', () => {
    
    cy.get('.category__form input[name="title"]')
    .clear()
    .type('Una categoría de prueba')
    .should('have.value', 'Una categoría de prueba');

    cy.get('.category__form input[name="title"]')
    .clear()
    .type('Otra categoría de prueba')
    .should('have.value', 'Otra categoría de prueba');

    cy.get('.category__form textarea[name="description"]')
    .clear()
    .type('Descripción de la categoría de prueba')
    .should('have.value', 'Descripción de la categoría de prueba');

    cy.get('.category__form input[name="priceHigh"]')
    .clear()
    .type('85000')
    .should('have.value', '85000');

    cy.get('.category__form input[name="priceLow"]')
    .clear()
    .type('67000')
    .should('have.value', '67000');

    cy.get('.category__form button[type="submit"]')
    .should( 'contain.text', 'Crear categoría de usuarios');
  });

  it('Debería fallar al intentar enviar sin los campos obligatorios', () => {
    cy.get('.category__form button[type="submit"]')
    .click();

    cy.get('.category__form span')
    .should('have.length', 3 );
  });  

  it('Debería no permitir ingresar números en los valores de precios', () => {


    cy.get('.category__form input[name="title"]')
    .clear()
    .type('Esto debería fallar')
    .should('have.value', 'Esto debería fallar');

    cy.get('.category__form input[name="priceHigh"]')
    .clear()
    .type('Un número')
    .should('have.value', '');

    cy.get('.category__form input[name="priceLow"]')
    .clear()
    .type('Otro número')
    .should('have.value', '');

    cy.get('.category__form button[type="submit"]')
    .click();

    cy.get('.category__form span')
    .should('have.length', 2 );
  });  


  it('Debería permitir crear un calendario', () => {

    const tituloCategoria = `Categoría de prueba ${ Date.now() }`;

    cy.get('.category__form input[name="title"]')
    .type( tituloCategoria );

    cy.get('.category__form textarea[name="description"]')
    .type('Descripción de prueba');

    cy.get('.category__form input[name="priceHigh"]')
    .type('85000');

    cy.get('.category__form input[name="priceLow"]')
    .type('75200');

    cy.get('.category__form button[type="submit"]')
    .click('bottom');

    // Swal modal confirmation
    cy.wait(1000)
    .get('.swal2-container')
    .should('contain.text', 'Éxito' )
    .wait(500)
    .get('button.swal2-confirm')
    .click('bottom');
    
    cy.get('table.category .category__body')
    .should( 'contain', tituloCategoria );

    cy.log('El formulario debería estar limpio al terminar');

    cy.get('.category__form input[name="title"]')
    .should('be.empty');
    
    cy.get('.category__form textarea[name="description"]')
    .should('be.empty');

    cy.get('.category__form input[name="priceHigh"]')
    .should('be.empty');

    cy.get('.category__form input[name="priceLow"]')
    .should('be.empty'); 
  });
});