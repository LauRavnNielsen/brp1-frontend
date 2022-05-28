// <reference types="cypress" />

describe('admin setting recipes dashboard', () => {


    beforeEach(() => {
        cy.visit('/admin');
    });




    it('add new recipe', () => {
        cy.get('#basic_username').type('Admin');
        cy.get('#basic_password').type('admin123');
        cy.get('form').submit();

        cy.contains('Admin-panel').click()
        cy.contains('Manage recipes').click()
        cy.get('[placeholder="Search"]').type("pasta")
        cy.contains('Fetch recipes').click()
    })

    it('delete trending recipe', () => {
        cy.get('#basic_username').type('Admin');
        cy.get('#basic_password').type('admin123');
        cy.get('form').submit();

        cy.contains('Admin-panel').click()
        cy.contains('Manage recipes').click()
        cy.contains('Trending').click()
    })

});