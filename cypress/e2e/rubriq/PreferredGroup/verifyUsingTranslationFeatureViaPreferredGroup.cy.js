import pageObject from "../../../support/pageObjectRubriq.json";
import testData from "../../../fixtures/testDataRubriq.json";
function generateRandomEmail() {
    const timestamp = new Date().getTime();
    return `user${timestamp}@example.com`;
}
const testCases = [
    {
      language: 'Chinese',
      languageSelector: pageObject.translate.chineseLang,
      email: testData.rubriqLoginEmail,
      password: testData.rubriqLoginPassword,
    },
    {
      language: 'Spanish',
      languageSelector: pageObject.spanishLang,
      email: testData.rubriqLoginEmail,
      password: testData.rubriqLoginPassword,
    },
    {
      language: 'Portuguese',
      languageSelector: pageObject.portugueseLang,
      email: testData.rubriqLoginEmail,
      password: testData.rubriqLoginPassword,
    }
  ];

describe('Upload Document- Active plan/ Non Active plan, and also validate error message-Translate Tab', function () {
  testCases.forEach(({ language, languageSelector, email, password }) => {
    it(`Translate Document to ${language} if the user has an active plan`, function () {
      cy.customloginAndNavigateToRubriq(testData.rubriqPreferredGroupEmail, testData.rubriqPreferredGroupPassword);
      cy.get(pageObject.tabNavigation.translateTab).click();
      cy.get(pageObject.translate.translateDoc).click();
      cy.get(pageObject.editing.fileUpload).click();
      cy.uploadFile('aje_ai_and_ml.docx');
      cy.contains('Upload complete').should('be.visible')
      cy.get(pageObject.tabNavigation.ctnBtn).click({ force: true });
      cy.get(languageSelector).click();
      cy.get(pageObject.editing.strBtn).click();
      cy.get(pageObject.translate.dataIconTranslate).should('exist');
    });
    it('Verify the error message when the user did not have active plan- Translate Tab', function() {
        const email = generateRandomEmail()
        const country = 'United States' // Specify your country here
        cy.visit(Cypress.config('baseUrl'))
        cy.acceptCookies()
        cy.get(pageObject.login.regNewLink).should('be.visible') .click()
        cy.userRegistration(email, testData.rubriqLoginPasswordActive, country)
        cy.get(pageObject.tabNavigation.myAccount).should('be.visible').click();
        cy.contains('Workspace').click({ force: true });
        cy.url().should('include', Cypress.config('baseUrl')+'/en/rubriq')
        cy.get(pageObject.editing.gotItBtn).click()
        cy.get(pageObject.tabNavigation.translateTab).click()
        cy.get(pageObject.translate.translateDoc).click()
        cy.get(pageObject.translate.noTranslationPlanContent).contains(testData.noPlanAccessToTranslation).should('be.visible')

    })
    it('Verify the error message, If the user click continue button before uploading document - Translate', function() {
      cy.customloginAndNavigateToRubriq(testData.rubriqPreferredGroupEmail, testData.rubriqPreferredGroupPassword);
          cy.get(pageObject.tabNavigation.translateTab).click();
          cy.get(pageObject.translate.translateDoc).click();
          cy.get(pageObject.editing.fileUpload).click();
        cy.get(pageObject.tabNavigation.ctnBtn).click()
        cy.get(pageObject.editing.errorUploadFile).contains(testData.errorMsgUploadFile).should('be.visible')
    })
    // it('Verify the limited excess pop-up window is displaying, if the translation is more than 2 ', function() {
    //   cy.customloginAndNavigateToRubriq(email,testData.curieLoginPasswordActive);
    //     cy.get(pageObject.tabNavigation.translateTab).click()
    //     cy.get(pageObject.translate.translateDoc).click()
    //     cy.get(pageObject.translate.translationLimitExceeded).should('exist')
    // })
})
})