import pageobject from "./pageObjectRubriq.json"
import testData from "../fixtures/testDataRubriq.json"
Cypress.Commands.add("uiLogin", (Email, Password) => {
    cy.intercept({
        url: 'api/auth/login',
        method: 'POST'
    }).as('login')
    cy.get(pageobject.login.email).type(Email,{delay:0})
    cy.get(pageobject.login.password).type(Password,{delay:0})
    cy.get(pageobject.login.submit).click()
    cy.wait('@login').its('response.statusCode').should('eq', 200)
})
Cypress.Commands.add('acceptCookies',() => {
  
  cy.get('body').then(($body) => {
    for(let i=0;i<20000;i++){
     var length= $body.find('button:contains("Allow all")').length 
     cy.log('loop')
     if(length>0){
      break
     }
    }
    if (length> 0) {
      cy.contains('Allow all').should('be.visible').click({ force: true });
    } else {
      cy.log('Cookie banner not found - proceeding');
    }
  });  
  
  })
  Cypress.Commands.add("userRegistration", (email, password, country) => { 
    // cy.intercept({
    //     method: 'POST',
    //     url: '/api/auth/register',
    // }).as('registration')

    cy.get(pageobject.login.registrationForm).children().get(pageobject.login.email).type(email,{delay:0})

    cy.get(pageobject.login.registrationForm).children().get(pageobject.login.firstName).type(testData.firstName,{delay:0})
    cy.get(pageobject.login.registrationForm).children().get(pageobject.login.lastName).type(testData.lastName,{delay:0})

    cy.get(pageobject.login.registrationForm).children().get(pageobject.login.password).type(password,{delay:0})

    cy.get('body').then(($body) => {
        if (Cypress.$('body').find('span[title="Country"]').is(':visible')){
          cy.chooseReactSelectOption('Country/Region',country)
        }
        
    })

   // cy.get(pageobject.login.registrationCheckBox).check()
    cy.get(pageobject.login.termsOfService).check({force:true})
    cy.get(pageobject.login.registerbtn).click()
   // cy.wait('@registration')
    cy.get(pageobject.tabNavigation.myAccount,{timeout:40000}).should('be.visible')
});
Cypress.Commands.add('customloginAndNavigateToRubriq', (email, password) => {
  cy.visit(Cypress.config('baseUrl'))
  cy.acceptCookies()
  cy.uiLogin(email,password)
  cy.get(pageobject.tabNavigation.myAccount).should('be.visible').click();
  cy.contains('Workspace').click({ force: true });
  cy.url().should('include', Cypress.config('baseUrl')+'/en/rubriq')

});
Cypress.Commands.add('addPreferredGroup', (group,email,password) => {
  cy.visit(Cypress.config('baseUrl'))
  cy.acceptCookies()
  cy.uiLogin(email,password)
  cy.get(pageobject.tabNavigation.myAccount).should('be.visible').click();
  cy.contains('My Plan').click({ force: true });
  cy.url().should('include', Cypress.config('baseUrl')+'en/rubriq/plan')
  cy.get(pageobject.editing.groupCode).should('be.visible').type(group,{delay:0})
  cy.get(pageobject.login.submit).click()
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
Cypress.Commands.add('getIframeBody', (iframeSelector) => {
    return cy
      .get(iframeSelector)
      .its('0.contentDocument.body') // Access the iframe's body
      .should('not.be.empty') // Ensure the body is loaded
      .then(cy.wrap); // Wrap the body so Cypress can interact with it
  });
  // In cypress/support/commands.js

  Cypress.Commands.add('fillPaymentDetails', (paymentData) => {
    cy.getIframeBody(pageobject.planAndPayment.paddleFrame, { timeout: 50000 })
      .find(pageobject.planAndPayment.postCode)
      .type(paymentData.postCodeData, { force: true });
  
    cy.getIframeBody(pageobject.planAndPayment.paddleFrame)
      .find(pageobject.planAndPayment.paddleSubmitBtn)
      .parents()
      .first()
      .invoke('css', 'overflow', 'visible')
      .then(() => {
        cy.getIframeBody(pageobject.planAndPayment.paddleFrame)
          .find(pageobject.planAndPayment.paddleSubmitBtn)
          .click({ force: true });
      });
  
    cy.getIframeBody(pageobject.planAndPayment.paddleFrame)
      .find(pageobject.planAndPayment.cardNumberObject)
      .should('be.visible')
      .type(paymentData.cardNumber, { force: true });
  
    cy.getIframeBody(pageobject.planAndPayment.paddleFrame)
      .find(pageobject.planAndPayment.cardHolderName)
      .should('be.visible')
      .type(paymentData.cardHolderNameData, { force: true });
  
    cy.getIframeBody(pageobject.planAndPayment.paddleFrame)
      .find(pageobject.planAndPayment.expDateObject)
      .should('be.visible')
      .type(paymentData.expiryDateData, { force: true });
  
    cy.getIframeBody(pageobject.planAndPayment.paddleFrame)
      .find(pageobject.planAndPayment.cvvObject)
      .should('be.visible')
      .type(paymentData.cvvData, { force: true });
  
    cy.getIframeBody(pageobject.planAndPayment.paddleFrame)
      .find(pageobject.planAndPayment.cardPaymentFormSubmitBtn)
      .parents()
      .first()
      .invoke('css', 'overflow', 'visible')
      .then(() => {
        cy.getIframeBody(pageobject.planAndPayment.paddleFrame)
          .find(pageobject.planAndPayment.cardPaymentFormSubmitBtn)
          .click({ force: true });
      });
});
Cypress.Commands.add('chooseReactSelectOption', (label, text) => {
  if (text) {
      cy
          .contains(label)
          .parent()
          .find(`input:first`)
          .type(`${text}`, {force: true, delay:100})
          cy.contains('div',text).should('be.visible').click({force:true})

  }
 
 
})
 
