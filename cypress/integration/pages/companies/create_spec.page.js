describe('Companies', () => {
  const admin = 'admin@example.com', password = '123456', 
  companyName = 'Company Test', companyCNPJ = Math.random().toString().slice(2,16),
  companyAddress = 'Avenue test, 13'

  beforeEach(() => {
    cy.login_admin(admin, password)
    cy.intercept('GET', '/companies', { fixture: 'companies.json' })

    cy.findAllByText('Empresas').click()
    cy.url().should('include', '/companies')
  })

  it('successfully creates a new company', () => {
    cy.findAllByText('Cadastrar Empresa').click()
    cy.findAllByText('Nova empresa').should('exist')

    cy.get('input[name="name"]').type(companyName)
    cy.get('input[name="cnpj"]').type(companyCNPJ)
    cy.get('input[name="discount"]').type(10)
    cy.get('input[name="address"]').type(companyAddress)

    cy.findAllByText('Continuar').click()

    cy.intercept('POST', '/companies', {
      statusCode: 201,
      body: {
        name: companyName,
        cnpj: companyCNPJ,
        discount: 10,
        address: companyAddress
      },
    })

    cy.findAllByText('Cadastrar Empresa').click()

    cy.url().should('include', '/companies')
    cy.findAllByText('Empresa cadastrada com sucesso!').should('exist')
    cy.get('.Toastify__close-button > svg').click()
  })

  it('has errors with company creation', () => {
    cy.findAllByText('Cadastrar Empresa').click()
    cy.findAllByText('Nova empresa').should('exist')

    cy.get('input[name="name"]').type(companyName)
    cy.get('input[name="cnpj"]').type(companyCNPJ)
    cy.get('input[name="discount"]').type(10)
    cy.get('input[name="address"]').type(companyAddress)
    cy.get('button').contains('Continuar').click()

    cy.intercept('POST', '/companies', (req) => {
      req.reply({
        statusCode: 422,
        body: ['Telefone não possui o tamanho esperado (14 caracteres)']
      })
    })
    cy.get('button').contains('Cadastrar Empresa').click()

    cy.findAllByText('Telefone não possui o tamanho esperado (14 caracteres)').should('exist')
  })
})
