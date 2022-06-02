// <reference types="cypress" />

describe('Login dashboard', () => {


    beforeEach(() => {
        cy.visit('/login');
      });

      


      it.skip('Log in with test user', () => {
          cy.get('#basic_username').type('Tamas');
          cy.get('#basic_password').type('test1234');
          cy.get('form').submit();
      })

      it.skip('log in with incorrect login information', () => {
        cy.get('#basic_username').type('Tamas');
        cy.get('#basic_password').type('wrong passord');
        cy.get('form').submit();
        cy.get('[class="ant-notification-notice ant-notification-notice-info ant-notification-notice-closable"]')
        cy.contains('Login failed')
        cy.contains('The login attempt failed, the password or username doesnt match.')
      })

 });