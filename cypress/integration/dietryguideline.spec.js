// <reference types="cypress" />

describe('dietary dashboard', () => {


    beforeEach(() => {
        cy.visit('/login');
    });




    it.skip('view dietary guideline', () => {
        cy.login('Tamas','test12345')

        cy.url().should('eq','http://localhost:3000/');
        cy.contains('Guidelines').click()
        cy.contains('Eat plant-rich, varied and not too much')
    })


});