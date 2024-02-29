import { users } from "../fixtures/user.json";

describe("Product Navigation", () => {
  const product = {
    name: "Sauce Labs Fleece Jacket",
    price: "$49.99",
    tax: "$4.00",
    total: "$53.99",
    completionMessage: "Thank you for your order!",
    dispatchMessage:
      "Your order has been dispatched, and will arrive just as fast as the pony can get there!",
  };
  beforeEach(() => {
    // Data setup and login
    const { username, password } = users.standard_user;

    cy.visit("https://www.saucedemo.com/");
    cy.login(username, password);
  });

  it(`adds the ${product.name} to the cart`, () => {
    // Find the product by name and click the "Add to Cart" button for that specific product
    cy.contains(".inventory_item_name", product.name)
      .parents(".inventory_item_description")
      .find("button")
      .click();

    // Assert that the "Add to Cart" button for the "Sauce Labs Fleece Jacket" has been clicked
    // This can be done by checking if the button's text changes or if the button has a specific state indicating the item was added to the cart
    // For example, if the button's text changes to "Remove", you can assert that change
    cy.contains(".inventory_item_name", product.name)
      .parents(".inventory_item_description")
      .find("button")
      .should("have.text", "Remove");

    cy.get(".shopping_cart_link").click();

    cy.get(".inventory_item_name").should("have.text", product.name);

    cy.get('[data-test="checkout"]').click();
    cy.addCheckoutInfo("john", "doe", "12345");
    cy.get('[data-test="continue"]').click();

    cy.get(".summary_subtotal_label").should(
      "have.text",
      `Item total: ${product.price}`
    );
    cy.get(".summary_tax_label").should("have.text", `Tax: ${product.tax}`);
    cy.get(".summary_total_label").should(
      "have.text",
      `Total: ${product.total}`
    );

    cy.get('[data-test="finish"]').click();

    cy.get(".complete-header").should("have.text", product.completionMessage);
    cy.get(".complete-text").should("have.text", product.dispatchMessage);

    cy.get('[data-test="back-to-products"]').click();
  });
});
