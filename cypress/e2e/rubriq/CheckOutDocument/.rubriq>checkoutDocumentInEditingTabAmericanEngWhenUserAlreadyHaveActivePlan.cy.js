import pageObject from "../../../support/pageObjectRubriq.json"
import TestData from "../../../fixtures/testDataRubriq.json"
function generateRandomEmail() {
    const timestamp = new Date().getTime();
    return `user${timestamp}@example.com`;
}
// Function to upload a document
const uploadDocument = () => {
    cy.get(pageObject.editing.checkDocumentEdit).should('be.visible').click();
    cy.get(pageObject.editing.fileUpload,{timeout: 10000}).click();
    cy.uploadFile('aje_ai_and_ml.docx'); // Ensure the file exists in the appropriate location
    cy.contains('Upload complete').should('be.visible')
    cy.get(pageObject.tabNavigation.ctnBtn).parent({timeout:10000}).click();
};

describe('Upload Document- Active plan/ Non Active plan, and also validate error message', function () {
    it('Checkout Document(American English) in editing tab , If the user have already active plan', function() {
        cy.addPreferredGroup(TestData.groupCode,TestData.rubriqLoginEmail, TestData.rubriqLoginPassword)
        cy.get(pageObject.tabNavigation.myAccount).should('be.visible').click();
  cy.contains('Workspace').click({ force: true });
  cy.url().should('include', Cypress.config('baseUrl')+'/en/rubriq')
      // new email is used
       cy.get(pageObject.editing.gotItBtn).click()
       uploadDocument();
        cy.get(pageObject.editing.styleOfEngAE).click().should('be.checked')
        cy.get(pageObject.editing.strBtn).click()
        cy.get(pageObject.editing.getProfEditing).should('exist')
    })
    it('Checkout Document (Britan English) in editing tab , If the user have already active plan', function() {
        cy.customloginAndNavigateToRubriq(TestData.rubriqLoginEmail, TestData.rubriqLoginPassword);
        uploadDocument();
        cy.get(pageObject.editing.styleOfEngBE).click().should('be.checked')
        cy.get(pageObject.editing.strBtn).click()
        cy.get(pageObject.editing.getProfEditing).should('exist')
    })
    it('Verify the error message when the user did not have active plan', function() {
        const email = generateRandomEmail()
        const country = 'United States' // Specify your country here
        cy.visit('https://secure-aje.staging.sqr.io')
        cy.get(pageObject.login.regNewLink).should('be.visible') .click()
        cy.userRegistration(email, TestData.rubriqLoginPasswordActive, country)
        cy.acceptCookies()
        cy.url().should('include', '/home')
        cy.get(pageObject.tabNavigation.rubriqTab).first().click({force:true})
        cy.url().should('include', 'https://secure-aje.staging.sqr.io/en/rubriq')
        cy.get(pageObject.editing.gotItBtn).click()
        cy.get(pageObject.editing.checkDocumentEdit).click()
        cy.get(pageObject.editing.noPlanContentBox).contains(TestData.noPlan).should('be.visible')

    })
    it('Verify the error message, when the click continue button before upload doc', function() {
        cy.customloginAndNavigateToRubriq(TestData.rubriqLoginEmail, TestData.rubriqLoginPassword);
        cy.get(pageObject.editing.checkDocumentEdit).click()
        cy.get(pageObject.editing.fileUpload).click()
        cy.get(pageObject.editing.ctnBtn).click()
        cy.get(pageObject.editing.errorUploadFile).contains(TestData.errorMsgUploadFile).should('be.visible')
    })
})