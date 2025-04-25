import pageObject from "./pageObjectRubriq.json";
import testData from "../../fixtures/testDataRubriq.json";

// Test data for multiple styles of English
const testCases = [
    {
        StyleOfEnglish: 'American English',
        StyleOfEnglishSelector: pageObject.styleOfEngAE,
    },
    {
        StyleOfEnglish: 'British English',
        StyleOfEnglishSelector: pageObject.styleOfEngBE,
    },
];

// Function to upload a document
const uploadDocument = () => {
    cy.get(pageObject.checkDocumentEdit).click();
    cy.get(pageObject.fileUpload, { timeout: 10000 }).click();
    cy.uploadFile('aje_ai_and_ml.docx'); // Ensure the file exists in the appropriate location
    cy.get(pageObject.ctnBtn, { timeout: 10000 }).click();
};

// Tests for Delete, Download, and Upgrade features
describe('Rubriq Document Features - Delete, Download, Upgrade', () => {

    testCases.forEach(({ StyleOfEnglish, StyleOfEnglishSelector }) => {

        beforeEach(() => {
            // Common setup steps
            cy.customloginAndNavigateToRubriq(testData.rubriqLoginEmail, testData.rubriqLoginPassword);
            uploadDocument();
            cy.get(StyleOfEnglishSelector).click().should('be.checked').should('contain',StyleOfEnglish)
            cy.get(pageObject.strBtn).click();
            cy.get(pageObject.getProfEditing, { timeout: 10000 }).should('exist');
        });

        it(`Edit document to ${StyleOfEnglish} and verify deletion`, () => {
            cy.get(pageObject.deleteButtonEdit).click();
            cy.get(pageObject.DeleteConfirm).click();
            cy.get(pageObject.DeleteToastMessage).should('exist');
        });

        it(`Edit document to ${StyleOfEnglish} and verify download`, () => {
            cy.intercept('GET', '**/path-to-your-download-endpoint').as('fileDownload');
            cy.get(pageObject.DownloadBtnEdit).click();
            cy.wait('@fileDownload');
            cy.task('checkFileDownload', 'aje_ai_and_ml.docx').then((exists) => {
                expect(exists).to.be.true;
            });
        });

        it(`Edit document to ${StyleOfEnglish} and verify upgrade`, () => {
            cy.get(pageObject.getPremiumBtn).click();
            cy.url().should('include', '/submit/manuscript-services');
        });
    });
});
