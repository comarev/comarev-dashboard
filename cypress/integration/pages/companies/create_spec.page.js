describe('Companies', () => {
  const admin = 'admin@example.com', password = '123456', companyCNPJ = Math.random().toString().slice(2,16)

  beforeEach(() => {
    cy.login(admin, password)

    cy.findAllByText('Empresas').click()
    cy.url().should('include', '/companies')
  })

  it('successfully creates a new company', () => {
    cy.findAllByText('Cadastrar Empresa').click()
    cy.findAllByText('Nova empresa').should('exist')

    cy.get('[data-testid="company-name-input"]').type('Company Test')
    cy.get('[data-testid="company-cnpj-input"]').type(companyCNPJ)
    cy.get('[data-testid="company-discount-input"]').type(10)
    cy.get('[data-testid="company-address-input"]').type('Avenue test, 13')

    cy.findAllByText('Continuar').click()
    cy.findAllByText('Cadastrar Empresa').click()

    cy.url().should('include', '/companies')
    cy.findAllByText('Empresa cadastrada com sucesso!').should('exist')
    cy.get('.Toastify__close-button > svg').click()
  })

  it('could not creates a new company when CNPJ was already taken', () => {
    cy.findAllByText('Cadastrar Empresa').click()
    cy.findAllByText('Nova empresa').should('exist')

    cy.get('[data-testid="company-name-input"]').type('Company Test')
    cy.get('[data-testid="company-cnpj-input"]').type(companyCNPJ)
    cy.get('[data-testid="company-discount-input"]').type(10)
    cy.get('[data-testid="company-address-input"]').type('Avenue test, 13')

    cy.get('button').contains('Continuar').click()
    cy.get('button').contains('Cadastrar Empresa').click()
    cy.findAllByText('CNPJ já está em uso').should('exist')
  })
})