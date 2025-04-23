import LoginPageObject from "./pageObjectRubriq.json"
import loginTestData from "./testDataRubriq.json"
function generateRandomEmail() {
    const timestamp = new Date().getTime();
    return `user${timestamp}@example.com`;
}

describe('Upload Document- Active plan/ Non Active plan, and also validate error message', function () {
    it('Checkout Document(American English) in editing tab , If the user have already active plan', function() {
        cy.visit('https://secure-aje.staging.sqr.io')
        cy.acceptCookies()
        cy.uiLogin( loginTestData.rubriqLoginEmailActive, loginTestData.rubriqLoginPasswordActive )
        cy.get(LoginPageObject.tabNavigation.myAccount).should('be.visible').click()
        cy.contains('Workspace').click({force:true})
        cy.url().should('include', 'https://secure-aje.staging.sqr.io/en/rubriq')
        cy.wait(5000)
        cy.get(LoginPageObject.editing.checkDocumentEdit).click()
        cy.get(LoginPageObject.editing.fileUpload,{timeout:10000}).click()
        cy.uploadFile('aje_ai_and_ml.docx')
        cy.get(LoginPageObject.tabNavigation.ctnBtn).click()
        cy.get(LoginPageObject.editing.styleOfEngAE).first().click()
        cy.get(LoginPageObject.editing.strBtn).click()
        cy.get(LoginPageObject.editing.getProfEditing).should('exist')
    })
    // it('Checkout Document (Britan English) in editing tab , If the user have already active plan', function() {
    //     cy.visit('https://secure-aje.staging.sqr.io')
    //     cy.acceptCookies()
    //     cy.uiLogin( loginTestData.rubriqLoginEmailActive, loginTestData.rubriqLoginPasswordActive )
    //     cy.url().should('include', '/home')
    //     cy.get(LoginPageObject.rubriqTab).click()
    //     cy.url().should('include', 'https://secure-aje.staging.sqr.io/en/rubriq')
    //     cy.get(LoginPageObject.checkDocumentEdit).click()
    //     cy.get(LoginPageObject.fileUpload).click()
    //     cy.uploadFile('rsnas_virology.docx')
    //     cy.get(LoginPageObject.ctnBtn).click()
    //     cy.get(LoginPageObject.styleOfEngBE).last().click()
    //     cy.get(LoginPageObject.strBtn).click()
    //     cy.get(LoginPageObject.getProfEditing).should('exist')
    // })
    // it('Verify the error message when the user did not have active plan', function() {
    //     const email = generateRandomEmail()
    //     const country = 'United States' // Specify your country here
    //     cy.visit('https://secure-aje.staging.sqr.io')
    //     cy.get(LoginPageObject.regNewLink).should('be.visible') .click()

    //     cy.userRegistration(email, loginTestData.rubriqLoginPasswordActive, country)

    //     cy.acceptCookies()
        
    //     cy.url().should('include', '/home')
    //     cy.get(LoginPageObject.rubriqTab).click()
    //     cy.url().should('include', 'https://secure-aje.staging.sqr.io/en/rubriq')
    //     cy.get(LoginPageObject.gotItBtn).click()
    //     cy.get(LoginPageObject.checkDocumentEdit).click()
    //     cy.get(LoginPageObject.noPlanContentBox).contains(loginTestData.noPlan).should('be.visible')

    // })
    // it('Verify the error message, when the click continue button before upload doc', function() {
    //     cy.visit('https://secure-aje.staging.sqr.io')
    //     cy.acceptCookies()
    //     cy.uiLogin( loginTestData.rubriqLoginEmailActive, loginTestData.rubriqLoginPasswordActive )
    //     cy.url().should('include', '/home')
    //     cy.get(LoginPageObject.rubriqTab).click()
    //     cy.url().should('include', 'https://secure-aje.staging.sqr.io/en/rubriq')
    //     cy.get(LoginPageObject.checkDocumentEdit).click()
    //     cy.get(LoginPageObject.fileUpload).click()
    //     cy.get(LoginPageObject.ctnBtn).click()
    //     cy.get(LoginPageObject.errorUploadFile).contains(loginTestData.errorMsgUploadFile).should('be.visible')
    // })
})