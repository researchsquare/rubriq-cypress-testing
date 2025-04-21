const { defineConfig } = require("cypress");
const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');

module.exports = defineConfig({
  chromeWebSecurity: false,
  scrollBehavior: 'center',
  experimentalModifyObstructiveThirdPartyCode: true,
  e2eFolder: "cypress/e2e/",
  screenshotsFolder: "cypress/screenshots",
  videosFolder: "cypress/videos",
  video: false,
  screenshotOnRunFailure: false,

  e2e: {
    viewportWidth: 1920,
    viewportHeight: 1080,
    retries: {
      runMode: 2,
      openMode: 2
    },
    baseUrl: 'https://secure-aje.staging.sqr.io/rubriq',
    specPattern: 'cypress/e2e/rubriq/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: "cypress/support/e2e.js",
    fixturesFolder: "cypress/fixtures",

    trashAssetsBeforeRuns: true,
    // Add or increase timeouts
    defaultCommandTimeout: 10000,  // Default command timeout (10 seconds)
    responseTimeout: 15000,        // Timeout for network responses (15 seconds)
    pageLoadTimeout: 30000,        // Timeout for page loads (30 seconds)
    execTimeout: 60000,            // Timeout for executing commands (60 seconds)

    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config);
    },
  },
});
