// <reference types="cypress" />

describe('manage account dashboard', () => {


    beforeEach(() => {
        cy.visit('/login');
    });


  /*  it.skip('delete account', () => {
        cy.contains('Settings').click()
        cy.contains('Delete').click()
        cy.get('#basic_password').type('test12345')
        cy.get('#basic_repeat-password').type('test12345')
        cy.get('form').submit()

    })

   */

    it.skip('change account information', () => {
        cy.login('Tamas','test12345')
        cy.url().should('eq','http://localhost:3000/');
        cy.contains('Settings').click()
        cy.get('#basic_email').type('new@test.hu')
        cy.get('#basic_password').type('test12345')
        cy.get('#basic_repeat-password').type('test12345')
        cy.get('form').submit()
    })

    it.skip('user does not confirm deletion', () => {
        cy.login('Tamas','test12345')
        cy.contains('Settings').click()
        cy.contains('Delete').click()
        cy.contains('Cancel').click()
    })


});