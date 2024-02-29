import { users } from "../../fixtures/user.json";

describe("Product Navigation", () => {
  beforeEach(() => {
    // Data setup and login
    const { username, password } = users.standard_user;
    cy.visit("https://www.saucedemo.com/");
    cy.login(username, password);
  });
  it("navigates to each product detail page correctly", () => {
    // Collect all product names and navigate to their details page using link element
    cy.get('a[id^="item"][id$="title_link"]').then(($el) => {
      const products = $el
        .toArray()
        .map((link) => Cypress.$(link).find(".inventory_item_name").text());

      products.forEach((name) => {
        cy.contains(".inventory_item_name", name).click();

        // Asserts that user landed on correct product page
        cy.get(".inventory_details_name").should("have.text", name);
        cy.get('[data-test="back-to-products"]').click();
      });
    });
  });
});
