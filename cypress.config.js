const { defineConfig } = require("cypress");
const fs = require('fs-extra');
const path = require('path');
//const pdf = require('pdf-parse');

module.exports = defineConfig({
  scrollBehavior: 'center',
  experimentalModifyObstructiveThirdPartyCode: true,
  fixturesFolder: "cypress/fixtures",
  screenshotsFolder: "cypress/screenshots",
  downloadsFolder: 'cypress/downloads',
  videosFolder: "cypress/videos",
  video: true,
  watchForFileChanges: false,
  screenshotOnRunFailure: true,
  viewportWidth: 1920,
  viewportHeight: 1080,
  retries: {
    runMode: 0,
    openMode: 0
  },
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'Rubriq Report',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },
  e2e: {
    baseUrl: 'https://rubriq-release-aje.staging.sqr.io',
    specPattern: 'cypress/e2e/rubriq/**/*.cy.{js,jsx,ts,tsx}',
    trashAssetsBeforeRuns: true,
    supportFile: "cypress/support/e2e.js",
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      on('task', {
        // Task to delete a file from the downloads folder
        deleteFile(fileName) {
          const downloadsFolder = path.join(__dirname, 'cypress', 'downloads');
          const filePath = path.join(downloadsFolder, fileName);
    
          // Check if the file exists before trying to delete
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath); // Delete the file
            return null; // Return null to indicate success
          } else {
            return `File not found: ${filePath}`;
          }
        },
      });
      on('task', {
        checkFileDownload(filename) {
          const downloadsFolder = path.join(__dirname, '..', '..', 'downloads');
          const filePath = path.join(downloadsFolder, filename);
          console.log('Checking file path:', filePath);
          return fs.existsSync(filePath);
        },
      });
      return require('./cypress/plugins/index.js')(on, config);
      
     
    },
    defaultCommandTimeout: 40000,
    responseTimeout: 30000,
    pageLoadTimeout: 30000,
    execTimeout: 60000,
    chromeWebSecurity: false,
    experimentalStudio: true,
  },
});
