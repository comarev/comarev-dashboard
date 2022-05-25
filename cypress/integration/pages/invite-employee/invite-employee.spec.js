describe('Invite new employee', () => {
  const manager = 'manager@example.com';
  const password = '123456';

  beforeEach(() => {
    cy.visit('/');
    cy.get('#email').type(manager);
    cy.get('#password').type(password);
    cy.get('[type=submit]').click();
    cy.contains('Convidar novo empregado').click();
  });

  it('Invite new employee option must be visible when user is a manager', () => {
    cy.contains('Convidar novo empregado').should('be.visible');
  });

  it('should display an e-mail form when visiting invite new employee link', () => {
    cy.get('#email').should('be.visible');
    cy.get('button[aria-label="Enviar e-mail"]').should('be.visible');
  });

  it('should display error message when trying to submit with empty input', () => {
    cy.get('button[aria-label="Enviar e-mail"]').click();
    cy.contains('Campo obrigatório').should('be.visible');
  });
});

describe('Invite new employee option must not exist', () => {
  it('Invite new employee option must not exist when user is other than a manager', () => {
    cy.login('admin@example.com', '123456');
    cy.contains('Convidar novo empregado').should('not.exist');
  });
});
