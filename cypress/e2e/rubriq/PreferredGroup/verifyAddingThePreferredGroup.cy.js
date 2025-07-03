import pageObject from "../../../support/pageObjectRubriq.json"
import testData from "../../../fixtures/testDataRubriq.json";
// Generate a random email address
function generateRandomEmail() {
    const timestamp = new Date().getTime();
    return `user${timestamp}@test.aje.com`;
}

// Generate a random password
function generateRandomPassword() {
    return `P@ssw0rd${Math.floor(Math.random() * 10000)}`;
}
describe("Prefrerred group Functionality",function(){
    it('Verify Adding Preferred Group',function(){
        const email = generateRandomEmail();
        console.log(email)
        const password = generateRandomPassword();
        console.log(password)
        const country = 'United States'; // Specify your country here
        cy.visit(Cypress.config('baseUrl'))
              cy.get(pageObject.login.regNewLink)
              .should('be.visible') // Assert that the element is visible
              .click();
               cy.acceptCookies()
               cy.userRegistration(email, password, country);
               cy.get(pageObject.tabNavigation.myAccount).should('be.visible').click();
               cy.contains('My Plan').click({ force: true });
               cy.url().should('include', Cypress.config('baseUrl')+'/en/rubriq/plan')
               cy.get(pageObject.editing.groupCode).should('be.visible').type(testData.groupCode,{delay:0})
               cy.get(pageObject.login.submit).click()
               cy.get(pageObject.editing.groupCodeToast).should('be.visible')
               cy.contains(pageObject.editing.groupCode,{timeout:40000}).should('be.visible')
               cy.readFile('cypress/fixtures/testDataRubriq.json', { timeout: 1000, log: false }).then((existingData) => {
                const newData = {
                  ...existingData,
                  rubriqPreferredGroupEmail: email,
                  rubriqPreferredGroupPassword: password
                };
                cy.writeFile('cypress/fixtures/testDataRubriq.json', newData);
              });
   
    })
})