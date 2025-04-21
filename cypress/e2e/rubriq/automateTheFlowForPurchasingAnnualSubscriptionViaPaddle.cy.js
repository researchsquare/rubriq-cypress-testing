// In your test file

import LoginPageObject from "./pageObjectRubriq.json";
import loginTestData from "./testDataRubriq.json";

// Helper function to perform registration and navigate to the relevant page
function navigateTorubriqTabAndPurchasePlan() {
  cy.visit('https://secure-aje.staging.sqr.io');
  cy.get(LoginPageObject.login.regNewLink).should('be.visible').click();
  cy.userRegistration(generateRandomEmail(), loginTestData.rubriqLoginPasswordActive, 'United States');  // Use static password

  // Go to the Rubriq page
  cy.visit('https://secure-aje.staging.sqr.io/en/rubriq');
  cy.url().should('include', 'https://secure-aje.staging.sqr.io/en/rubriq');

  cy.get(LoginPageObject.tabNavigation.rubriqPop).click();
  cy.get(LoginPageObject.tabNavigation.editingTab).click();
  cy.url().should('include', 'https://secure-aje.staging.sqr.io/en/rubriq/editing');

  cy.get(LoginPageObject.editing.checkDocumentEdit).click();
  cy.get(LoginPageObject.editing.upgradeNow).click();
  cy.get(LoginPageObject.planAndPayment.getPremium).click();  
 cy.get(LoginPageObject.planAndPayment.plan).first().click();
  cy.get(LoginPageObject.planAndPayment.checkOutWithPaddle).click();
}

// Helper function to generate random email
function generateRandomEmail() {
  const timestamp = new Date().getTime();
  return `user${timestamp}@example.com`;
}

describe('Annual Plan', function () {
  it('Automate the Flow for Purchasing Annual Subscription via Paddle', function () {
    navigateTorubriqTabAndPurchasePlan('yearly');
    cy.fillPaymentDetails(loginTestData);
  });
});
