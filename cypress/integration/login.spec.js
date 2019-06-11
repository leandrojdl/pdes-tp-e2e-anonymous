describe('Home', () => {
  let url;
  before(() => {
    url = Cypress.env('host');
  });

  it('Entrando a la Revolución Industrial', () => {
    cy.visit(url);
    cy.contains('Revolución Industrial');
    cy.contains('Ingreso al juego');
    cy.get('input').first().focus().type('jon');
    cy.get('button').first().contains('Ingresar');
  });
});
