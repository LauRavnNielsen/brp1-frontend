// <reference types="cypress" />

describe('trending dashboard', () => {


    beforeEach(() => {
        cy.visit('/login');
    });




    it('view trending recipes', () => {
        cy.get('#basic_username').type('Tamas');
        cy.get('#basic_password').type('test12345');
        cy.get('form').submit();



        cy.url().should('eq','http://localhost:3000/');
        cy.contains('Trending').click()
        cy.contains('Recipes')
        cy.get('img').should('have.length', 4)
    })


});