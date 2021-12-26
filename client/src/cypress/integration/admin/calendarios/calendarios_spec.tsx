/// <reference types="cypress" />

import { getRandomInt } from 'cypress/fixtures/miscFixtures';
export {};

describe('Pruebas e2e sobre el administrador de la plataforma de los calendarios', () => {

  beforeEach(() => {
    cy.visit('/administrador');
  });

  it('Debería estar la sección de gestión de calendarios renderizada', () => {
    cy.get('h1').should('have.text', 'Administrador');
    cy.url().should('include', '/administrador');
    cy.contains('Gestión de calendarios');
    cy.contains('Acciones de los calendarios');
    cy.get('.calendar__form input[name="title"]').should('have.length', 1 );
    cy.get('.calendar__form textarea[name="description"]').should('have.length', 1 );
    cy.get('.calendar__form .DayPicker').should('have.length', 1 );
  });

  it('Debería permitir interactuar con los campos del formulario de Gestión de calendarios', () => {
    
    cy.get('.calendar__form input[name="title"]')
    .clear()
    .type('Mi calendario de prueba')
    .should('have.value', 'Mi calendario de prueba');

    cy.get('.calendar__form input[name="title"]')
    .clear()
    .type('Otro calendario de prueba')
    .should('have.value', 'Otro calendario de prueba');

    cy.get('.calendar__form textarea[name="description"]')
    .clear()
    .type('Descripción de mi calendario de prueba')
    .should('have.value', 'Descripción de mi calendario de prueba');

    cy.get('.calendar__form textarea[name="description"]')
    .clear()
    .type('Lorem, ipsum dolor sit amet consectetur adipisicing')
    .should('have.value', 'Lorem, ipsum dolor sit amet consectetur adipisicing');

    cy.get('.calendar__form button[type="submit"]')
    .should( 'contain.text', 'Crear calendario');
  });

  it('Debería permitir interactuar con seis elementos únicos del calendario', () => {

    const selector = '.calendar__form .DayPicker .DayPicker-Month:nth-child(2) .DayPicker-Day:not(.DayPicker-Day--outside)';
    cy.get(selector)
    .then( ( days ) => {
      const numbers: number[] = [];
      for (let i = 0; i < 6; i++) {
        const randomNumber = getRandomInt(0, days.length-1);
        if( numbers.includes( randomNumber ) ) {
          i--;
          continue;
        }
        numbers.push( randomNumber );
        cy.get(selector).eq(randomNumber).click();
      }
      cy.get('.DayPicker .DayPicker-Day--selected:not(.DayPicker-Day--outside)')
      .should('have.length', 6 );
    });
  });    

  it('Debería fallar al intentar enviar sin los campos obligatorios', () => {
    cy.get('.calendar__form button[type="submit"]')
    .click();
    cy.get('.calendar__form span:not(.DayPicker-NavButton)')
    .should('have.length', 1 );
  });

  it('Debería permitir crear un calendario', () => {

    const tituloCalendario = `Calendario de prueba ${ Date.now() }`;

    cy.get('.calendar__form input[name="title"]')
    .type( tituloCalendario );

    cy.get('.calendar__form textarea[name="description"]')
    .type('Descripción de prueba');

    cy.get('.calendar__form .DayPicker .DayPicker-Month:nth-child(2) .DayPicker-Day:not(.DayPicker-Day--outside)')
    .eq(5).click('bottom');

    cy.get('.calendar__form .DayPicker .DayPicker-Month:nth-child(3) .DayPicker-Day:not(.DayPicker-Day--outside)')
    .eq(10).click('bottom');

    cy.get('.calendar__form button[type="submit"]')
    .click('bottom');

    // Swal modal confirmation
    cy.get('.swal2-container')
    .should('contain.text', 'Éxito' )
    .get('button.swal2-confirm')
    .click('bottom');   

    cy.get('table.calendar .calendar__body')
    .should( 'contain', tituloCalendario );    
    
    cy.log('El formulario debería estar limpio al terminar');

    cy.get('.calendar__form input[name="title"]')
    .should('be.empty');
    
    cy.get('.calendar__form textarea[name="description"]')
    .should('be.empty');    
  });

  it('Debería poder borrar un calendario si hay disponibles', () => {
    cy.get('table.calendar .calendar__details')
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

  it('Debería poder editar un calendario disponible', () => {
    cy.get('table.calendar .calendar__details')
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
      .type('Editando mi calendario personalizado')
      .should('have.value', 'Editando mi calendario personalizado');
    
      cy.get('.ReactModal__Content textarea[name="description"]')
      .clear()
      .type('Editando el calendario personalizado')
      .should('have.value', 'Editando el calendario personalizado');

      cy.get('.ReactModal__Content .DayPicker .DayPicker-Day--selected:not(.DayPicker-Day--outside)')
      .click({ multiple: true });

      cy.get('.ReactModal__Content button[type="submit"]')
      .click('bottom');

      // Swal modal confirmation
      cy.get('.swal2-container')
      .should('contain.text', 'Éxito' )
      .get('button.swal2-confirm')
      .click('bottom');
      
      cy.get('table.calendar .calendar__details')
      .first()
      .find('td')
      .first()
      .should('have.text', 'Editando mi calendario personalizado' );
    });
  });

  it('Debería no permitir al editar guardar un calendario sin título', () => {
    cy.get('table.calendar .calendar__details')
    .should('have.length.gt', 0 )
    .first()
    .find('span')
    .first()
    .click();
    
    cy.get('.ReactModal__Content input[name="title"]')
    .clear()
    .should('have.value', '');

    cy.get('.ReactModal__Content button[type="submit"]')
    .click('bottom');

    cy.get('.ReactModal__Content span:not(.DayPicker-NavButton)')
    .should('have.length', 1 );    

    cy.get('.ReactModal__Content input[name="title"]')
    .type('Un texto de prueba')
    .should('have.value', 'Un texto de prueba');

    cy.get('.ReactModal__Content button[type="submit"]')
    .click('bottom');    
  });   
});