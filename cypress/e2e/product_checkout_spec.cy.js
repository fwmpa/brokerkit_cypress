import { users } from "../fixtures/user.json";
import { products } from "../fixtures/products.json";
describe("Product Navigation", () => {
  const user = users.standard_user;
  const product = products.sauce_labs_fleece_jacket;

  beforeEach(() => {
    // Data setup and login
    cy.visit("/");
    cy.login(user.username, user.password);
  });

  it(`adds the ${product.name} to the cart`, () => {
    cy.addProductToCart(product.name);
    cy.isProductAddedToCart(product.name);

    cy.verifyProductInCart(product.name);
    cy.initiateCheckout();

    cy.addCheckoutInfo(user.first_name, user.last_name, user.postal_code);

    const tax = (4).toFixed(2);
    cy.verifyCheckoutTotals(product.price, tax);

    cy.completeOrder();

    const completionMessage = "Thank you for your order!";
    const dispatchMessage =
      "Your order has been dispatched, and will arrive just as fast as the pony can get there!";
    cy.verifyOrderCompletion(completionMessage, dispatchMessage);

    cy.backToProducts();
  });
});
