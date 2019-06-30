describe('A new user profile test', () => {
  let url;
  let user;
  let gameName;
  before(() => {
    url = Cypress.env('host');
    user = 'Pepe';
    gameName = 'Nuevo juego';
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

  it('When touch the Crear button verify if exist all elements', () => {
    cy.contains('Crear').click();
    cy.contains('Nuevo juego');
    cy.get('input').should('have.class', 'gameName');
    cy.contains('Ingresar');
    cy.contains('Cancelar');
  });

  it('Try create a new game but cancel the order', () => {
    cy.get('input').type(gameName);
    cy.contains('Cancelar').click();
    cy.get('table tr').should('have.length', 1);
  });

  it('Create a new game', () => {
    cy.contains('Crear').click();
    cy.get('input').type(gameName);
    cy.contains('Ingresar').click();
    cy.get('table tr').should('have.length', 2);
  });

  it('The new game contains all element in your row', () => {
    const date = new Date();
    const dateString = `${date.getDate()}/${(date.getMonth() + 1)}/${date.getFullYear()}`;
    cy.get('tbody>tr').eq(1)
      .should('contain', 'Nuevo juego')
      .and('contain', dateString)
      .and('contain', '0')
      .and('contain', '►')
      .and('contain', '☒');
  });

  it('Delete a game', () => {
    cy.get('tbody>tr').eq(1).contains('☒').click();
    cy.get('table tr').should('have.length', 1);
  });
});

describe('A old user profile test', () => {
  let url;
  let user;
  let gameName;

  before(() => {
    url = Cypress.env('host');
    user = 'Ricardo';
    gameName = 'Nuevo juego';

    cy.visit(`${url}${user}`);
    cy.contains('Crear').click();
    cy.get('input').type(gameName);
    cy.contains('Ingresar').click();
  });

  after(() => {
    cy.visit(`${url}${user}`);
    cy.contains('☒').click();
  });

  it('Enter into a old user profile and this have all elements', () => {
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
    cy.get('table tr').should('have.length', 2);
  });

  it('Enter in the game', () => {
    cy.get('tbody>tr').eq(1).contains('►').click();
    cy.url().should('include', `${url}${user}`);
  });
});
