import { users } from "../../fixtures/user.json";

describe("Product Navigation", () => {
  beforeEach(() => {
    // Data setup and login
    const { username, password } = users.standard_user;
    cy.visit("https://www.saucedemo.com/");
    cy.login(username, password);
  });
  it("navigates to each product detail page correctly", () => {
    // Collect all product names and navigate to their details page
    // Because the ids value text changes only the number in the middle,
    // I built a locator that will look for elemnts ids that starts with "item" and finishes with "title_link"
    cy.get('a[id^="item"][id$="title_link"]').then(($links) => {
      const productNames = $links
        .toArray()
        .map((link) => Cypress.$(link).find(".inventory_item_name").text());

      // Asserts that user landed on correct product page
      productNames.forEach((name) => {
        cy.contains(".inventory_item_name", name).click();
        cy.get(".inventory_details_name").should("have.text", name);
        cy.go("back");
      });
    });
  });
});
