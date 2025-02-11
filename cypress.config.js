const { defineConfig } = require("cypress");

module.exports = defineConfig({
  chromeWebSecurity: false,
  fixturesFolder: "cypress/fixtures",
  e2eFolder: "cypress/e2e/",
  supportFile: "cypress/support/e2e.js",
  pluginsFile: "cypress/plugins/index.js",
  screenshotsFolder: "cypress/screenshots",
  videosFolder: "cypress/videos",
  video: false,
  screenshotOnRunFailure: false,

  e2e: {
        setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
