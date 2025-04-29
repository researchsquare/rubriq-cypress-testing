import testdata from "./testDataCurie.json";
import pageObject from "./pageObjectCurie.json";
describe("Validate Expiration data", ()=>{
    it("Verify the expiration date for monthly plan in paddle plan", function(){
        cy.loginAndNavigateToCurie(testdata.PaddleDateExiryEmail, testdata.curieLoginPasswordActive);
        cy.get(pageObject.myAccountBtn).last().click();
        cy.get(pageObject.myPlanBtn).last().click();
        cy.get(pageObject.displayedDate).should("exist");
    })
    it("Verify the expiration date for yearly plan in paddle plan", function(){
        cy.loginAndNavigateToCurie(testdata.PaddleDateExiryEmailYearly, testdata.curieLoginPasswordActive);
        cy.get(pageObject.myAccountBtn).last().click();
        cy.get(pageObject.myPlanBtn).last().click();
        cy.get(pageObject.displayedDate).should("exist");
    })
})