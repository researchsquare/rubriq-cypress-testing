import pageobject from "./pageObjectRubriq.json"
import testData from "../fixtures/testDataRubriq.json"
Cypress.Commands.add("uiLogin", (Email, Password) => {
  cy.intercept({
    url: 'api/auth/login',
    method: 'POST'
  }).as('login')
  cy.get(pageobject.login.email).type(Email, { delay: 0 })
  cy.get(pageobject.login.password).type(Password, { delay: 0 })
  cy.get(pageobject.login.submit).click()
  cy.wait('@login').its('response.statusCode').should('eq', 200)
})
Cypress.Commands.add('acceptCookies', () => {
      cy.contains('Allow all').should('be.visible').click({ force: true });
})
Cypress.Commands.add("userRegistration", (email, password, country) => {
  cy.get(pageobject.login.registrationForm).children().get(pageobject.login.email).type(email, { delay: 0 })
  cy.get(pageobject.login.registrationForm).children().get(pageobject.login.firstName).type(testData.firstName, { delay: 0 })
  cy.get(pageobject.login.registrationForm).children().get(pageobject.login.lastName).type(testData.lastName, { delay: 0 })
  cy.get(pageobject.login.registrationForm).children().get(pageobject.login.password).type(password, { delay: 0 })
  cy.get('body').then(($body) => {
    if (Cypress.$('body').find('span[title="Country"]').is(':visible')) {
      cy.chooseReactSelectOption('Country/Region', country)
    }
  })
  cy.get(pageobject.login.termsOfService).check({ force: true })
  cy.get(pageobject.login.registerbtn).click()
  cy.get(pageobject.tabNavigation.myAccount, { timeout: 40000 }).should('be.visible')
});
Cypress.Commands.add('customloginAndNavigateToRubriq', (email, password) => {
  cy.visit(Cypress.config('baseUrl'))
  cy.acceptCookies()
  cy.uiLogin(email, password)
  cy.get(pageobject.tabNavigation.myAccount).should('be.visible').click();
  cy.contains('Workspace').click({ force: true });
  cy.url().should('include', Cypress.config('baseUrl') + '/en/rubriq')

});
Cypress.Commands.add('addPreferredGroup', (group, email, password) => {
  cy.visit(Cypress.config('baseUrl'))
  cy.acceptCookies()
  cy.uiLogin(email, password)
  cy.get(pageobject.tabNavigation.myAccount).should('be.visible').click();
  cy.contains('My Plan').click({ force: true });
  cy.url().should('include', Cypress.config('baseUrl') + 'en/rubriq/plan')
  cy.get(pageobject.editing.groupCode).should('be.visible').type(group, { delay: 0 })
  cy.get(pageobject.login.submit).click()
});


Cypress.Commands.add('uploadFile', (fileName, fileType = 'text/plain') => {
  cy.fixture(fileName, 'base64').then((fileContent) => {
    cy.get('input[type="file', { timeout: 10000 }).then((input) => {
      const blob = Cypress.Blob.base64StringToBlob(fileContent, fileType)
      const dataTransfer = new DataTransfer()
      const file = new File([blob], fileName, { type: fileType })
      dataTransfer.items.add(file)
      input[0].files = dataTransfer.files
      cy.wrap(input).trigger('change', { force: true })
    })
  })
})
Cypress.Commands.add('getIframeBody', (iframeSelector) => {
  return cy
    .get(iframeSelector)
    .its('0.contentDocument.body') // Access the iframe's body
    .should('not.be.empty') // Ensure the body is loaded
    .then(cy.wrap); // Wrap the body so Cypress can interact with it
});
// In cypress/support/commands.js

Cypress.Commands.add('fillPaymentDetails', (paymentData) => {
  cy.getIframeBody(pageobject.planAndPayment.paddleFrame, { timeout: 50000 })
    .find(pageobject.planAndPayment.postCode)
    .type(paymentData.postCodeData, { force: true });

  cy.getIframeBody(pageobject.planAndPayment.paddleFrame)
    .find(pageobject.planAndPayment.paddleSubmitBtn)
    .parents()
    .first()
    .invoke('css', 'overflow', 'visible')
    .then(() => {
      cy.getIframeBody(pageobject.planAndPayment.paddleFrame)
        .find(pageobject.planAndPayment.paddleSubmitBtn)
        .click({ force: true });
    });

  cy.getIframeBody(pageobject.planAndPayment.paddleFrame)
    .find(pageobject.planAndPayment.cardNumberObject)
    .should('be.visible')
    .type(paymentData.cardNumber, { force: true });

  cy.getIframeBody(pageobject.planAndPayment.paddleFrame)
    .find(pageobject.planAndPayment.cardHolderName)
    .should('be.visible')
    .type(paymentData.cardHolderNameData, { force: true });

  cy.getIframeBody(pageobject.planAndPayment.paddleFrame)
    .find(pageobject.planAndPayment.expDateObject)
    .should('be.visible')
    .type(paymentData.expiryDateData, { force: true });

  cy.getIframeBody(pageobject.planAndPayment.paddleFrame)
    .find(pageobject.planAndPayment.cvvObject)
    .should('be.visible')
    .type(paymentData.cvvData, { force: true });

  cy.getIframeBody(pageobject.planAndPayment.paddleFrame)
    .find(pageobject.planAndPayment.cardPaymentFormSubmitBtn)
    .parents()
    .first()
    .invoke('css', 'overflow', 'visible')
    .then(() => {
      cy.getIframeBody(pageobject.planAndPayment.paddleFrame)
        .find(pageobject.planAndPayment.cardPaymentFormSubmitBtn)
        .click({ force: true });
    });
});
Cypress.Commands.add('chooseReactSelectOption', (label, text) => {
  if (text) {
    cy
      .contains(label)
      .parent()
      .find(`input:first`)
      .type(`${text}`, { force: true, delay: 100 })
    cy.contains('div', text).should('be.visible').click({ force: true })

  }

})
Cypress.Commands.add('paymentThroughApi', (email, password, priceId) => {
  // Login Request
  cy.request({
    url: 'https://secure-aje.staging.sqr.io/api/auth/login',
    method: 'POST',
    body: { email, password }
  }).then((res) => {
    Cypress.config('userid', res.body.user.identity);
    expect(res.status).to.eq(200);
    cy.log('User ID:', res.body.user.identity);
    const custom_data = JSON.stringify({
      user_identity: Cypress.config('userid')
    })

    // Checkout Request
    cy.request({
      url: 'https://sandbox-checkout-service.paddle.com/transaction-checkout',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'paddle-clienttoken': 'test_c48d5fb2bb879339e64993a4516'
      },
      body: {
        data: {
          customer: { email },
          settings: {
            display_mode: 'wide-overlay',
            locale: 'en',
            theme: 'light',
            allow_logout: true,
            show_add_discounts: true,
            allow_discount_removal: true,
            show_add_tax_id: true,
            variant: 'multi-page',
            source_page: 'https://secure-aje.staging.sqr.io/en/rubriq/plan/subscribe/freetrial',
            referrer: 'secure-aje.staging.sqr.io'
          },
          custom_data,
          items: [{ price_id: priceId, quantity: 1 }]
        }
      }
    }).then((res) => {
      const checkoutId = res.body.data.id;
      Cypress.config('checkout_id', checkoutId);
      expect(res.status).to.eq(201);
      cy.log('Checkout ID:', checkoutId);
      // Customer Validation
      cy.request({
        url: `https://sandbox-checkout-service.paddle.com/transaction-checkout/${checkoutId}/customer`,
        method: 'POST',
        body: {
          data: {
            customer: {
              email,
              marketing_consent: false,
              address: {
                country_code: 'IN',
                postal_code: '636455'
              }
            }
          }
        }
      }).then((res) => {
        expect(res.status).to.eq(201);

        // Payment Request
        cy.request({
          url: `https://sandbox-checkout-service.paddle.com/transaction-checkout/${checkoutId}/pay`,
          method: 'POST',
          body: {
            data: {
              payment_method_type: 'card',
              payment_method_data: {
                card: {
                  metadata: {
                    cardholder_name: 'Ajith',
                    card_first_six: '411111',
                    card_last_four: '1111',
                    expiry_month: 7,
                    expiry_year: 2026,
                    card_brand: 'visa'
                  },
                  three_d_s: {
                    browser_info: 'eyJ3aWR0aCI6MTI4MCwiaGVpZ2h0Ijo3MjAsImRlcHRoIjoyNCw...'
                  },
                  tokenex_card: {
                    encrypted_card_number: 'Jz57ntiIsZlctZ746VODpivZ0/LR1iWY/YUVhjkCVB4/G65ANO8JGHznLOLMsX8lGtG0PxpN6o7ujrbnMLRpcrcPlmLQ8mX66VoO3KoZzVtzGMS4V75I2u08vjgEyuz5PH4Vnkr8YH4CMko0wzzEVhfpdJ3Sh8IyPmN4Lx5gKeBKHQhQxIKW19hPENNKT7uKFumXvxYK5CmoR6fpkBieFtBtAp9rhiUKy06Ruc9cTPb+cGnG4M669eDgxfFHkO5fEHedmWXbsh6ZRrLAtxHzM7zwygng5Oyprqtf2c2fy/pVzbWsNpFwSdzvv5FaDQTez+WvQ8e2dTV5Fz+rNDPsPQ==',
                    encrypted_cvv: 'MG5PYEXo+s6PHrZ8JzD640nW3/sEThfxWV55cfK1xF7uVi3aTh+sU5p6Q+A52sGt8q+2nV/EYgeoB3BZOi151Gq6loTPQSpOgMbL6jTJiJYdSVbaQqPvu61x4gYXg3E97n7vAOVxkZrEVyoG7XiFjsaKdu3gy/4peumZ1Z+DX+BmZ8mYejVApU3HykEzlFfDotyqfHBiNyI6ze7XOa2M3WY6LOE1G7t0vLDwwzYAGRi7QIekl5TkhQAgSsg3BjT7QAZknWsl/RUZt538Y7sbRgtqFqysnwIWShZ7I8O1Bkg119DkBkLj5XabKdDWckzbKZqlV35YIt3+L/L7PlyrGA=='
                  }
                }
              }
            }
          }
        }).then((res) => {
          expect(res.status).to.eq(200);
        });
      });
    });
  });
});

