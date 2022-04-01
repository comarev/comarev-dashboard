import '@testing-library/cypress/add-commands'

Cypress.Commands.add('login', (username, password) => {
  cy.visit('/')

  cy.intercept(
    { 
      method: 'POST',
      url: '/login',
    }, { fixture: 'admin-user.json' }
  ).as('getUser')

  cy.get('#email').type(username)
  cy.get('#password').type(`${password}{enter}`)

  cy.url().should('include', '/dashboard')
})

Cypress.Commands.add('logout', () => {
  cy.get('.MuiToolbar-root > div > .MuiButtonBase-root').click()
  cy.findAllByText('Sair').click()

  cy.url().should('include', '/')
})
