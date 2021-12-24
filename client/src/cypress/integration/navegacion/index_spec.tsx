/// <reference types="cypress" />
export {};

describe('Pruebas generales de navegación', () => {

    it('Deberían existir cuatro enlaces en la barra superior', () => {
        cy.visit('/');
        cy.get('nav a').should('have.length', 4 );
        cy.get('nav ul a').should('have.length', 3);
    });

    it('La navegación superior debería ser funcional', () => {
        cy.contains('Home').click();
        cy.url().should('include', '/home');
        cy.get('h1').should('have.text', 'Inicio');

        cy.contains('Administrador').click();
        cy.url().should('include', '/administrador');
        cy.get('h1').should('have.text', 'Administrador');

        cy.contains('Cotizador').click();
        cy.url().should('include', '/cotizador');
        cy.get('h1').should('have.text', 'Generación de cotizaciones');
    });
});