import pageobject from "../../cypress/e2e/rubriq/pageObjectRubriq.json"
Cypress.Commands.add("uiLogin", (Email, Password) => {
    cy.intercept({
        url: 'api/auth/login',
        method: 'POST'
    }).as('login')
    cy.get(pageobject.login.email).type(Email,{ delay: 0 })
    cy.get(pageobject.login.password).type(Password,{delay:0})
    cy.get(pageobject.login.submit).click()
    cy.wait('@login').its('response.statusCode').should('eq', 200)
})

Cypress.Commands.add('acceptCookies', () => {
       cy.contains('Allow all').should('be.visible').click({force:true})   
  })
  Cypress.Commands.add("userRegistration", (email, password, country) => { 
    cy.intercept({
        method: 'POST',
        url: '/api/auth/register',
    }).as('registration')

    cy.get(pageobjectRubriq.loginPage.registrationForm).children().get(pageobject.loginPage.emailTf).type(email)

    cy.get(pageobject.loginPage.registrationForm).children().get(pageobject.loginPage.firstName).typeRandom(CustomerData.firstName)
    cy.get(pageobject.loginPage.registrationForm).children().get(pageobject.loginPage.lastName).type(CustomerData.lastName)

    cy.get(pageobject.loginPage.registrationForm).children().get(pageobject.loginPage.passwordTf).type(password)

    cy.get('body').then(($body) => {
        if (Cypress.$('body').find('span[title="Country"]').is(':visible'))
        cy.chooseReactSelectOption('Country/Region', country)
    })

    cy.get(pageobject.loginPage.registrationCheckBox).check()
    cy.get(pageobject.loginPage.termsOfService).check()
    cy.get(pageobject.loginPage.registrationForm).submit()
    cy.wait('@registration')
});
Cypress.Commands.add('uploadFile', (fileName, fileType = 'text/plain') => {
    cy.fixture(fileName, 'base64').then((fileContent) => {
      cy.get('input[type="file', {timeout: 10000}).then((input) => {
        const blob = Cypress.Blob.base64StringToBlob(fileContent, fileType)
        const dataTransfer = new DataTransfer()
        const file = new File([blob], fileName, { type: fileType })
        dataTransfer.items.add(file)
        input[0].files = dataTransfer.files
        cy.wrap(input).trigger('change', { force: true })
      })
    })
  })
 // Combined custom command to log in and navigate to the Curie tab
Cypress.Commands.add('loginAndNavigateToRubiq', (email, password) => {
    cy.visit('https://secure-aje.staging.sqr.io');
    cy.get(curiePageObject.email).type(email);
    cy.get(curiePageObject.password).type(password);
    cy.get(curiePageObject.submit).click();
    cy.url().should('include', '/home/');
    cy.get(curiePageObject.myAccountBtn).click()
    cy.get('a.nav-link.myAccountLinks.trackable-link')
  .should('have.attr', 'href', '/en/rubriq')
  .click();
   cy.url().should('include', '/en/rubriq');

});
Cypress.Commands.add('getIframeBody', (iframeSelector) => {
    return cy
      .get(iframeSelector)
      .its('0.contentDocument.body') // Access the iframe's body
      .should('not.be.empty') // Ensure the body is loaded
      .then(cy.wrap); // Wrap the body so Cypress can interact with it
  });
  // In cypress/support/commands.js

  Cypress.Commands.add('fillPaymentDetails', (paymentData) => {
    cy.getIframeBody(curiePageObject.planAndPayment.paddleFrame, { timeout: 50000 })
      .find(curiePageObject.planAndPayment.postCode)
      .type(paymentData.postCodeData, { force: true });
  
    cy.getIframeBody(curiePageObject.planAndPayment.paddleFrame)
      .find(curiePageObject.planAndPayment.paddleSubmitBtn)
      .parents()
      .first()
      .invoke('css', 'overflow', 'visible')
      .then(() => {
        cy.getIframeBody(curiePageObject.planAndPayment.paddleFrame)
          .find(curiePageObject.planAndPayment.paddleSubmitBtn)
          .click({ force: true });
      });
  
    cy.getIframeBody(curiePageObject.planAndPayment.paddleFrame)
      .find(curiePageObject.planAndPayment.cardNumberObject)
      .should('be.visible')
      .type(paymentData.cardNumber, { force: true });
  
    cy.getIframeBody(curiePageObject.planAndPayment.paddleFrame)
      .find(curiePageObject.planAndPayment.cardHolderName)
      .should('be.visible')
      .type(paymentData.cardHolderNameData, { force: true });
  
    cy.getIframeBody(curiePageObject.planAndPayment.paddleFrame)
      .find(curiePageObject.planAndPayment.expDateObject)
      .should('be.visible')
      .type(paymentData.expiryDateData, { force: true });
  
    cy.getIframeBody(curiePageObject.planAndPayment.paddleFrame)
      .find(curiePageObject.planAndPayment.cvvObject)
      .should('be.visible')
      .type(paymentData.cvvData, { force: true });
  
    cy.getIframeBody(curiePageObject.planAndPayment.paddleFrame)
      .find(curiePageObject.planAndPayment.cardPaymentFormSubmitBtn)
      .parents()
      .first()
      .invoke('css', 'overflow', 'visible')
      .then(() => {
        cy.getIframeBody(curiePageObject.planAndPayment.paddleFrame)
          .find(curiePageObject.planAndPayment.cardPaymentFormSubmitBtn)
          .click({ force: true });
      });
});