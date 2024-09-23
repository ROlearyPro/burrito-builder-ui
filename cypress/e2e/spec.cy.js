describe("empty spec", () => {
  beforeEach(() => {
    cy.intercept('/api/v1/orders', {fixture:'orders'}).as('getOrders')
    cy.intercept({method:'POST', url:'/api/v1/orders'}).as('checkApi')

    cy.visit('http://localhost:3000/');
    cy.wait(['@getOrders'])
  })
    it("should check the default page", () => {
      // cy.get
      cy.get('h1').should("contain", "Burrito Builder")
      cy.get('p').should("contain", "Order:")
      cy.get('.subButton').should('exist')
    });

    it("Check flow of adding new order to DOM", ()=>{
      cy.get('input').type("George");
      cy.get('[name="steak"]').click();

      cy.get('[name="beans"]').click();
      cy.get('[name="lettuce"]').click();

      cy.get('.subButton').click();
      cy.get('@checkApi').its('request.body').should(
      'deep.equal',
      JSON.stringify({
        name: "George",
        ingredients:["lettuce, beans, steak"],
      })
    )
  })
  
});

