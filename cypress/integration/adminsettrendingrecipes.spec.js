// <reference types="cypress" />

describe('admin setting recipes dashboard', () => {


    beforeEach(() => {
        cy.visit('/admin');
    });




    it('add new recipe', () => {
        cy.logina('Admin','admin123')

        cy.contains('Admin-panel').click()
        cy.contains('Manage recipes').click()
        cy.get('[placeholder="Search"]').type("pasta")
        cy.contains('Fetch recipes').click()
    })

    it('delete trending recipe', () => {
        cy.logina('Admin','admin123')

        cy.contains('Admin-panel').click()
        cy.contains('Manage recipes').click()
        cy.contains('Trending').click()
    })

});