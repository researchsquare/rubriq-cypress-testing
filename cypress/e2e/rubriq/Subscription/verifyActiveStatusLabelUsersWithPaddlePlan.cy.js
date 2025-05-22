import pageObject from "../../../support/pageObjectRubriq.json";
import testData from "../../../fixtures/testDataRubriq.json";


describe('Label verificaton for paddle plan', () => { 
    it('Verify Trail Status Label for Users with Paddle Plan', () => {
      cy.loginAndNavigateToCurie(testData.paddlePlanActiveEmail, testData.paddlePlanActivePassword);
      cy.get(pageObject.myAccountBtn).last().click()
      cy.get(pageObject.myPlanBtn).last().click()
      cy.get(pageObject.activeLabel).should('have.text', 'Active')
    });
  });

  // cancel the plan
  //  Expired
  
  


