// <reference types="cypress" />

describe('trending dashboard', () => {


    beforeEach(() => {
        cy.visit('/login');
    });




    it('view trending recipes', () => {
        cy.login('Tamas','test12345')



        cy.url().should('eq','http://localhost:3000/');
        cy.contains('Trending').click()
        cy.contains('Recipes')
        cy.get('img').should('have.length', 4)
    })


});