import '@testing-library/cypress/add-commands'

Cypress.Commands.add('login', (username, password) => {
  cy.visit('/')

  cy.get('#email').type(username)
  cy.get('#password').type(`${password}{enter}`)

  cy.url().should('include', '/dashboard')
})

Cypress.Commands.add('logout', () => {
  cy.get('.MuiToolbar-root > div > .MuiButtonBase-root').click()
  cy.findAllByText('Sair').click()

  cy.url().should('include', '/')
})
