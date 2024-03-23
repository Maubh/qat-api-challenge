const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8080/api/v3'
    },
    fixturesFolder: false,
    videos: false,
    reporter: "cypress-multi-reporters",
    reporterOptions: {
      configFile: "reporter-config.json"
    }
})


















