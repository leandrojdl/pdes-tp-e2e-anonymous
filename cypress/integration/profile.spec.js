describe('A new user profile test', () => {
  let url;
  let user;
  before(() => {
    url = Cypress.env('host');
    user = 'Pepe';
  });

  it('Enter into a new user profile and this have all elements', () => {
    cy.visit(`${url}${user}`);
    cy.contains('Revolución Industrial');
    cy.contains(`Hola ${user} estas son tus fabricas`);
    cy.contains('Crear');
    cy.get('button').should('have.class', 'createButton');
    cy.get('table').contains('td', 'Nombre');
    cy.get('table').contains('td', 'Fecha de guardado');
    cy.get('table').contains('td', 'Cantidad de maquinas');
    cy.get('table').contains('td', 'Opciones');
  });

  it('The profile has a table with all the users games', () => {
    cy.get('table tr').should('have.length', 1);
  });
});
