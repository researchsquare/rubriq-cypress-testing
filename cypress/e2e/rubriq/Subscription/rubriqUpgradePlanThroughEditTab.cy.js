import LoginPageObject from "../../../support/pageObjectRubriq.json";
import loginTestData from "../../../support/pageObjectRubriq.json";

const{
   rubriqUpgradeEmail,
    rubriqUpgradePassword,
    zipcodeData,
    countryData,
    cardNumber,
    nameCardHolder,
    expDate,
    cvv
} = loginTestData;

const{
    email,
    password,
    submit,
    rubriqTab,
    abstractTab,
    translateTab, 
    editingTab,
    checkDocumentEdit,
    upgradeNow,
    getPremium,
    checkOutWithPaddle,
    zipCode,
    paymentEmail,
    countryPayment,
    paymentContinue,
    cardNumberObject,
    cardHolderName,
    expDateObject,
    cvvObject,
    subscribeBtn
} = LoginPageObject;
 
 
describe('Upgrade', function () {
    it('navigate to rubriq Tab', function() {
        cy.visit(Cypress.config('baseUrl'))
        cy.acceptCookies()
        cy.uiLogin( rubriqUpgradeEmail, rubriqUpgradePassword )
   // cy.url().should('include', '/home')
    cy.get(rubriqTab).click();
    cy.url().should('include', Cypress.config('baseUrl')+'/en/rubriq')
    cy.get(editingTab).click();
    cy.url().should('include', Cypress.config('baseUrl')+'/en/rubriq/editing')
    cy.get(checkDocumentEdit).click()
    cy.get(upgradeNow).click()
    cy.get(getPremium).click()
    cy.get(checkOutWithPaddle).click()
    cy.wait(10000)
    //cy.get(paymentEmail).should('have.value', rubriqUpgradeEmail);
    //cy.get(countryPayment).should('have.value', countryData);
    cy.get(zipCode).type(zipcodeData)
    cy.get(paymentContinue).click()
    cy.get(cardNumberObject).type(cardNumber)
    cy.get(cardHolderName).type(nameCardHolder)
    cy.get(expDateObject).type(expDate)
    cy.get(cvvObject).type(cvv)
    cy.get(subscribeBtn).click()
  });
});


     