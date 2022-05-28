// <reference types="cypress" />

describe('create meals dashboard', () => {


    beforeEach(() => {
        cy.visit('/login');
    });




    it('add recipe to meal', () => {
        cy.get('#basic_username').type('Tamas');
        cy.get('#basic_password').type('test12345');
        cy.get('form').submit();



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

    it.only('change ', () => {
        cy.get('#basic_username').type('Tamas');
        cy.get('#basic_password').type('test12345');
        cy.get('form').submit();



        cy.url().should('eq','http://localhost:3000/');
        cy.contains('Tracking').click()

        cy.get('.ant-select-selection-search-input').first().click()
        cy.contains('g').click()
        cy.get('[type="number"]').type('.25')
        cy.get('[title="Breakfast"]').click()
        cy.get('[title="Dinner"]').click({ force: true }).should('exist')
    })
});