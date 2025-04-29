const pageobject = require('../pageObjectRubriq.json');
// Generate a random email address
function generateRandomEmail() {
    const timestamp = new Date().getTime();
    return `user${timestamp}@test.aje.com`;
}

// Generate a random password
function generateRandomPassword() {
    return `P@ssw0rd${Math.floor(Math.random() * 10000)}`;
}
// Usage example in a test
describe('User Registration Test', () => {
    it('should register a new user with dynamic email and password', () => {
        const email = generateRandomEmail();
        console.log(email)
        const password = generateRandomPassword();
        console.log(password)
        cy.readFile('cypress/fixtures/testDataRubriq.json', { timeout: 1000, log: false }).then((existingData) => {
          const newData = {
            ...existingData,
            rubriqLoginEmail: email,
            rubriqLoginPassword: password
          };
          cy.writeFile('cypress/fixtures/testDataRubriq.json', newData);
        });
        
        const country = 'United States'; // Specify your country here
        cy.visit('https://secure-aje.staging.sqr.io')
        cy.get(pageobject.login.regNewLink)
      .should('be.visible') // Assert that the element is visible
      .click();
       cy.acceptCookies()
       cy.userRegistration(email, password, country);

       // Additional assertions or test steps can follow
    });
});
