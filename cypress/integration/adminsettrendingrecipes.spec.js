// <reference types="cypress" />

describe('admin setting recipes dashboard', () => {


    beforeEach(() => {
        cy.visit('/admin');
    });




    it.only('add new recipe', () => {
        cy.logina('Admin','admin123')

        cy.contains('Admin-panel').click()
        cy.contains('Manage recipes').click()
        cy.get('[placeholder="Search"]').type("cake")
        cy.contains('Fetch recipes').click()
        cy.get('img').first().click()
        cy.contains('Add to trending').click()
        cy.contains('Trending').click()
        cy.contains('Cake Balls').should('exist')
    })

    it('delete trending recipe', () => {
        cy.logina('Admin','admin123')

        cy.contains('Admin-panel').click()
        cy.contains('Manage recipes').click()
        cy.contains('Trending').click()
        cy.get('img').first().click()
        cy.contains('Remove from trending')
        cy.contains('Cake Balls').should('not.exist')
    })

});