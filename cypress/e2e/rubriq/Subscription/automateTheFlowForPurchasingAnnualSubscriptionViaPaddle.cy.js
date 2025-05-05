// In your test file

import pageObject from "../../../support/pageObjectRubriq.json";
import testData from "../../../fixtures/testDataRubriq.json";

// Helper function to perform registration and navigate to the relevant page
function navigateToCurieTabAndPurchasePlan() {
  cy.visit(Cypress.config('baseUrl'));
  cy.get(pageObject.login.regNewLink).should('be.visible').click();
  cy.userRegistration(generateRandomEmail(), testData.curieLoginPasswordActive, 'United States');  // Use static password

  // Go to the Rubriq page
  cy.visit(Cypress.config('baseUrl')+'/en/rubriq');
  cy.url().should('include', Cypress.config('baseUrl')+'/en/rubriq');

  cy.get(pageObject.tabNavigation.curiePop).click();
  cy.get(pageObject.tabNavigation.editingTab).click();
  cy.url().should('include', Cypress.config('baseUrl')+'/en/rubriq/editing');

  cy.get(pageObject.editing.checkDocumentEdit).click();
  cy.get(pageObject.editing.upgradeNow).click();
  cy.get(pageObject.planAndPayment.getPremium).click();  
 cy.get(pageObject.planAndPayment.plan).first().click();
  cy.get(pageObject.planAndPayment.checkOutWithPaddle).click();
}

// Helper function to generate random email
function generateRandomEmail() {
  const timestamp = new Date().getTime();
  return `user${timestamp}@example.com`;
}

describe('Annual Plan', function () {
  it('Automate the Flow for Purchasing Annual Subscription via Paddle', function () {
    navigateToCurieTabAndPurchasePlan('yearly');
    cy.fillPaymentDetails(testData);
  });
});
