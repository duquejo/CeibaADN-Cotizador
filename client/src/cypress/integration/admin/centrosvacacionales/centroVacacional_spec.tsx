/// <reference types="cypress" />
export {};

describe('Pruebas e2e sobre el administrador de la plataforma de los centros vacacionales', () => {

  beforeEach(() => {
    cy.visit('/administrador');
  });

  it('Debería estar la sección de gestión de categorías de usuarios renderizada', () => {
    cy.get('h1').should('have.text', 'Administrador');
    cy.url().should('include', '/administrador');
    cy.contains('Gestión de centros vacacionales');
    cy.contains('Acciones de los centros vacacionales');
    cy.get('.cv__form input[name="title"]').should('have.length', 1 );
    cy.get('.cv__form textarea[name="description"]').should('have.length', 1 );
    cy.get('.cv__form .calendarios__container').should('have.length', 1 );
    cy.get('.cv__form .categorias__container').should('have.length', 1 );
    cy.get('.cv__form select[name="calendarioActivo"]').should('have.length', 1 );
  });

  it('Debería permitir interactuar con los campos básicos del formulario de Creación de Centros Vacacionales', () => {
    
    cy.get('.cv__form input[name="title"]')
    .type('Centro vacacional de prueba')
    .clear()
    .type('Otro centro vacacional de prueba')
    .should('have.value', 'Otro centro vacacional de prueba');

    cy.get('.cv__form textarea[name="description"]')
    .type('Texto de prueba')
    .clear()
    .type('Descripción del centro vacacional')
    .should('have.value', 'Descripción del centro vacacional');
  });

  it('Debería permitir interactuar con valores del selector de calendarios festivos/alta', () => {
    
    // Selección Calendarios
    cy.get('.calendarios__container .dropdown-container').as('calendarios');

    cy.get('@calendarios')
    .trigger('click');

    cy.get('@calendarios')
    .find('.dropdown-content')
    .should('be.visible');

    cy.get('@calendarios')
    .find('.dropdown-content .select-panel li')
    .contains('Un texto de prueba')
    .then( option => {

      option.trigger('click');

      cy.get('.cv__form select[name="calendarioActivo"]')
      .select(0)
      .should('contain.text', 'Seleccionar el primero según selección de temporadas altas');          
    });
  });

  it('Debería fallar al intentar enviar sin los campos obligatorios', () => {
    cy.get('.cv__form button[type="submit"]')
    .click();
    cy.get('.cv__form span:not(.gray)')
    .should('have.length', 1 );
  });  

  it('Debería permitir crear un centro vacacional', () => {

    const tituloCV = `Centro Vacacional de prueba ${ Date.now() }`;

    cy.get('.cv__form input[name="title"]')
    .type( tituloCV );

    cy.get('.cv__form textarea[name="description"]')
    .type('Descripción de prueba');

    // Selección Calendarios
    cy.get('.calendarios__container .dropdown-container').as('calendarios');

    cy.get('@calendarios')
    .trigger('click');

    cy.get('@calendarios')
    .find('.dropdown-content')
    .should('be.visible');

    /* eslint-disable cypress/no-unnecessary-waiting */
    cy.get('@calendarios')
    .find('.dropdown-content .select-item[tabindex="2"]').as('calendarioSel')
    .wait(1000)
    .get('@calendarioSel')
    .then( option => {
      option.trigger('click');
      cy.get('.cv__form select[name="calendarioActivo"]')
      .select(0)
      .should('contain.text', 'Seleccionar el primero según selección de temporadas altas');          
    });
    /* eslint-enable cypress/no-unnecessary-waiting */

    // Selección Categorías
    cy.get('.categorias__container .dropdown-container').as('categorias');

    cy.get('@categorias')
    .trigger('click');

    cy.get('@categorias')
    .find('.dropdown-content')
    .should('be.visible');

    /* eslint-disable cypress/no-unnecessary-waiting */
    cy.get('@categorias')
    .find('.dropdown-content .select-item[tabindex="2"]').as('categoriaSel')
    .wait(1000)
    .get('@categoriaSel')
    .then( option => {
      option.trigger('click');        
    });
    /* eslint-enable cypress/no-unnecessary-waiting */

    cy.get('.cv__form button[type="submit"]')
    .click('bottom',{force: true});

    // Swal modal confirmation
    cy.get('.swal2-container')
    .should('contain.text', 'Éxito' )
    .get('button.swal2-confirm')
    .click('bottom');
    
    cy.get('table.cv .cv__body')
    .should( 'contain.text', tituloCV );

    cy.log('El formulario debería estar limpio al terminar');

    cy.get('.cv__form input[name="title"]')
    .should('be.empty');
    
    cy.get('.cv__form textarea[name="description"]')
    .should('be.empty');
  });

  it('Debería poder editar un centro vacacional disponible', () => {
    cy.get('table.cv .cv__details')
    .should('have.length.gt', 0 )
    .first()
    .then( ( $element ) => {

      const elementoPrevio = $element.find('td').first().text();
      
      $element.find('span')
      .first()
      .trigger('click');

      cy.get('.ReactModal__Content h2')
      .should('contain.html', `<i>"${ elementoPrevio }"</i>` );
    
      cy.get('.ReactModal__Content input[name="title"]')
      .clear()
      .type('Editando mi centro vacacional personalizado')
      .should('have.value', 'Editando mi centro vacacional personalizado');
    
      cy.get('.ReactModal__Content input[name="description"]')
      .clear()
      .type('Editando el centro vacacional personalizado')
      .should('have.value', 'Editando el centro vacacional personalizado');

      cy.get('.ReactModal__Content button[type="submit"]')
      .click('bottom', {force: true});

      // Swal modal confirmation
      cy.get('.swal2-container')
      .should('contain.text', 'Éxito' )
      .get('button.swal2-confirm')
      .click('bottom');
      
      cy.get('table.cv .cv__details')
      .first()
      .find('td')
      .first()
      .should('have.text', 'Editando mi centro vacacional personalizado' );
    });
  });

  it('Debería poder borrar un centro vacacional si hay disponibles', () => {
    cy.get('table.cv .cv__details')
    .should('have.length.gt', 0 )
    .first()
    .find('span')
    .last()
    .click()
    .then( () => {

      cy.get('.swal2-container')
      .should('contain.text', '¿Estás seguro?')
      .get('button.swal2-confirm')
      .click();

      cy.get('.swal2-container')
      .should('contain.text', 'Éxito')
      .get('button.swal2-confirm')
      .click();
    });
  });

});