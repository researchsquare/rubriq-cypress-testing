import LoginPageObject from "./pageObjectCurie.json";
import loginTestData from "./testDataCurie.json";


const testCases = [
  {
    language: 'Chinese',
    languageSelector: LoginPageObject.chineseLang,
    email: loginTestData.curieLoginEmailActive5,
    password: loginTestData.curieLoginPasswordActive,
  },
  {
    language: 'Spanish',
    languageSelector: LoginPageObject.spanishLang,
    email: loginTestData.curieLoginEmailActive2,
    password: loginTestData.curieLoginPasswordActive,
  },
  {
    language: 'Portuguese',
    languageSelector: LoginPageObject.portugueseLang,
    email: loginTestData.curieLoginEmailActive4,
    password: loginTestData.curieLoginPasswordActive,
  }
];

//  Translation and action (delete or download)
const translateAndPerformAction = (languageSelector, action) => {
  cy.get(LoginPageObject.translateTab).click();
  cy.get(LoginPageObject.translateDoc).click();
  cy.get(LoginPageObject.fileUpload).click();
  cy.uploadFile('aje_ai_and_ml.docx'); 
  cy.get(LoginPageObject.ctnBtn).click({ force: true });
  cy.get(languageSelector).click();
  cy.get(LoginPageObject.strBtn).click();
  cy.get(LoginPageObject.dataIconTranslate).should('exist');

  if (action === 'delete') {
    cy.get(LoginPageObject.deleteButtonEdit).click();
    cy.get(LoginPageObject.DeleteConfirm).click();
    cy.get(LoginPageObject.DeleteToastMessage).should('exist');
  } else if (action === 'download') {
    cy.intercept('GET', '**/path-to-your-download-endpoint').as('fileDownload');
    cy.get(LoginPageObject.DownloadBtnEdit).click();
    cy.wait('@fileDownload');
    cy.task('checkFileDownload', 'aje_ai_and_ml.docx');
  }
};

describe('Curie Document Features - Delete, Download', () => {
  testCases.forEach(({ language, languageSelector, email, password }) => {
    it(`Translate document to ${language} and verify deletion`, () => {
      cy.loginAndNavigateToCurie(email, password);
      translateAndPerformAction(languageSelector, 'delete');
    });

    it(`Translate document to ${language} and verify download`, () => {
      cy.loginAndNavigateToCurie(email, password);
      translateAndPerformAction(languageSelector, 'download');
    });
  });
});
