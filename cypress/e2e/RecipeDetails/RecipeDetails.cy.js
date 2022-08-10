describe('Recipe Details Authenticated', () => {
  before(() => {
    cy.visit('http://localhost:3000/');
    cy.get('#email').type('test@gmail.com');
    cy.get('#password').type('password');
    cy.get('button').click();
    cy.contains('Details').click();
  });

  beforeEach(() => {
    cy.Cookies.preserveOnce('sid', 'remember_token');
  });

  it('Should display recipe details', () => {
    cy.get('#image-header-banner').should('exist');
    cy.get('#recipe-title').should('exist');
  });

  it('should add & delete item to the shopping list', () => {
    cy.get('tbody').find('.add-Shopping-item-button').first().click();

    cy.get('tbody')
      .find('tr')
      .first()
      .then(($tr) => {
        const listItemName = $tr.find('th').text();
        const listItemQuantity = $tr.find('td').first().text();
        const listItemUnit = $tr.find('td').eq(1).text();

        cy.contains('Shopping List').click();
        cy.get('.modal-box').contains(listItemName).should('exist');
        cy.get('.modal-box').contains(listItemQuantity).should('exist');
        cy.get('.modal-box').contains(listItemUnit).should('exist');

        cy.get('.modal-box').contains(listItemName).parent().find('th').click();
        cy.get('.modal-box').contains(listItemName).should('not.exist');
        cy.get('.modal-box').contains(listItemQuantity).should('not.exist');
        cy.get('.modal-box').contains(listItemUnit).should('not.exist');
      });
  });
});
