// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
//Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
//Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

//login command


Cypress.Commands.add('login', (username, password) => {
    cy.visit('/login')
    cy.get('#basic_username').type(username);
    cy.get('#basic_password').type(password);
    cy.get('form').submit();
})

Cypress.Commands.add('logina', (adminname, password) => {
    cy.visit('/admin')
    cy.get('#basic_username').type(adminname);
    cy.get('#basic_password').type(password);
    cy.get('form').submit();
})