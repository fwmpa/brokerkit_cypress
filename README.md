# Cypress E2E Testing Project 

This project utilizes Cypress for end-to-end (E2E) testing of an e-commer web application (https://www.saucedemo.com/). It includes a suite of tests for product navigation, checkout processes, and product sorting functionalities.

## Installation

Before installing this project, ensure you have Node.js installed on your machine. This project supports both npm and yarn for managing dependencies. Follow the steps below based on your preferred package manager.

### Using npm

1. Clone the repository to your local machine.
2. Navigate to the project directory in your terminal.
3. Run `npm install` to install the project dependencies, including Cypress.

### Using yarn

If you prefer using yarn, follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the project directory in your terminal.
3. Run `yarn install` to install the project dependencies, including Cypress.

## Running Tests

You can run the Cypress tests using either npm or yarn.

### Using npm

To open the Cypress Test Runner, use the following command:
`npx cypress open`


### Using yarn

To open the Cypress Test Runner with yarn, use:
`yarn cypress open`


## GitHub Actions Pipeline

This project is configured with a GitHub Actions pipeline for continuous integration (CI). The pipeline automatically runs the Cypress tests on every push to the repository, ensuring that changes do not break existing functionalities.

You can view the pipeline configuration and test results in the "Actions" tab of the GitHub repository.
