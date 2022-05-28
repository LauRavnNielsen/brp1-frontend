// <reference types="cypress" />

describe('view nutrition values dashboard', () => {


    beforeEach(() => {
        cy.visit('/login');
    });




    it('view nutrition values', () => {
        cy.get('#basic_username').type('Tamas');
        cy.get('#basic_password').type('test12345');
        cy.get('form').submit();



        cy.url().should('eq','http://localhost:3000/');
        cy.get('[placeholder="Search"]').type('pasta')
       cy.contains('Fetch recipes').click()
        cy.get('img').first().click()
        cy.contains('Nutrition')
        cy.get('img').eq(2).should('exist')
    })

    it('view equipments values', () => {
        cy.get('#basic_username').type('Tamas');
        cy.get('#basic_password').type('test12345');
        cy.get('form').submit();



        cy.url().should('eq','http://localhost:3000/');
        cy.get('[placeholder="Search"]').type('pasta')
        cy.contains('Fetch recipes').click()
        cy.get('img').first().click()
        cy.contains('Equipment').click()
        cy.get('img').eq(2).should('exist')

    })


    it.only('view ingridients values', () => {
        cy.get('#basic_username').type('Tamas');
        cy.get('#basic_password').type('test12345');
        cy.get('form').submit();



        cy.url().should('eq','http://localhost:3000/');
        cy.get('[placeholder="Search"]').type('pasta')
        cy.contains('Fetch recipes').click()
        cy.get('img').first().click()
        cy.contains('Ingredients').click()
        cy.get('img').eq(2).should('exist')
    })

    it('search for non-existing food', () => {
        cy.get('#basic_username').type('Tamas');
        cy.get('#basic_password').type('test12345');
        cy.get('form').submit();



        cy.url().should('eq','http://localhost:3000/');
        cy.get('[placeholder="Search"]').type('non-existing')
        cy.contains('Fetch recipes').click()
        cy.get('img').should('not.exist')


    })



});