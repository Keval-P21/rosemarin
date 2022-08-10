describe('Create recipe process', () => {
  before(() => {
    cy.visit('http://localhost:3000/');
    cy.get('#email').type('test@gmail.com');
    cy.get('#password').type('password');
    cy.get('button').click();
  });

  // after(() => {
  //   // cy.get('#logoutButton').click();
  //   // cy.wait(1000);
  //   // cy.get('#confirmLogout').click();
  //   cy.window().then((win) => win.sessionStorage.clear());
  //   cy.clearCookies();
  //   cy.clearLocalStorage();
  // });

  it('Create a recipe and show it in my recipes page', () => {
    function randRecipeName() {
      var text = '';
      var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
      for (var i = 0; i < 10; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      return text;
    }
    const randomName = randRecipeName();
    cy.wait(1000);
    cy.contains('Create Recipe').click();
    cy.get('#title').type(`${randomName}`);
    cy.get('#description').type('Cypress tea description');
    cy.get('#name-0').type('Tea');
    cy.get('#quantity-0').type('1');
    cy.get('#unit-0').type('bag');
    cy.get('#addIngredient').click();
    cy.get('#name-1').type('Water');
    cy.get('#quantity-1').type('250');
    cy.get('#unit-1').type('ml');
    cy.get('#instruction-0').type('Boil water in kettle');
    cy.get('#addInstruction').click();
    cy.get('#instruction-1').type('Put tea bag in mug and add hot water');
    cy.get('#submit').click();
    cy.wait(1000);
    cy.get('#myRecipeList').contains(`${randomName}`).should('exist');
  });
});
