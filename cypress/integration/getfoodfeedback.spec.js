// <reference types="cypress" />

describe('get food feedback', () => {


    beforeEach(() => {
        cy.visit('/login');
    });




    it.only('add recipe to meal', () => {
        cy.login('Tamas','test12345')

        cy.url().should('eq','http://localhost:3000/');
        cy.contains('Tracking').click()
        cy.get('input').first().type('pasta').click()
        cy.contains('Search').click()
        cy.contains('1. pasta water').click()
        cy.get('[type="number"]').type('.25')
        cy.contains('Nutritional values').click()
        cy.contains('Fluoride').should('exist')
        cy.contains('1.29 mg').should('exist')
        cy.contains('0 %').should('exist')

    })

});