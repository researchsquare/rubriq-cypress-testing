const { defineConfig } = require('cypress');
const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');

module.exports = defineConfig({
  chromeWebSecurity: false,
  scrollBehavior: 'center',
  experimentalModifyObstructiveThirdPartyCode: true,
  e2e: {
    viewportWidth: 1920,
    viewportHeight: 1080,
    retries: {
      runMode: 2,
      openMode: 2
    },
    setupNodeEvents(on, config) {
      on('task', {
        readPdf(pathToPdf) {
          return new Promise((resolve) => {
            const pdfPath = path.resolve(pathToPdf);
            let dataBuffer = fs.readFileSync(pdfPath);
            pdf(dataBuffer).then(function ({ text }) {
              resolve(text);
            });
          });
        }
      });
      
      return require('./cypress/plugins/index.js')(on, config);
    },
    baseUrl: 'https://secure-aje.staging.sqr.io',
    specPattern: 'cypress/e2e/rubriq/**/*.cy.{js,jsx,ts,tsx}',
    trashAssetsBeforeRuns: true,
    // Add or increase timeouts
    defaultCommandTimeout: 100000,  // Default command timeout (10 seconds)
    responseTimeout: 15000,        // Timeout for network responses (15 seconds)
    pageLoadTimeout: 30000,        // Timeout for page loads (30 seconds)
    execTimeout: 60000,            // Timeout for executing commands (60 seconds)
  },
});

