import pageobject from "../../e2e/rubriq/pageObjectRubriq.json"
let testData; // define outside so we can use it in beforeEach or inside cy.session

before(() => {
  cy.fixture('testDataRubriq').then((data) => {
    testData = data;
    
  });
});
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
    it('navigate to rubriq Tab', function() {
        // const email = generateRandomEmail();
        // const password = generateRandomPassword();
        // const country = 'United States'; // Specify your country here
        // cy.visit('https://secure-aje.staging.sqr.io')
        // cy.get(regNewLink).should('be.visible') .click()

        // cy.userRegistration(email, password, country)
 
 

        // cy.visit('https://secure-aje.staging.sqr.io')
        // cy.acceptCookies()
    cy.visit('https://secure-aje.staging.sqr.io')
    cy.acceptCookies();
    cy.uiLogin( testData.rubriqLoginEmail,testData.rubriqLoginPassword )
    cy.get(pageobject.tabNavigation.myAccount).should('be.visible').click();
   // cy.url().should('include','/home')
    cy.contains('Workspace').click({ force: true });
   // cy.get(rubriqTab).click();
    cy.url().should('include', 'https://secure-aje.staging.sqr.io/en/rubriq')
    //cy.get(rubriqPop).click()
    cy.get(pageobject.tabNavigation.editingTab).click();
    cy.url().should('include', 'https://secure-aje.staging.sqr.io/en/rubriq/editing')
    cy.get(pageobject.editing.checkDocumentEdit).click()
    cy.get(pageobject.editing.upgradeNow).click()
    cy.get(pageobject.planAndPayment.getPremium)
  .parent()
  .parent()
  .siblings()
  .find('[title="curie.get-starter"]')
  .click();
    //cy.get(pageobject.planAndPayment.plan).last().click();
    cy.intercept('POST', 'https://sandbox-checkout-service.paddle.com/transaction-checkout', {
      statusCode: 200}).as('paddleCheckout');
   cy.get(pageobject.planAndPayment.checkOutWithPaddle).should('be.visible').click({force:true})
    cy.wait('@paddleCheckout')
    //cy.get('[data-testid="authenticationEmailInput"]').should('have.value', email );
   // cy.get(countryPayment).should('have.value', countryData);
    cy.get(pageobject.planAndPayment.zipCode).type(testData.zipcodeData)
    cy.get(pageobject.planAndPayment.paymentContinue).click()
    cy.get(pageobject.planAndPayment.cardNumberObject).type(testData.cardNumber)
    cy.get(pageobject.planAndPayment.cardHolderName).type(testData.nameCardHolder)
    cy.get(pageobject.planAndPayment.expDateObject).type(testData.expDate)
    cy.get(pageobject.planAndPayment.cvvObject).type(testData.cvv)
    cy.get(pageobject.planAndPayment.subscribeBtn).click()
  });
});


     