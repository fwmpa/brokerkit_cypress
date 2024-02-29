Cypress.Commands.add("login", (username, password) => {
  cy.get("[data-test=username]").type(username);
  cy.get("[data-test=password]").type(password);
  cy.get("[data-test=login-button]").click();
});

Cypress.Commands.add("addCheckoutInfo", (firstName, lastName, postalCode) => {
  cy.get('[data-test="firstName"]').type(firstName);
  cy.get('[data-test="lastName"]').type(lastName);
  cy.get('[data-test="postalCode"]').type(postalCode);
});
