// Generate a random email address
function generateRandomEmail() {
    const timestamp = new Date().getTime();
    return `user${timestamp}@example.com`;
}

// Generate a random password
function generateRandomPassword() {
    return `P@ssw0rd${Math.floor(Math.random() * 10000)}`;
}

// Define the custom command
Cypress.Commands.add("userRegistration", (email, password, country) => { 
    cy.intercept({
        method: 'POST',
        url: '/api/auth/register',
    }).as('registration');

    cy.get('[data-cy="registration-form"]').children().get('[data-cy="email"]').type(email);

    cy.get('[data-cy="registration-form"]').children().get('[data-cy="firstName"]').typeRandom('Bruce');
    cy.get('[data-cy="registration-form"]').children().get('[data-cy="lastName"]').type('Banner');

    cy.get('[data-cy="registration-form"]').children().get('[data-cy="password"]').type(password);

    cy.get('body').then(($body) => {
        if (Cypress.$('body').find('span[title="Country"]').is(':visible'))
            cy.chooseReactSelectOption('Country/Region', country);
    });

    cy.get('[data-cy="optinToMarketing"]').check();
    cy.get('[data-cy="agreeToTOS"]').check();

    cy.get('[data-cy="registration-form"]').submit();
    cy.wait('@registration');
});

// Usage example in a test
describe('User Registration Test', () => {
    it('should register a new user with dynamic email and password', () => {
        const email = generateRandomEmail();
        const password = generateRandomPassword();
        const country = 'United States'; // Specify your country here
        cy.visit('https://secure-aje.staging.sqr.io')
        cy.get('.skip-tracking.trackable-link')
      .should('be.visible') // Assert that the element is visible
      .click();
       // cy.acceptCookies()

        cy.userRegistration(email, password, country);

        // Additional assertions or test steps can follow
    });
});
