import pageObject from "../../../support/pageObjectRubriq.json"
import testData from "../../../fixtures/testDataRubriq.json";
// Test data for multiple styles of English
const testCases = [
    {
        StyleOfEnglish: 'American English',
        StyleOfEnglishSelector: pageObject.editing.styleOfEngAE,
    },
    {
        StyleOfEnglish: 'British English',
        StyleOfEnglishSelector: pageObject.editing.styleOfEngBE,
    },
];

// Function to upload a document
const uploadDocument = () => {
    cy.get(pageObject.editing.checkDocumentEdit).should('be.visible').click();
    cy.get(pageObject.editing.fileUpload, { timeout: 10000 }).click();
    cy.uploadFile('aje_ai_and_ml.docx'); // Ensure the file exists in the appropriate location
    cy.contains('Upload complete').should('be.visible')
    cy.get(pageObject.tabNavigation.ctnBtn).parent({timeout:10000}).click();
};

// Tests for Delete, Download, and Upgrade features
describe('Rubriq Document Features - Delete, Download, Upgrade', () => {

    testCases.forEach(({ StyleOfEnglish, StyleOfEnglishSelector }) => {
 
        describe(`Test for ${StyleOfEnglish}`,()=>{
            beforeEach(() => {
                // Common setup steps
               cy.session(`login-${testData.rubriqPreferredGroupEmail}`,()=>{
                cy.customloginAndNavigateToRubriq(testData.rubriqPreferredGroupEmail, testData.rubriqPreferredGroupPassword);
                uploadDocument();
                cy.get(StyleOfEnglishSelector).click().should('be.checked')
                cy.get(StyleOfEnglishSelector).next().should('contain',StyleOfEnglish)
                cy.get(pageObject.editing.strBtn).click();
                cy.get(pageObject.editing.getProfEditing, { timeout:30000 }).should('exist');
               })
               cy.visit(Cypress.config('baseUrl')+'/en/rubriq');
            });
    
            it(`Edit document to ${StyleOfEnglish} and verify download`, () => {
                cy.contains('Edited',{timeout:400000}).should('be.visible')
                //cy.intercept('GET', '**/path-to-your-download-endpoint').as('fileDownload');
                cy.intercept('GET', Cypress.config('baseUrl')+'/api/digital-edit/*/download').as('fileDownload');
                cy.get(pageObject.editing.DownloadBtnEdit).click();
                cy.wait('@fileDownload').then((intercept)=>{
                    expect(intercept.response.statusCode).to.equal(200)
                    cy.wait(5000)
                    cy.readFile("cypress/downloads/aje_ai_and_ml.docx").then((text)=>{
                        expect(text).to.include('3D')
                    })
                    cy.task('deleteFile','aje_ai_and_ml.docx').then((result)=>{
                        expect(result).to.be.null;
                    })
                })
                
            });
    
            it(`Edit document to ${StyleOfEnglish} and verify upgrade`, () => {
                cy.get(pageObject.editing.getPremiumBtn).click();
                cy.url().should('include', '/en/home');
            });
            it(`Edit document to ${StyleOfEnglish} and verify deletion`, () => {
                cy.get(pageObject.editing.deleteButtonEdit).click();
                cy.get(pageObject.editing.DeleteConfirm).click();
                cy.get(pageObject.editing.DeleteToastMessage).should('exist');
            });
            after(() => {
                // Cleanup specific to this test case group
                cy.log(`Clean up after tests for ${StyleOfEnglish}`);
                cy.clearCookies();
                cy.clearLocalStorage();
                cy.clearAllSessionStorage();
              });

        })
      
    });
})


