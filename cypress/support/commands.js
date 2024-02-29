Cypress.Commands.add("login", (username, password) => {
  cy.get("[data-test=username]").type(username);
  cy.get("[data-test=password]").type(password);
  cy.get("[data-test=login-button]").click();
});

// Checkout commands
// Find the product by name and click the "Add to Cart" button for that specific product
Cypress.Commands.add("initiateCheckout", () => {
  cy.get('[data-test="checkout"]').click();
});

Cypress.Commands.add("completeOrder", () => {
  cy.get('[data-test="finish"]').click();
});

Cypress.Commands.add("backToProducts", () => {
  cy.get('[data-test="back-to-products"]').click();
});

Cypress.Commands.add("addProductToCart", (product) => {
  cy.contains(".inventory_item_name", product)
    .parents(".inventory_item_description")
    .find("button")
    .click();
});

Cypress.Commands.add("addCheckoutInfo", (firstName, lastName, postalCode) => {
  cy.get('[data-test="firstName"]').type(firstName);
  cy.get('[data-test="lastName"]').type(lastName);
  cy.get('[data-test="postalCode"]').type(postalCode);
  cy.get('[data-test="continue"]').click();
});

Cypress.Commands.add("verifyProductInCart", (product) => {
  cy.get(".shopping_cart_link").click();
  cy.get(".inventory_item_name").should("have.text", product);
});

Cypress.Commands.add("verifyCheckoutTotals", (productPrice, tax) => {
  cy.get(".summary_subtotal_label").should(
    "have.text",
    `Item total: $${productPrice}`
  );
  cy.get(".summary_tax_label").should("have.text", `Tax: $${tax}`);
  cy.get(".summary_total_label").should(
    "have.text",
    `Total: $${parseFloat(productPrice) + parseFloat(tax)}`
  );
});

Cypress.Commands.add(
  "verifyOrderCompletion",
  (completionMessage, dispatchMessage) => {
    cy.get(".complete-header").should("have.text", completionMessage);
    cy.get(".complete-text").should("have.text", dispatchMessage);
  }
);

// Assert that the "Add to Cart" button for the product has been clicked by checking the button text. If if the button's text changes to "Remove", it indicates the item was added to the cart
Cypress.Commands.add("isProductAddedToCart", (product) => {
  cy.contains(".inventory_item_name", product)
    .parents(".inventory_item_description")
    .find("button")
    .should("have.text", "Remove");
});
