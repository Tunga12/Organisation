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
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })


Cypress.Commands.add('newDepartment', (name, desc, parent) => {

    // cy.contains('New Department').click()
    cy.get('[data-cy=newDep]').click()

    cy.url().should('include', '/departments/new')

    // cy.get('input#name').type(name)
    cy.get('[data-cy=nameDep]').type(name)


    // cy.get('textarea#desc').type(desc)
    cy.get('[data-cy=descDep]').type(desc)


    cy.get('.ant-select-arrow-icon').click()

    cy.get('.ant-select-dropdown-menu-item').contains(parent).click()

    // cy.contains('Submit').click()
    cy.get('[data-cy=submitDep]').click()

})
