import pageobject from "../../../support/pageObjectRubriq.json";
import testData from "../../../fixtures/testDataRubriq.json";


describe('Verify Trail for Rubriq Premium plan with Translation', () => {
  it('Verify Trail Status Label for Users with Rubriq Premium with Translation Monthly Plan', () => {
    cy.customloginAndNavigateToRubriq(testData.rubriqLoginEmailPremiumWithTranslationMonthly, testData.rubriqLoginPasswordPremiumWithTranslationMonthly);
    cy.get(pageobject.tabNavigation.myAccount).should('be.visible').click()
    cy.contains('My Plan').click({ force: true });
    cy.contains('Trial').should('be.visible')
  })
  it('Verify Trail Status Label for Users with Rubriq Premium with Translation Yearly Plan', () => {
    cy.customloginAndNavigateToRubriq(testData.rubriqLoginEmailPremiumWithTranslationYearly, testData.rubriqLoginPasswordPremiumWithTranslationYearly);
    cy.get(pageobject.tabNavigation.myAccount).should('be.visible').click()
    cy.contains('My Plan').click({ force: true });
    cy.contains('Trial').should('be.visible')
  })
});

// cancel the plan
//  Expired




