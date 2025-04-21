import LoginPageObject from "./pageObjectRubriq.json"
import loginTestData from "./testDataRubriq.json"
function generateRandomEmail() {
    const timestamp = new Date().getTime();
    return `user${timestamp}@example.com`;
}
const testCases = [
    {
      language: 'Chinese',
      languageSelector: LoginPageObject.chineseLang,
      email: loginTestData.rubriqLoginEmailActive5,
      password: loginTestData.rubriqLoginPasswordActive,
    },
    {
      language: 'Spanish',
      languageSelector: LoginPageObject.spanishLang,
      email: loginTestData.rubriqLoginEmailActive2,
      password: loginTestData.rubriqLoginPasswordActive,
    },
    {
      language: 'Portuguese',
      languageSelector: LoginPageObject.portugueseLang,
      email: loginTestData.rubriqLoginEmailActive4,
      password: loginTestData.rubriqLoginPasswordActive,
    }
  ];

describe('Upload Document- Active plan/ Non Active plan, and also validate error message-Translate Tab', function () {
  testCases.forEach(({ language, languageSelector, email, password }) => {
    it(`Translate Document to ${language} if the user has an active plan`, function () {
      cy.visit('https://secure-aje.staging.sqr.io');
      cy.acceptCookies();
      cy.uiLogin(email, password);
      cy.url().should('include', '/home/');
      cy.get(LoginPageObject.rubriqTab).click();
      cy.url().should('include', 'https://secure-aje.staging.sqr.io/en/rubriq');
      cy.get(LoginPageObject.translateTab).click();
      cy.get(LoginPageObject.translateDoc).click();
      cy.get(LoginPageObject.fileUpload).click();
      cy.uploadFile('aje_ai_and_ml.docx');
      cy.get(LoginPageObject.ctnBtn).click({ force: true });
      cy.get(languageSelector).click();
      cy.get(LoginPageObject.strBtn).click();
      cy.get(LoginPageObject.dataIconTranslate).should('exist');
    });
  });
    it('Verify the error message when the user did not have active plan- Translate Tab', function() {
        const email = generateRandomEmail()
        const country = 'United States' // Specify your country here
        cy.visit('https://secure-aje.staging.sqr.io')
        cy.get(LoginPageObject.regNewLink).should('be.visible') .click()
        cy.userRegistration(email, loginTestData.rubriqLoginPasswordActive, country)
        cy.acceptCookies()
        cy.url().should('include', '/home')
        cy.get(LoginPageObject.rubriqTab).click()
        cy.url().should('include', 'https://secure-aje.staging.sqr.io/en/rubriq')
        cy.get(LoginPageObject.gotItBtn).click()
        cy.get(LoginPageObject.translateTab).click()
        cy.get(LoginPageObject.translateDoc).click()
        cy.get(LoginPageObject.noTranslationPlanContent).contains(loginTestData.noPlanAccessToTranslation).should('be.visible')

    })
    it('Verify the error message, If the user click continue button before uploading document - Translate', function() {
        cy.visit('https://secure-aje.staging.sqr.io')
        cy.acceptCookies()
        cy.uiLogin( loginTestData.rubriqLoginEmailActive1, loginTestData.rubriqLoginPasswordActive )
        cy.url().should('include', '/home')
        cy.get(LoginPageObject.rubriqTab).click()
        cy.url().should('include', 'https://secure-aje.staging.sqr.io/en/rubriq')
        cy.get(LoginPageObject.checkDocumentEdit).click()
        cy.get(LoginPageObject.fileUpload).click()
        cy.get(LoginPageObject.ctnBtn).click()
        cy.get(LoginPageObject.errorUploadFile).contains(loginTestData.errorMsgUploadFile).should('be.visible')
    })
    it('Verify the limited excess pop-up window is displaying, if the translation is more than 2 ', function() {
        cy.visit('https://secure-aje.staging.sqr.io')
        cy.acceptCookies()
        cy.uiLogin( loginTestData.rubriqLoginEmailActive3, loginTestData.rubriqLoginPasswordActive )
        cy.url().should('include', '/home/')
        cy.get(LoginPageObject.rubriqTab ).click()
        cy.url().should('include', 'https://secure-aje.staging.sqr.io/en/rubriq')
        cy.get(LoginPageObject.translateTab).click()
        cy.get(LoginPageObject.translateDoc).click()
        cy.get(LoginPageObject.translationLimitExceeded).should('exist')
    })
})