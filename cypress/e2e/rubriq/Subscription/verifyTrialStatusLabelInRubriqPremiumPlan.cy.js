import pageobject from "../../../support/pageObjectRubriq.json";
import testData from "../../../fixtures/testDataRubriq.json";
const testCases = [
    {
        planType:'Rubriq Premium Monthly',
        status: 'Trial',
        email: testData.rubriqLoginEmailPremiumMonthly,
        password: testData.rubriqLoginPasswordPremiumMonthly,
    },
    {
        planType:'Rubriq Premium Yearly',
        status: 'Trial',
        email: testData.rubriqLoginEmailPremiumMonthly,
        password: testData.rubriqLoginPasswordPremiumMonthly,
    },
    {
        planType:'Rubriq Premium With Translation Monthly',
        status: 'Trial',
        email: testData.rubriqLoginEmailPremiumWithTranslationMonthly,
        password: testData.rubriqLoginPasswordPremiumWithTranslationMonthly,
    },
    {
        planType:'Rubriq Premium With Translation Yearly',
        status: 'Trial',
        email: testData.rubriqLoginEmailPremiumWithTranslationYearly,
        password: testData.rubriqLoginPasswordPremiumWithTranslationYearly,
    }
];
describe('Verify Trial for Rubriq Premium plan', () => {
  testCases.forEach(({planType, status, email, password}) => {
    it(`Verify Trial Status Label for Users with ${planType}`, () => {
      cy.visit(Cypress.config('baseUrl'))
      cy.uiLogin(email, password);
      cy.get(pageobject.tabNavigation.myAccount).should('be.visible').click();
      cy.contains('My Plan').click({ force: true });
      cy.contains(status).should('be.visible');
    });
  });
});

// cancel the plan
//  Expired




