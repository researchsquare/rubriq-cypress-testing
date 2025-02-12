import LoginPageObject from "./pageObjectCurie.json";
import loginTestData from "./testDataCurie.json";

// Helper function for filling out payment details in the iframe
function fillPaymentDetailsAndCancel() {
  cy.getIframeBody(LoginPageObject.paddleFrame, { timeout:50000 })
    .find(LoginPageObject.postCode)
    .type(loginTestData.postCodeData, { force: true });

  cy.getIframeBody(LoginPageObject.paddleFrame)
    .find(LoginPageObject.paddleSubmitBtn)
    .parents()
    .first()
    .invoke('css', 'overflow', 'visible')
    .then(() => {
      cy.getIframeBody(LoginPageObject.paddleFrame)
        .find(LoginPageObject.paddleSubmitBtn)
        .click({ force: true });
    });

  cy.getIframeBody(LoginPageObject.paddleFrame)
    .find('input#cardNumber')
    .should('be.visible')
    .type(loginTestData.cardNumber, { force: true });

  cy.getIframeBody(LoginPageObject.paddleFrame)
    .find(LoginPageObject.cardHolderName)
    .should('be.visible',{timeout:10000})
    .type(loginTestData.nameCardHolder, { force: true });

  cy.getIframeBody(LoginPageObject.paddleFrame)
    .find(LoginPageObject.expiryPageObject)
    .should('be.visible')
    .type(loginTestData.expDate, { force: true });

  cy.getIframeBody(LoginPageObject.paddleFrame)
    .find(LoginPageObject.cvvPageObject)
    .should('be.visible')
    .type(loginTestData.cvv, { force: true });

  cy.getIframeBody(LoginPageObject.paddleFrame)
    .find(LoginPageObject.cardPaymentFormSubmitBtn)
    .parents()
    .first()
    .invoke('css', 'overflow', 'visible')
    .then(() => {
      cy.getIframeBody(LoginPageObject.paddleFrame)
        .find(LoginPageObject.cardPaymentFormSubmitBtn)
        .click({ force: true });
    });
    cy.visit('https://secure-aje.staging.sqr.io/en/curie/plan')
    cy.get(LoginPageObject.cancelBtn).last().click()
    cy.getIframeBody(LoginPageObject.paddleFrame)
    .find(LoginPageObject.cancelPlan)
    .parents()
    .first()
    .invoke('css', 'overflow', 'visible')
    .then(() => {
      cy.getIframeBody(LoginPageObject.paddleFrame)
        .find(LoginPageObject.cancelPlan)
        .click({ force: true });
    });
    cy.get(LoginPageObject.cancelPopUpMessage).should('exist')

}

// Helper function for logging in and navigating through the website
function navigateToCurieTab() {
  cy.visit('https://secure-aje.staging.sqr.io');
  cy.get(LoginPageObject.regNewLink).should('be.visible').click();
  cy.userRegistration(generateRandomEmail(), generateRandomPassword(), 'United States'); // Adjust as necessary

  //cy.get(LoginPageObject.curieTab).click();
  cy.visit('https://secure-aje.staging.sqr.io/en/curie')
  cy.url().should('include', 'https://secure-aje.staging.sqr.io/en/curie');
  cy.get(LoginPageObject.curiePop, { timeout:1000 }).click();
  cy.get(LoginPageObject.editingTab).click();
  cy.url().should('include', 'https://secure-aje.staging.sqr.io/en/curie/editing');
  cy.get(LoginPageObject.checkDocumentEdit).click();
  cy.get(LoginPageObject.upgradeNow).click();
  cy.get(LoginPageObject.getPremium).click();
  cy.get(LoginPageObject.plan).last().click();
  cy.get(LoginPageObject.checkOutWithPaddle).click();
}

describe('Upgrade', function () {
  it(' perform payment and cancel plan ', function () {
    navigateToCurieTab();

    fillPaymentDetailsAndCancel();
  });
});

// Helper functions for generating random data
function generateRandomEmail() {
  const timestamp = new Date().getTime();
  return `user${timestamp}@example.com`;
}

function generateRandomPassword() {
  return `P@ssw0rd${Math.floor(Math.random() * 10000)}`;
}
