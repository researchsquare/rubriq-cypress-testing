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
   cy.wait(1000); // optional short delay if the banner loads slowly
  cy.get('body').then(($body) => {
    if ($body.find('button:contains("Allow all")').length > 0) {
      cy.contains('Allow all').click({ force: true });
    } else {
      cy.log('Allow all button not present.');
    }
  });
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
    const userId = res.body.user.identity;
    expect(res.status).to.eq(200);
    cy.log('User ID:', res.body.user.identity);
    const custom_data = JSON.stringify({
      user_identity: userId,
      projectEnvironmentName: "staging"
    })
cy.log('Custom Data:', custom_data);
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
            source_page:'https://rubriq-release-aje.staging.sqr.io/en/rubriq/plan/subscribe/freetrial',
          },
          custom_data,
          items: [{ price_id: priceId, quantity: 1 }]
        }
      }
    }).then((res) => {
      const checkoutId = res.body.data.id;
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
                    expiry_month: 9,
                    expiry_year: 2026,
                    card_brand: 'visa'
                  },
                  three_d_s: {
                    browser_info: 'eyJ3aWR0aCI6MTI4MCwiaGVpZ2h0Ijo3MjAsImRlcHRoIjoyNCwidGltZXpvbmUiOi0zMzAsInVzZXJfYWdlbnQiOiJNb3ppbGxhLzUuMCAoV2luZG93cyBOVCAxMC4wOyBXaW42NDsgeDY0KSBBcHBsZVdlYktpdC81MzcuMzYgKEtIVE1MLCBsaWtlIEdlY2tvKSBDaHJvbWUvMTM3LjAuMC4wIFNhZmFyaS81MzcuMzYiLCJqYXZhIjpmYWxzZSwibGFuZ3VhZ2UiOiJlbi1VUyIsImJyb3dzZXJfc2l6ZSI6IjA1IiwiYWNjZXB0X2hlYWRlciI6InRleHQvaHRtbCxhcHBsaWNhdGlvbi94aHRtbCt4bWwsYXBwbGljYXRpb24veG1scT0wLjksKi8qcT0wLjgifQ=='
                  },
                  tokenex_card: {
                    encrypted_card_number: 'VqLbZ4ZF0FS1m/XcRCNUD+JVyCjJJkVNcUMWC93zv6jEFs687gAWujBCPuPvXApn0iVOhqr9kOG9x1ejXr+ie0GV3kcCQcOV8UvSUhzZ3FflrdLiSYtoQpWgf7zN5XR8OXNNvOUnUG1+2XcXDGmgve6SV6AzCV2Nt19ATa8youZsIBfvfOwk9KrIrLplVpLuMxsjfZjM+xIR5ZnVJheEy+dEWJ+/+xXHA5OHuEK+9T8ApWp1h33Xe/I1GJW39ju8aQuresDJfs1YSl5GCGnNJwQSUBcnJvYEd/4c5wwqSXpnfYMbRNxBSBqz60/ux0bZVMms+LQzkNhhXySIQV++Xg==',
                    encrypted_cvv: 'P7yEPWLzbnGb+dVCCks6Zald3G2tlpu21iqtZ6pSZgx+XGAISIkPqiOUwjsrZWfWCjd/SDyn5kGxQcwKRl+RcVo03/lmFoSvoQmN8tSEvmzeBGTPj2Czx6QxQko2SER7h5XODQLcOvDpcBdIeHxk6Q3bhKoyzHQgN+55zuHcfYZ0c3c54ksGNOQQ5UUKGNCFPfqs9kv+6uMGcxWBW9lmWo7DgussokCESZGXKJM3H8SR1MVlrJUq87+9k9E4uZzY9mBmusnk2CFhDqSSgg6Lm9fa89bsbmS/+M6a4b3eXLY+pGGiVucb/h6Nzpkbcqv85xJ0mGdesXlijp2JeSQ5uw=='
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
Cypress.Commands.add('makeSubscriptionActive', (email) => {
  const apiKey = 'Bearer pdl_sdbx_apikey_01jyzyzvffvas72er4e60qm7gk_7MY1ajc7gCMXNj9WwsWj8X_AJE';

  // Step 1: Get customer by email
  cy.request({
    method: 'GET',
    url: 'https://sandbox-api.paddle.com/customers',
    headers: {
      Authorization: apiKey,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then((res) => {
    const customer = res.body.data.find(c => c.email === email);

    if (!customer) throw new Error(`No customer found with email: ${email}`);

    const customerId = customer.id;
    Cypress.env('customerId', customerId);

    // Step 2: Get subscription by customer ID
    cy.request({
      method: 'GET',
      url: 'https://sandbox-api.paddle.com/subscriptions',
      headers: {
        Authorization: apiKey,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      const subscription = res.body.data.find(s => s.customer_id === customerId);

      if (!subscription) throw new Error(`No subscription found for customer ID: ${customerId}`);

      const subscriptionId = subscription.id;
      Cypress.env('subscriptionId', subscriptionId);

      // Step 3: Activate the subscription
      cy.request({
        method: 'POST',
        url: `https://sandbox-api.paddle.com/subscriptions/${subscriptionId}/activate`,
        headers: {
          Authorization: apiKey,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }).then((res) => {
        cy.log('Subscription activated:', res.body);
        expect(res.status).to.eq(200);
      });
    });
  });
});


