import testdata from "./testDataRubriq.json";
import pageObject from "./pageObjectRubriq.json";
describe("Validate Expiration data", ()=>{
    it("Verify the expiration date for monthly plan in paddle plan", function(){
        cy.loginAndNavigateTorubriq(testdata.PaddleDateExiryEmail, testdata.rubriqLoginPasswordActive);
        cy.get(pageObject.myAccountBtn).last().click();
        cy.get(pageObject.myPlanBtn).last().click();
        cy.get(pageObject.displayedDate).should("exist");
    })
    it("Verify the expiration date for yearly plan in paddle plan", function(){
        cy.loginAndNavigateTorubriq(testdata.PaddleDateExiryEmailYearly, testdata.rubriqLoginPasswordActive);
        cy.get(pageObject.myAccountBtn).last().click();
        cy.get(pageObject.myPlanBtn).last().click();
        cy.get(pageObject.displayedDate).should("exist");
    })
})