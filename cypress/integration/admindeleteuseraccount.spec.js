// <reference types="cypress" />

describe('admin delete user dashboard', () => {


    beforeEach(() => {
        cy.visit('/admin');
    });




    it('delete specific user', () => {
        cy.logina('Admin','admin123')

        cy.contains('Admin-panel').click()
        cy.contains('Manage users').click()

        cy.contains('delete').click()

    })


});