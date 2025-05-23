/// <reference types="cypress" />
let testData; // define outside so we can use it in beforeEach or inside cy.session
import pageobject from '../../../support/pageObjectRubriq.json';
// Goes up 3 levels: cypress/e2e/rubriq → cypress/e2e → cypress → project root
before(() => {
  cy.fixture('testDataRubriq').then((data) => {
    testData = data;
  });
});
// Generate a random email address
function generateRandomEmail() {
  const timestamp = new Date().getTime();
  return `user${timestamp}@test.aje.com`;
}

// Generate a random password
function generateRandomPassword() {
  return `P@ssw0rd${Math.floor(Math.random() * 10000)}`;
}
// This function returns the current date in the format "Month Day, Year"
function getTrailEndDate() {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const date = new Date();
  date.setDate(date.getDate() + 7);
  return date.toLocaleDateString('en-US', options);
}
function updateTestDataMonthly(filePath, email, password) {
  // 1. First try to read the file (will fail if it doesn't exist)
  cy.readFile(filePath)
    .then((existingData) => {
      // 2. Modify the data
      const updatedData = {
        ...existingData, // Keep existing data
        rubriqLoginEmailPremiumWithTranslationMonthly: email, // Update email
        rubriqLoginPasswordPremiumWithTranslationMonthly: password // Update password
      };

      // 3. Write back the updated content
      return cy.writeFile(filePath, updatedData);
    })
    .then(() => {
      cy.log('Successfully updated the file');
    })
}
function updateTestDataYearly(filePath, email, password) {
  // 1. First try to read the file (will fail if it doesn't exist)
  cy.readFile(filePath)
    .then((existingData) => {
      // 2. Modify the data
      const updatedData = {
        ...existingData, // Keep existing data
        rubriqLoginEmailPremiumWithTranslationYearly: email, // Update email
        rubriqLoginPasswordPremiumWithTranslationYearly: password // Update password
      };

      // 3. Write back the updated content
      return cy.writeFile(filePath, updatedData);
    })
    .then(() => {
      cy.log('Successfully updated the file');
    })
}
describe('Upgrade Rubriq Premium with Translation', function () {
  it('Upgrade rubriq premium with Translation via paddle billing - Monthly', function () {
    const email = generateRandomEmail();
    const password = generateRandomPassword();
    const country = 'United States'; // Specify your country here
    cy.visit(Cypress.config('baseUrl'))
    cy.get(pageobject.login.regNewLink)
      .should('be.visible') // Assert that the element is visible
      .click();
    cy.acceptCookies()
    cy.userRegistration(email, password, country);
    const filePath = 'cypress/fixtures/testDataRubriq.json';
    updateTestDataMonthly(filePath, email, password)
    cy.get(pageobject.tabNavigation.myAccount).should('be.visible').click();
    cy.contains('Workspace').click({ force: true });
    cy.url().should('include', Cypress.config('baseUrl') + '/en/rubriq')
    cy.get(pageobject.tabNavigation.Gotit).click();
    cy.get(pageobject.tabNavigation.editingTab).click();
    cy.url().should('include', Cypress.config('baseUrl') + '/en/rubriq/editing')
    cy.get(pageobject.editing.checkDocumentEdit).click()
    cy.get(pageobject.editing.upgradeNow).click()
    cy.get(pageobject.planAndPayment.getPremiumWithTranslation)
      .parent()
      .parent()
      .siblings()
      .find('[title="curie.get-starter"]')
      .click();
    cy.get(pageobject.planAndPayment.checkOutWithPaddle).should('be.visible').click({ force: true })
    cy.paymentThroughApi(email,password,testData.premium_including_translation_Monthly)
    cy.get(pageobject.tabNavigation.myAccount).should('be.visible').click();
    cy.contains('Log out').click({ force: true });
    cy.uiLogin(email,password)
    cy.get(pageobject.tabNavigation.myAccount).should('be.visible').click()
    cy.contains('My Plan').click({ force: true });
    cy.contains('Rubriq Premium with Translation').should('be.visible')
    cy.contains('$21').should('be.visible')
    cy.contains('month').should('be.visible')
    cy.contains("Payment Set to start on " + getTrailEndDate()).should('be.visible')
  });
  it('Upgrade rubriq premium with Translation via paddle billing - Yearly', function () {
    const email = generateRandomEmail();
    const password = generateRandomPassword();
    const country = 'United States'; // Specify your country here
    cy.visit(Cypress.config('baseUrl'))
    cy.get(pageobject.login.regNewLink)
      .should('be.visible') // Assert that the element is visible
      .click();
    cy.acceptCookies()
    cy.userRegistration(email, password, country);
    const filePath = 'cypress/fixtures/testDataRubriq.json';
    updateTestDataYearly(filePath, email, password)
    cy.get(pageobject.tabNavigation.myAccount).should('be.visible').click();
    cy.contains('Workspace').click({ force: true });
    cy.url().should('include', Cypress.config('baseUrl') + '/en/rubriq')
    cy.get(pageobject.tabNavigation.Gotit).click();
    cy.get(pageobject.tabNavigation.editingTab).click();
    cy.url().should('include', Cypress.config('baseUrl') + '/en/rubriq/editing')
    cy.get(pageobject.editing.checkDocumentEdit).click()
    cy.get(pageobject.editing.upgradeNow).click()
    cy.get(pageobject.planAndPayment.getPremiumWithTranslation)
      .parent()
      .parent()
      .siblings()
      .find('[title="curie.get-starter"]')
      .click();
    cy.get(pageobject.planAndPayment.checkOutWithPaddle).should('be.visible').click({ force: true })
    cy.paymentThroughApi(email,password, testData.premium_including_translation_Yearly)
    cy.get(pageobject.tabNavigation.myAccount).should('be.visible').click();
    cy.contains('Log out').click({ force: true });
    cy.uiLogin(email, password)
    cy.get(pageobject.tabNavigation.myAccount).should('be.visible').click()
    cy.contains('My Plan').click({ force: true });
    cy.contains('Rubriq Premium with Translation').should('be.visible')
    cy.contains('$198').should('be.visible')
    cy.contains('year').should('be.visible')
    cy.contains("Payment Set to start on " + getTrailEndDate()).should('be.visible')
  });
});


