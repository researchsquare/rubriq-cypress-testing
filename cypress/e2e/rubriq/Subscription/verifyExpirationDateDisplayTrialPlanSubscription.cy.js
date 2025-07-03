// In your test file

import LoginPageObject from "./pageObjectCurie.json";
import loginTestData from "./testDataCurie.json";

// Helper function to perform registration and navigate to the relevant page
function navigateToRubriqTabAndPurchasePlan(planType) {
  cy.visit(Cypress.config('baseUrl'));
  cy.get(LoginPageObject.login.regNewLink).should('be.visible').click();
  cy.userRegistration(generateRandomEmail(), loginTestData.curieLoginPasswordActive, 'United States');  // Use static password

  // Go to the Rubriq page
  cy.visit(Cypress.config('baseUrl')+'/en/rubriq');
  cy.url().should('include', Cypress.config('baseUrl')+'/en/rubriq');

  cy.get(LoginPageObject.tabNavigation.curiePop).click();
  cy.get(LoginPageObject.tabNavigation.editingTab).click();
  cy.url().should('include', Cypress.config('baseUrl')+'/en/rubriq/editing');

  cy.get(LoginPageObject.editing.checkDocumentEdit).click();
  cy.get(LoginPageObject.editing.upgradeNow).click();
  cy.get(LoginPageObject.planAndPayment.getPremium).click();

  if (planType === 'monthly') {
    cy.get(LoginPageObject.planAndPayment.plan).last().click();
  } else if (planType === 'yearly') {
    cy.get(LoginPageObject.planAndPayment.plan).first().click();
  }

  cy.get(LoginPageObject.planAndPayment.checkOutWithPaddle).click();
}

// Helper function to generate random email
function generateRandomEmail() {
  const timestamp = new Date().getTime();
  return `user${timestamp}@example.com`;
}

// Utility function to get a date 1 month from now
function getExpirationDateMonth() {
  const currentDate = new Date();
  currentDate.setMonth(currentDate.getMonth() + 1);
  const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(currentDate);
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();
  return `Set to auto-renew on ${month} ${day}, ${year}`;
}

// Utility function to get a date 1 year from now
function getExpirationDateYear() {
  const currentDate = new Date();
  currentDate.setFullYear(currentDate.getFullYear() + 1);
  const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(currentDate);
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();
  return `Set to auto-renew on ${month} ${day}, ${year}`;
}

describe('Expiration Date Validation', function () {
  it('should verify expiration date for Monthly Plan', function () {
    navigateToRubriqTabAndPurchasePlan('monthly');
    
    // Use the custom command to fill payment details
    cy.fillPaymentDetails(loginTestData);

    cy.visit(Cypress.config('baseUrl')+'/en/rubriq/plan');
    cy.get(LoginPageObject.planAndPayment.displayedDate)
      .should('have.text', getExpirationDateMonth());
  });

  it('should verify expiration date for Yearly Plan', function () {
    navigateToRubriqTabAndPurchasePlan('yearly');
    
    // Use the custom command to fill payment details
    cy.fillPaymentDetails(loginTestData);

    cy.visit(Cypress.config('baseUrl')+'/en/rubriq/plan');
    cy.get(LoginPageObject.planAndPayment.displayedDate)
      .should('have.text', getExpirationDateYear());
  });
});
