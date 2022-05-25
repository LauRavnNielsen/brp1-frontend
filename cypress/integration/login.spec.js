// <reference types="cypress" />

describe('Login dashboard', () => {


    beforeEach(() => {
        cy.visit('localhost:3000/login');
        cy.intercept('PUT', '/login').as('login')
        cy.get('#basic_username').type('tomi');
        cy.get('#basic_password').type('tomi');
        cy.get('form').submit();
      });

      


      it('Log in with test user', () => {
          cy.get('#basic_username').type('tomi');
          cy.get('#basic_password').type('tomi');
          cy.get('form').submit();
      })

      it('log in with incorrect login information', () => {
        cy.get('#basic_username').type('tomi');
        cy.get('#basic_password').type('wrong passord');
        cy.get('form').submit();
        cy.get('[class="ant-notification-notice ant-notification-notice-info ant-notification-notice-closable"]')
        cy.contains('Login failed')
        cy.contains('The login attempt failed, the password or username doesnt match.')
      })
      

      it('create new user without filling the form', () => {
          cy.contains('Sign up').click()
          cy.contains('Repeat Password')
          cy.get('form').submit()
          cy.contains('Please input your username!')
          cy.contains('Please input your email!')
          cy.contains('Please input your password!')
          cy.contains('Please confirm your password!')
      })

      it.only('check POST login api call', ()=> {

        
       

        cy.wait('@login')
        cy.get('@login').then(login => {
          console.log(login)
          expect(login.statusCode).to.equal(200)
          expect(login.response.body.username).to.equal('property-370')
        })
      })

 });