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

  const componentSelector = {
    addressInput: 'input[name="address"]',
    nameInput: 'input[name="name"]',
    phoneInput: 'input[name="phone"]',
    companyPicker: '.MuiSelect-select',
    formButton: 'button[aria-label="Continuar"]',
    codeInput: 'input[name="code"]',
    lastPickerItem: '#menu- > .MuiPaper-root > .MuiList-root > [tabindex="-1"]',
  };

  describe('when the changes are valid', () => {
    beforeEach(() => {
      mockFirstCompany();
      mockValidUpdate();
    });

    it('modifies a company', () => {
      setup();

      cy.get(componentSelector.companyPicker).contains('Company test');

      cy.get(componentSelector.nameInput).clear().type('Modified name');

      cy.get(componentSelector.addressInput).clear().type('Modified Address');

      cy.get(componentSelector.formButton).click();

      cy.findByText('Atualizar Empresa').click();

      cy.findByText('Empresa atualizada com sucesso!').should('be.visible');

      cy.get(componentSelector.nameInput).should('have.value', 'Modified name');
      cy.get(componentSelector.addressInput).should(
        'have.value',
        'Modified Address'
      );

      cy.get(componentSelector.companyPicker).contains('Modified name');

      cy.get(componentSelector.formButton).contains('Continuar');
    });

    describe('when the changes are not valid', () => {
      beforeEach(() => {
        mockFirstCompany();
        mockInvalidUpdate();
      });

      it('throws an error', () => {
        setup();

        cy.get(componentSelector.phoneInput).type('{backspace}');

        cy.get(componentSelector.formButton).click();

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

        cy.get(componentSelector.nameInput).should(
          'have.value',
          'Company test'
        );
        cy.get(componentSelector.codeInput).should(
          'have.value',
          '8255260d320720752fef'
        );

        cy.get('.MuiSelect-select').contains('Company test').click();
        cy.get(
          componentSelector.lastPickerItem
        ).click();

        cy.get(componentSelector.nameInput).should(
          'have.value',
          'Second Company'
        );
        cy.get(componentSelector.codeInput).should(
          'have.value',
          '9366371e211611543ddd'
        );
      });
    });
  });
});
