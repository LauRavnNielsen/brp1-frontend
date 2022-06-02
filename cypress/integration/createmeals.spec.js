// <reference types="cypress" />

describe('Tracking dashboard', () => {


    beforeEach(() => {
        cy.visit('/login');
    });




    it('add recipe to meal', () => {
        cy.login('Tamas','test12345')

        cy.url().should('eq','http://localhost:3000/');
        cy.contains('Tracking').click()
        cy.get('input').first().type('pasta').click()
        cy.contains('Search').click()
        cy.contains('1. pasta water').click()
        cy.contains('Add to meal').click()
        cy.contains('pasta water').should('exist')
        cy.contains(',').should('exist')
        cy.contains('0').should('exist')
        cy.contains('Confirm breakfast').click()
    })

    it('change meal type, unit and amount of food', () => {
        cy.login('Tamas','test12345')
        cy.url().should('eq','http://localhost:3000/');
        cy.contains('Tracking').click()

        cy.get('.ant-select-selection-search-input').first().click()
        cy.contains('g').click()
        cy.get('[type="number"]').type('.25')
        cy.get('[title="Breakfast"]').click()
        cy.get('[title="Dinner"]').click({ force: true }).should('exist')
    })
    it.only('searches for non-existing recipes', () => {
        cy.login('test','test')
        cy.url().should('eq','http://localhost:3000/');
        cy.contains('Tracking').click()
        cy.get('input').first().type('pizza').click()
        cy.contains('Search').click()
        cy.contains('0').should('exist')
        cy.contains('1').should('exist')
        cy.contains('2').should('exist')
        cy.get('input').first().type('pizza1234').click()
        cy.contains('Search').click()
        cy.contains('0').should('not.exist')
        cy.contains('1').should('not.exist')
        cy.contains('2').should('not.exist')
    })
});