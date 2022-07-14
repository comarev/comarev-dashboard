describe('Companies_Edition', () => {
  const manager = 'manager@example.com',
    password = '123456';

  const setup = () => {
    cy.login_manager(manager, password);
    cy.findAllByText('Empresa').click();
    cy.findByText('Editar empresa').should('be.visible');
  };

  const mockValidUpdate = () => {
    cy.intercept('PATCH', '/companies/1', {
      fixture: 'edit-company-success.json',
    }).as('patchCompany');
  };

  const mockInvalidUpdate = () => {
    cy.intercept('PATCH', '/companies/1', (req) => {
      req.reply({
        statusCode: 422,
        body: ['Telefone não possui o tamanho esperado (14 caracteres)'],
      });
    }).as('patchError');
  };

  const mockFirstCompany = () => {
    cy.intercept('GET', '/companies/1', { fixture: 'edit-company.json' }).as(
      'getCompany1'
    );
  };

  const mockSecondCompany = () => {
    cy.intercept('GET', '/companies/2', {
      fixture: 'edit-second-company.json',
    }).as('getCompany2');
  };

  describe('when the changes are valid', () => {
    beforeEach(() => {
      mockFirstCompany();
      mockValidUpdate();
    });

    it('modifies a company', () => {
      setup();

      cy.get('.MuiSelect-select').contains('Company test');

      cy.get('input[name="name"]').type('{selectAll}{backspace}');
      cy.get('input[name="name"]').type('Successfully patched company');

      cy.get('input[name="address"]').type('{selectAll}{backspace}');
      cy.get('input[name="address"]').type('Modified Address');

      cy.findByText('Continuar').click();

      cy.findByText('Atualizar Empresa').click();

      cy.findByText('Empresa atualizada com sucesso!').should('be.visible');

      cy.get('input[name="name"]').should(
        'have.value',
        'Successfully patched company'
      );
      cy.get('input[name="address"]').should('have.value', 'Modified Address');

      cy.get('.MuiSelect-select').contains('Successfully patched company');

      cy.findByText('Continuar').should('be.visible');
  });

  describe('when the changes are not valid', () => {
    beforeEach(() => {
      mockFirstCompany();
      mockInvalidUpdate();
    });

    it('throws an error', () => {
      setup();

      cy.get('input[name="phone"]').type('{backspace}');

      cy.get('button[aria-label="Continuar"]').click();

      cy.findByText('Atualizar Empresa').click();
      cy.findAllByText('Alguns erros impediram o(a) modificação.');
      cy.findAllByText(
        'Telefone não possui o tamanho esperado (14 caracteres)'
      ).should('be.visible');
    });
  });

  describe('when the user switches between the companies', () => {
    beforeEach(() => {
      mockFirstCompany();
      mockSecondCompany();
    });

    it('updates the form data dynamically', () => {
      setup();

      cy.get('input[name="name"]').should('have.value', 'Company test');
      cy.get('input[name="code"]').should('have.value', '8255260d320720752fef');

      cy.get('.MuiSelect-select').contains('Company test').click();
      cy.get(
        '#menu- > .MuiPaper-root > .MuiList-root > [tabindex="-1"]'
      ).click();

      cy.get('input[name="name"]').should('have.value', 'Second Company');
      cy.get('input[name="code"]').should('have.value', '9366371e211611543ddd');
    });
  });
});
})
