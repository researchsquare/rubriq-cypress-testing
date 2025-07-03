import pageObject from "../../../support/pageObjectRubriq.json";
import testData from "../../../fixtures/testDataRubriq.json";
const rubriqpremium = [
    {
        planType: 'Rubriq Premium Monthly',
        email: testData.rubriqLoginEmailPremiumMonthly,
        password: testData.rubriqLoginPasswordPremiumMonthly,
        StyleOfEnglish: 'American English',
        StyleOfEnglishSelector: pageObject.editing.styleOfEngAE,
    },
    {
        planType: 'Rubriq Premium Yearly',
        email: testData.rubriqLoginEmailPremiumYearly,
        password: testData.rubriqLoginPasswordPremiumYearly,
        StyleOfEnglish: 'American English',
        StyleOfEnglishSelector: pageObject.editing.styleOfEngAE,
    },

];
const rubriqPremiumWithTranslation = [
    {
        planType: 'Rubriq Premium With Translation Monthly',
        email: testData.rubriqLoginEmailPremiumWithTranslationMonthly,
        password: testData.rubriqLoginPasswordPremiumWithTranslationMonthly,
        StyleOfEnglish: 'American English',
        StyleOfEnglishSelector: pageObject.editing.styleOfEngAE,
    },
    {
        planType: 'Rubriq Premium With Translation Yearly',
        email: testData.rubriqLoginEmailPremiumWithTranslationYearly,
        password: testData.rubriqLoginPasswordPremiumWithTranslationYearly,
        StyleOfEnglish: 'American English',
        StyleOfEnglishSelector: pageObject.editing.styleOfEngAE,
    }
]
// Function to upload a document
const uploadDocument = () => {
    cy.get(pageObject.editing.checkDocumentEdit).should('be.visible').click();
    cy.get(pageObject.editing.fileUpload, { timeout: 10000 }).click();
    cy.uploadFile('aje_ai_and_ml.docx'); // Ensure the file exists in the appropriate location
    cy.contains('Upload complete').should('be.visible')
    cy.get(pageObject.tabNavigation.ctnBtn).parent({ timeout: 10000 }).click();
};
describe('Verify the functionality in trial period of Rubriq Premium plan', () => {
    rubriqpremium.forEach(({ planType, email, password, StyleOfEnglish, StyleOfEnglishSelector }) => {
        it(`Verify feature access for users with ${planType}`, () => {
            cy.visit(Cypress.config('baseUrl'))
            cy.customloginAndNavigateToRubriq(email, password);
            uploadDocument()
            cy.get(StyleOfEnglishSelector).click().should('be.checked')
            cy.get(StyleOfEnglishSelector).next().should('contain', StyleOfEnglish)
            cy.get(pageObject.editing.strBtn).click();
            cy.get(pageObject.editing.getProfEditing, { timeout: 10000 }).should('exist');
            cy.get(pageObject.tabNavigation.translateTab).click();
            cy.get(pageObject.translate.translateDoc).click();
            cy.contains('p', testData.accountAccessRubriqPremium).should('be.visible')

        });
    });
    rubriqPremiumWithTranslation.forEach(({ planType, email, password, StyleOfEnglish, StyleOfEnglishSelector }) => {
        it(`Verify feature access for users with ${planType}`, () => {
            cy.visit(Cypress.config('baseUrl'))
            cy.customloginAndNavigateToRubriq(email, password);
            uploadDocument()
            cy.get(StyleOfEnglishSelector).click().should('be.checked')
            cy.get(StyleOfEnglishSelector).next().should('contain', StyleOfEnglish)
            cy.get(pageObject.editing.strBtn).click();
            cy.get(pageObject.editing.getProfEditing, { timeout: 10000 }).should('exist');
            cy.get(pageObject.tabNavigation.translateTab).click();
            cy.get(pageObject.translate.translateDoc).click();

        });
    });
});