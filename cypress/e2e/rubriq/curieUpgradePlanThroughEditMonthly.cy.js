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
    plan,
    paymentEmail,
    countryPayment,
    paymentContinue,
    cardNumberObject,
    cardHolderName,
    expDateObject,
    cvvObject,
    subscribeBtn,
    curiePop,
    regNewLink
} = LoginPageObject;
// Generate a random email address
function generateRandomEmail() {
    const timestamp = new Date().getTime();
    return `user${timestamp}@example.com`;
}

// Generate a random password
function generateRandomPassword() {
    return `P@ssw0rd${Math.floor(Math.random() * 10000)}`;
}

describe('Upgrade', function () {
    it('navigate to Curie Tab', function() {
        const email = generateRandomEmail();
        const password = generateRandomPassword();
        const country = 'United States'; // Specify your country here
        cy.visit('https://secure-aje.staging.sqr.io')
        cy.get(regNewLink).should('be.visible') .click()

        cy.userRegistration(email, password, country)
 
 

        cy.visit('https://secure-aje.staging.sqr.io')
        cy.acceptCookies()
        cy.uiLogin( email, password )
    cy.url().should('include', '/home')
    cy.get(curieTab).click();
    cy.url().should('include', 'https://secure-aje.staging.sqr.io/en/curie')
    cy.get(curiePop).click()
    cy.get(editingTab).click();
    cy.url().should('include', 'https://secure-aje.staging.sqr.io/en/curie/editing')
    cy.get(checkDocumentEdit).click()
    cy.get(upgradeNow).click()
    cy.get(getPremium).click()
    cy.get(plan).last().click();

    cy.get(checkOutWithPaddle).click()
    cy.wait(10000)
    //cy.get('[data-testid="authenticationEmailInput"]').should('have.value', email );
   // cy.get(countryPayment).should('have.value', countryData);
    cy.get(zipCode).type(zipcodeData)
    cy.get(paymentContinue).click()
    cy.get(cardNumberObject).type(cardNumber)
    cy.get(cardHolderName).type(nameCardHolder)
    cy.get(expDateObject).type(expDate)
    cy.get(cvvObject).type(cvv)
    cy.get(subscribeBtn).click()
  });
});


     