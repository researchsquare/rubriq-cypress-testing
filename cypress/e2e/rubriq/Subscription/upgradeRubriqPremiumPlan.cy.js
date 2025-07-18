///<reference types="cypress" />
import testData from '../../../fixtures/testDataRubriq.json'; // Import test data from fixture
import pageobject from '../../../support/pageObjectRubriq.json';
// Goes up 3 levels: cypress/e2e/rubriq → cypress/e2e → cypress → project root
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
  const date = new Date();
  date.setDate(date.getDate() + 7);
  const year = date.getFullYear();
  const month = date.toLocaleString('en-US', { month: 'long' });
  const day = String(date.getDate()).padStart(2, '0'); // Ensure two digits
  return `${month} ${day}, ${year}`;
}

const testCases = [
  {
    planType: 'Rubriq Premium',
    planDuration: 'Monthly', // "Monthly" or "Yearly"
    priceText: '$16', // "$21" or "$198"
    durationText: 'month',// "month" or "year"
    priceId: testData.premium_editing_only_Monthly, // "premium_including_translation_Monthly" or "premium_including_translation_Yearly"
    updateType: function (filePath, email, password) {
      // 1. First try to read the file (will fail if it doesn't exist)
      cy.readFile(filePath)
        .then((existingData) => {
          // 2. Modify the data
          const updatedData = {
            ...existingData, // Keep existing data
            rubriqLoginEmailPremiumMonthly: email, // Update email
            rubriqLoginPasswordPremiumMonthly: password // Update password
          };

          // 3. Write back the updated content
          return cy.writeFile(filePath, updatedData);
        })
        .then(() => {
          cy.log('Successfully updated the file');
        })
    }// "Monthly" or "Yearly"
  },
  {
    planType: 'Rubriq Premium',
    planDuration: 'Yearly', // "Monthly" or "Yearly"
    priceText: '$135', // "$21" or "$198"
    durationText: 'year',// "month" or "year"
    priceId: testData.premium_editing_only_Yearly, // "premium_including_translation_Monthly" or "premium_including_translation_Yearly"
    updateType: function (filePath, email, password) {
      // 1. First try to read the file (will fail if it doesn't exist)
      cy.readFile(filePath)
        .then((existingData) => {
          // 2. Modify the data
          const updatedData = {
            ...existingData, // Keep existing data
            rubriqLoginEmailPremiumYearly: email, // Update email
            rubriqLoginPasswordPremiumYearly: password // Update password
          };

          // 3. Write back the updated content
          return cy.writeFile(filePath, updatedData);
        })
        .then(() => {
          cy.log('Successfully updated the file');
        })
    } // "Monthly" or "Yearly"
  },
  {
    planType: 'Rubriq Premium with Translation',
    planDuration: 'Monthly', // "Monthly" or "Yearly"
    priceText: '$21', // "$21" or "$198"
    durationText: 'month',// "month" or "year"
    priceId: testData.premium_including_translation_Monthly, // "premium_including_translation_Monthly" or "premium_including_translation_Yearly"
    updateType: function (filePath, email, password) {
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
    } // "Monthly" or "Yearly"
  },
  {
    planType: 'Rubriq Premium with Translation',
    planDuration: 'Yearly', // "Monthly" or "Yearly"
    priceText: '$198', // "$21" or "$198"
    durationText: 'year',// "month" or "year"
    priceId: testData.premium_including_translation_Yearly, // "premium_including_translation_Monthly" or "premium_including_translation_Yearly"
    updateType: function (filePath, email, password) {
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
    } // "Monthly" or "Yearly"
  }
];
describe('Upgrade Rubriq Premium', function () {
  testCases.forEach(({ planType, planDuration, priceText, durationText, priceId, updateType }) => {
    it(`Upgrade ${planType} via paddle billing - ${planDuration}`, function () {
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
      updateType(filePath, email, password)
      cy.get(pageobject.tabNavigation.myAccount).should('be.visible').click();
      cy.contains('Workspace').click({ force: true });
      cy.url().should('include', Cypress.config('baseUrl') + '/en/rubriq')
      cy.get(pageobject.tabNavigation.Gotit).click();
      cy.get(pageobject.tabNavigation.editingTab).click();
      cy.url().should('include', Cypress.config('baseUrl') + '/en/rubriq/editing')
      cy.get(pageobject.editing.checkDocumentEdit).click()
      cy.get(pageobject.editing.upgradeNow).click()
      cy.get(pageobject.planAndPayment.getPremium)
        .parent()
        .parent()
        .siblings()
        .find('[title="curie.get-starter"]')
        .click();
      cy.get(pageobject.planAndPayment.checkOutWithPaddle).should('be.visible')
      cy.paymentThroughApi(email, password, priceId)
      cy.get(pageobject.tabNavigation.myAccount).should('be.visible').click();
      cy.contains('Log out').click({ force: true });
      cy.reload(true)
      cy.uiLogin(email, password)
      cy.get(pageobject.tabNavigation.myAccount).should('be.visible').click()
      cy.contains('My Plan').click({ force: true })
      cy.contains(planType).should('be.visible')
      cy.contains(priceText).should('be.visible')
      cy.contains(durationText).should('be.visible')
      cy.contains("Payment Set to start on " + getTrailEndDate()).should('be.visible')
    });
  })
});


