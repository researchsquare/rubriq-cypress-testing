import LoginPageObject from "./pageObjectCurie.json";
import loginTestData from "./testDataCurie.json";

const{
   curieUpgradeEmail,
    curieUpgradePassword,
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
    curieTab,
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
    it('navigate to Curie Tab', function() {
        cy.visit('https://secure-aje.staging.sqr.io')
        cy.acceptCookies()
        cy.uiLogin( curieUpgradeEmail, curieUpgradePassword )
    cy.url().should('include', '/home')
    cy.get(curieTab).click();
    cy.url().should('include', 'https://secure-aje.staging.sqr.io/en/curie')
    cy.get(editingTab).click();
    cy.url().should('include', 'https://secure-aje.staging.sqr.io/en/curie/editing')
    cy.get(checkDocumentEdit).click()
    cy.get(upgradeNow).click()
    cy.get(getPremium).click()
    cy.get(checkOutWithPaddle).click()
    cy.wait(10000)
    //cy.get(paymentEmail).should('have.value', curieUpgradeEmail);
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


     