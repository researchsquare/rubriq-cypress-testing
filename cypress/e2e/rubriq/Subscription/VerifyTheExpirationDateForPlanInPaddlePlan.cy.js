import pageObject from "../../../support/pageObjectRubriq.json";
import testData from "../../../fixtures/testDataRubriq.json";
describe("Validate Expiration data", ()=>{
    it("Verify the expiration date for monthly plan in paddle plan", function(){
        cy.loginAndNavigateToCurie(testData.PaddleDateExiryEmail, testData.curieLoginPasswordActive);
        cy.get(pageObject.myAccountBtn).last().click();
        cy.get(pageObject.myPlanBtn).last().click();
        cy.get(pageObject.displayedDate).should("exist");
    })
    it("Verify the expiration date for yearly plan in paddle plan", function(){
        cy.loginAndNavigateToCurie(testData.PaddleDateExiryEmailYearly, testData.curieLoginPasswordActive);
        cy.get(pageObject.myAccountBtn).last().click();
        cy.get(pageObject.myPlanBtn).last().click();
        cy.get(pageObject.displayedDate).should("exist");
    })
})