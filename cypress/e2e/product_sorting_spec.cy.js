import { users } from "../fixtures/user.json";

describe("Product Navigation", () => {
  beforeEach(() => {
    // Data setup and login
    const { username, password } = users.standard_user;
    cy.visit("/");
    cy.login(username, password);
  });

  it("Sorts product from highest to lowest price", () => {
    // Select "Price (high to low)" option
    cy.get('[data-test="product_sort_container"]').select("hilo");

    // Assert the option "Price (high to low)" exists directly
    cy.get('.product_sort_container option[value="hilo"]').should(
      "have.text",
      "Price (high to low)"
    );

    // Price sorting assertion
    // The code below create a copy of the prices array and sort it in descending order
    cy.get(".inventory_item_price")
      .then(($prices) =>
        $prices.toArray().map((el) => parseFloat(el.innerText.replace("$", "")))
      )
      .should((prices) => {
        // This code creates a copy of the prices array and sort it in descending order
        const sortedPrices = [...prices].sort((a, b) => b - a);
        // The assertion below compares the original array of prices and sorted array.
        // If they match, it means the prices were already in descending order on the page.
        expect(prices).to.deep.equal(sortedPrices);
      });
  });
});
