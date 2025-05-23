import pageobject from "../../../support/pageObjectRubriq.json";
import testData from "../../../fixtures/testDataRubriq.json";


describe('Verify Trail for Rubriq Premium plan', () => {
  it('Verify Trail Status Label for Users with Rubriq Premium Monthly Plan', () => {
    cy.customloginAndNavigateToRubriq(testData.rubriqLoginEmailPremiumMonthly, testData.rubriqLoginPasswordPremiumMonthly);
    cy.get(pageobject.tabNavigation.myAccount).should('be.visible').click()
    cy.contains('My Plan').click({ force: true });
    cy.contains('Trial').should('be.visible')
  })
  it('Verify Trail Status Label for Users with Rubriq Premium Yearly Plan', () => {
    cy.customloginAndNavigateToRubriq(testData.rubriqLoginEmailPremiumWithTranslationYearly, testData.rubriqLoginPasswordPremiumWithTranslationYearly);
    cy.get(pageobject.tabNavigation.myAccount).should('be.visible').click()
    cy.contains('My Plan').click({ force: true });
    cy.contains('Trial').should('be.visible')
  })
});

// cancel the plan
//  Expired




