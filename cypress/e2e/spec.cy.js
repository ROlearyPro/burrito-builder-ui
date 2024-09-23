describe("empty spec", () => {
  beforeEach(() => {
    cy.intercept('/api/v1/orders', {fixture:'orders'}).as('getOrders')
    cy.intercept({method:"POST", url:'http://localhost:3000/api/v1/orders'},
      {body:{
        name: "George",
        ingredients:["lettuce, beans, steak"],
      }}).as('checkApi')
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
        cy.wait('@checkApi').its('request.url').should('include', '/api/v1/orders')

        cy.get('input').type("George");
        cy.get('[name="steak"]').click();
        cy.get('[name="beans"]').click();
        cy.get('[name="lettuce"]').click();
        cy.get('.subButton').click();
        cy.wait('@checkApi').its('request.body.name').should('include', 'George')
        cy.get('input').type("George");
        cy.get('[name="steak"]').click();
        cy.get('[name="beans"]').click();
        cy.get('[name="lettuce"]').click();
        cy.get('.subButton').click();
        cy.wait('@checkApi').its('request.body.ingredients').should('include', 'beans')
     
        
  })
  it("should not submit without name and ingredient", ()=>
  {
    cy.get('input').type("George");
    cy.get('.subButton').click();
    cy.get('.subButton').should('contain', 'Not able to submit; enter name and ingredient, then try again.');

    cy.wait(400)
    cy.visit('http://localhost:3000/');
    cy.get('[name="steak"]').click();
    cy.get('[name="beans"]').click();
    cy.get('[name="lettuce"]').click();
    cy.get('.subButton').click();

    cy.get('.subButton').should('contain', 'Not able to submit; enter name and ingredient, then try again.');
       cy.wait(400)

    })
  
});

