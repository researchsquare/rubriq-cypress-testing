const pageobject = require('../../../support/pageObjectRubriq.json');
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
    const country = 'United States'; // Specify your country here
    cy.visit(Cypress.config('baseUrl'))
    cy.get(pageobject.login.regNewLink)
      .should('be.visible') // Assert that the element is visible
      .click();
    cy.acceptCookies()
    cy.userRegistration(email, password, country);
    const filePath = 'cypress/fixtures/testDataRubriq.json';

    // 1. First try to read the file (will fail if it doesn't exist)
    cy.readFile(filePath)
      .then((existingData) => {
        // 2. Modify the data
        const updatedData = {
          ...existingData, // Keep existing data
          rubriqLoginEmail: email, // Update email
          rubriqLoginPassword: password // Update password
        };

        // 3. Write back the updated content
        return cy.writeFile(filePath, updatedData);
      })
      .then(() => {
        cy.log('Successfully updated the file');
      })
    // Additional assertions or test steps can follow
  });
});
