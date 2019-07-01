describe('Game test', () => {
  let url;
  let user;
  let gameName;
  before(() => {
    url = Cypress.env('host');
    user = 'Ricardo';
    gameName = 'Juego nuevo';

    cy.visit(`${url}`);
    cy.get('input').type(user);
    cy.contains('Ingresar').click();
    cy.url().should('eq', `${url}${user}`);
    cy.contains('Crear').click();
    cy.get('input').type(gameName);
    cy.contains('Ingresar').click();
    cy.contains('►').click();
  });

  after(() => {
    cy.visit(`${url}${user}`);
    cy.contains('☒').click();
  });

  it('The game contains all the elements', () => {
    cy.contains('Revolución Industrial');
    cy.contains('Ganancias $500.000,42');
    cy.contains('◀').should('has.class', 'games-button');
    cy.contains('Guardar').should('has.class', 'update-game-button');
    cy.contains('Máquinas');
    cy.contains('Edición');
    cy.contains('Detalles');
    cy.contains('Starter').should('has.class', 'info name');
    cy.contains('Costo: $800').should('has.class', 'info cost');
    cy.contains('Frecuencia: 1/s').should('has.class', 'info frequency');
    cy.get('img').should('have.length', 8);
    cy.get('img').eq(0).should('have.attr', 'alt', 'StarterMachine').and('have.class', 'toolboxElement');
    cy.get('img').eq(1).should('have.attr', 'alt', 'SellerMachine').and('have.class', 'toolboxElement');
    cy.get('img').eq(2).should('have.attr', 'alt', 'FurnaceToolbox').and('have.class', 'toolboxElement');
    cy.get('img').eq(3).should('have.attr', 'alt', 'TransporterMachine').and('have.class', 'toolboxElement');
    cy.get('img').eq(4).should('have.attr', 'alt', 'CrafterMachine').and('have.class', 'toolboxElement');
    cy.get('img').eq(5).should('have.attr', 'alt', 'MoveAction').and('have.class', 'toolboxElement');
    cy.get('img').eq(6).should('have.attr', 'alt', 'RemoveAction').and('have.class', 'toolboxElement');
    cy.get('img').eq(7).should('have.attr', 'alt', 'RotateAction').and('have.class', 'toolboxElement');
    cy.get('table tr').should('have.length', 4);
    cy.get('table td').should('have.length', 16);
    cy.get('div .empty').should('have.length', 16);
  });

  it('Put a seller machine in the game', () => {
    cy.get('img').eq(1).click();
    cy.get('div .empty').eq(0).click();
    cy.get('td>div>img').should('have.attr', 'alt', 'SELLER');
    cy.get('td>div>img').should('have.class', 'down ');
  });

  it('Change the rotation of the seller machine to left', () => {
    cy.get('img').eq(7).click();
    cy.get('td>div>img').click();
    cy.get('td>div>img').should('have.attr', 'alt', 'SELLER');
    cy.get('td>div>img').should('have.class', 'right ');
  });

  it('Change the position of the seller machine to continuos right cell', () => {
    cy.get('img').eq(5).click();
    cy.get('td>div>img').click();
    cy.get('td').eq(1).click();
    cy.get('td>div>img').should('have.attr', 'alt', 'SELLER');
  });

  it('Remove the seller machine from the game', () => {
    cy.get('img').eq(6).click();
    cy.get('td>div>img').click();
    cy.get('td>div>img').should('not.exist');
  });

  it('Put a gold starter machine on the game', () => {
    cy.get('img').eq(0).click();
    cy.contains('Gold').click();
    cy.get('div .empty').eq(0).click();
    cy.get('td>div>img').should('have.attr', 'alt', 'STARTER');
    cy.get('td>div>img').should('have.class', 'down ');

    cy.get('img').eq(6).click();
    cy.get('td>div>img').click();
  });

  it('Touch the back button and go back to the user profile', () => {
    cy.contains('◀').click();
    cy.url().should('eq', `${url}${user}`);
  });

  it('Enter in the game. Put a machine in the table. Save the game. Then, go back to the profile and check the games', () => {
    cy.get('tbody>tr').eq(1).contains('►').click();
    cy.get('img').eq(1).click();
    cy.get('div .empty').eq(0).click();
    cy.contains('Guardar').click();
    cy.contains('◀').click();
    cy.get('table tr').should('have.length', 2);
    cy.get('table').contains('td', 1);
  });
});
