// <reference types="cypress" />

describe('admin edit dietary guideline dashboard', () => {


    beforeEach(() => {
        cy.visit('/admin');
    });




    it('add new element to the dietary guideline', () => {
        cy.get('#basic_username').type('Admin');
        cy.get('#basic_password').type('admin123');
        cy.get('form').submit();

        cy.contains('Admin-panel').click()
        cy.contains('Manage guidelines').click()

        cy.contains('Click to add another guideline').click()
        cy.get('input').type('test')
        cy.contains('Add').click()
    })

    it('cancel adding an element to the dietary guideline', () => {
        cy.get('#basic_username').type('Admin');
        cy.get('#basic_password').type('admin123');
        cy.get('form').submit();

        cy.contains('Admin-panel').click()
        cy.contains('Manage guidelines').click()

        cy.contains('Click to add another guideline').click()
        cy.get('input').type('test')
        cy.contains('Cancel').click()
    })

    it('delete element from the dietary guideline', () => {
        cy.get('#basic_username').type('Admin');
        cy.get('#basic_password').type('admin123');
        cy.get('form').submit();

        cy.contains('Admin-panel').click()
        cy.contains('Manage guidelines').click()

        cy.get('.ant-btn-dangerous').last().click()
    })


});