import LoginPageObject from "./pageObjectCurie.json";
import loginTestData from "./testDataCurie.json";


describe('Label verificaton for paddle plan', () => { 
    it('Verify Active Status Label for Users with Paddle Plan', () => {
      cy.loginAndNavigateToCurie(loginTestData.paddlePlanActiveEmail, loginTestData.paddlePlanActivePassword);
      cy.get(LoginPageObject.myAccountBtn).last().click()
      cy.get(LoginPageObject.myPlanBtn).last().click()
      cy.get(LoginPageObject.activeLabel).should('have.text', 'Active')
    });
  });

