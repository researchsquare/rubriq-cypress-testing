import pageObject from "../../../support/pageObjectRubriq.json"
import testData from "../../../fixtures/testDataRubriq.json";

describe('Preferred Group Functionality',function(){

    it('Verify user able to remove preferred group',function(){
        cy.visit(Cypress.config('baseUrl'))
        cy.acceptCookies()
        cy.uiLogin(testData.rubriqPreferredGroupEmail,testData.rubriqPreferredGroupPassword)
        cy.get(pageObject.tabNavigation.myAccount).should('be.visible').click();
        cy.contains('My Plan').click({ force: true })
        cy.get(pageObject.editing.removePreferredGroupDropDown).click()
        cy.contains(pageObject.editing.leavePreferredGroup).click()
        cy.get(pageObject.tabNavigation.ctnBtn).click()
        cy.get(pageObject.editing.groupCodeToast).should('be.visible')
        cy.get(pageObject.editing.groupCode).should('be.visible')

    })
})