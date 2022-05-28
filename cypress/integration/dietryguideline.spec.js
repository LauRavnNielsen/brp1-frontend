// <reference types="cypress" />

describe('dietary dashboard', () => {


    beforeEach(() => {
        cy.visit('/login');
    });




    it.skip('view dietary guideline', () => {
       cy.get('#basic_username').type('Tamas');
        cy.get('#basic_password').type('test12345');
        cy.get('form').submit();



        cy.url().should('eq','http://localhost:3000/');
        cy.contains('Guidelines').click()
        cy.contains('Eat plant-rich, varied and not too much')
    })


});