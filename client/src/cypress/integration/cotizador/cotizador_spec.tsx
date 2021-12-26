/// <reference types="cypress" />
export {};

describe('Pruebas e2e sobre el generador de cotizaciones', () => {

  beforeEach(() => {
    cy.visit('/cotizador');
  });

  it('Debería estar la sección de Generación de cotizaciones', () => {
    cy.get('h1').should('have.text', 'Generación de cotizaciones');
    cy.url().should('include', '/cotizador');
    cy.contains('Generación de cotizaciones');
  });

  it('Debería fallar al intentar enviar sin los campos obligatorios', () => {
    cy.get('.cotizador__form button[type="submit"]')
    .click();
    cy.get('.cotizador__form span:not(.DayPicker-NavButton)')
    .should('have.length', 4 );
  });  
  
  it('Debería estar vacío el selector de rango salarial si no ha seleccionado ningún centro vacacional', () => {    
    cy.get('.cotizador__form')
    .find('select[name="categoriaUsuarios"] option')
    .should('have.length', 1 )
    .and('contain.text', 'Seleccione primero un centro vacacional');
  });


  it('Debería permitir interactuar con los campos del formulario de generación de cotizaciones', () => {
    
    cy.get('.cotizador__form input[name="personas"]')
    .clear()
    .type('5')
    .should('have.value', '5')
    .clear()
    .type('10')
    .should('have.value', '10')
    .clear()
    .type('15')
    .should('have.value', '15');

    cy.get('.swiperContainer')
    .find('.swiper-slide')
    .first()
    .click();

    cy.get('.cotizador__form button[type="submit"]')
    .should( 'contain.text', 'Generar cotización');
  });

  it('Debería permitir interactuar con dos elementos únicos de los calendarios', () => {

    cy.get('.cotizador__form .DayPicker .DayPicker-Month:nth-child(2) .DayPicker-Day:not(.DayPicker-Day--outside)').as('calendarioMes2');

    cy.get('@calendarioMes2')
    .eq(5)
    .click('bottom');

    cy.get('@calendarioMes2')
    .eq(10)
    .click('bottom');
  });
  
  it('Debería poblarse el selector de rangos de salario si se ha seleccionado un centro vacacional', () => {

    cy.get('.swiperContainer')
    .find('.swiper-slide')
    .first()
    .click();
      
    cy.get('.cotizador__form')
    .find('select[name="categoriaUsuarios"] option')
    .should('have.length.gt', 1 );
  });

  it('Debería permitir generar una cotización', () => {

    cy.get('.swiperContainer')
    .find('.swiper-slide')
    .first()
    .click();

    cy.get('.cotizador__form input[name="personas"]')
    .clear()
    .type('3');

    cy.get('.cotizador__form')
    .find('select[name="categoriaUsuarios"]')
    .select(1);

    cy.get('.cotizador__form .DayPicker .DayPicker-Month:nth-child(2) .DayPicker-Day:not(.DayPicker-Day--outside)').as('calendarioMes2');

    cy.get('@calendarioMes2')
    .eq(6)
    .click('bottom');

    cy.get('@calendarioMes2')
    .eq(11)
    .click('bottom');

    cy.get('.cotizador__form button[type="submit"]')
    .click('bottom');

    // Swal modal confirmation
    cy.get('.swal2-container')
    .should('contain.text', '¡La cotización fue realizada con éxito!' )
    .get('button.swal2-confirm')
    .click('bottom');
  });
});