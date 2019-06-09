describe('Home', () => {
  let url;
  before(() => {
    url = Cypress.env('host');
  });

  it('Entrando a la Revolución Industrial', () => {
    cy.visit(url);
    cy.contains('Revolución Industrial');
    cy.contains('Máquinas');
    cy.contains('Edición');
    cy.contains('Ganancias');
    cy.contains('Detalles');
  });
});
