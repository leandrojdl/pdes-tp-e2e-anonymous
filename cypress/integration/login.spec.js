describe('Login test', () => {
  let url;
  let user;
  before(() => {
    url = Cypress.env('host');
    user = 'Pepe';
    cy.visit(url);
  });

  it('Enter into Revolucion industrial and this have all elements', () => {
    cy.contains('Revolución Industrial');
    cy.contains('Ingreso al juego');
    cy.contains('Ingresar');
    cy
      .get('input')
      .should('have.class', 'form-control')
      .and('have.value', '');
  });

  it('Get error when send a empty user', () => {
    cy.get('button').click();
    cy.contains('Debe completar este campo');
  });

  it('Write a new user in the input control', () => {
    cy
      .get('.form-control')
      .type(user)
      .should('have.value', user);
  });

  it('Send a user and enter your profile', () => {
    cy.get('button').click();
    cy.url().should('eq', `${url}${user}`);
  });
});
