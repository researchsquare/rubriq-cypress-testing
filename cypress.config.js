const { defineConfig } = require("cypress");
const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');

module.exports = defineConfig({
  chromeWebSecurity: false,
  scrollBehavior: 'center',
  experimentalModifyObstructiveThirdPartyCode: true,
  fixturesFolder: "cypress/fixtures",
  screenshotsFolder: "cypress/screenshots",
  downloadsFolder: 'cypress/downloads',
  videosFolder: "cypress/videos",
  video: true,
  screenshotOnRunFailure: true,
  viewportWidth: 1920,
  viewportHeight: 1080,
  retries: {
    runMode: 2,
    openMode: 2
  },
  e2e: {
    baseUrl: 'https://secure-aje.staging.sqr.io/rubriq',
    specPattern: 'cypress/e2e/rubriq/**/*.cy.{js,jsx,ts,tsx}',
    trashAssetsBeforeRuns: true,
    supportFile: "cypress/support/e2e.js",
    setupNodeEvents(on, config) {
      on('task', {
        deleteDownloads() {
          const downloadsFolder = path.join(__dirname, '..', '..', 'downloads');
          fs.emptyDirSync(downloadsFolder);
          return null;
        }
      });
      on('task', {
        checkFileDownload(filename) {
          const downloadsFolder = path.join(__dirname, 'downloads');
          const filePath = path.join(downloadsFolder, filename);
          return fs.existsSync(filePath);
        },
      });
      return require('./cypress/plugins/index.js')(on, config);
     
    },
    defaultCommandTimeout: 100000,
    responseTimeout: 100000,
    pageLoadTimeout: 100000,
    execTimeout: 60000
  },
});
