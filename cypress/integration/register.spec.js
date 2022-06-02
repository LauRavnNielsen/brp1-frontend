// <reference types="cypress" />

describe('register dashboard', () => {


    beforeEach(() => {
        cy.visit('localhost:3000/login');
    });


    it.skip('create new user without filling the form', () => {
        cy.contains('Sign up').click()
        cy.contains('Repeat Password')
        cy.get('form').submit()
        cy.contains('Please input your username!')
        cy.contains('Please input your email!')
        cy.contains('Please input your password!')
        cy.contains('Please confirm your password!')
    })

    it.skip('create new user', () => {
        cy.contains('Sign up').click()
        cy.get('#basic_username').type('test')
        cy.get('#basic_email').type('test@test.dk')
        cy.get('#basic_password').type('test1234')
        cy.get('#basic_repeat-password').type('test1234')
        cy.get('form').submit()
        cy.url.should('eq','http://localhost:3000/');
    })


});