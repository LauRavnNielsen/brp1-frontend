// <reference types="cypress" />

describe('admin delete user dashboard', () => {


    beforeEach(() => {
        cy.visit('/admin');
    });




    it('delete specific user', () => {
        cy.get('#basic_username').type('Admin');
        cy.get('#basic_password').type('admin123');
        cy.get('form').submit();

        cy.contains('Admin-panel').click()
        cy.contains('Manage users').click()

        cy.contains('delete').click()

    })


});