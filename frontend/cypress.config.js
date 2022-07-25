const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: '8qj2ia',
  e2e: {
    video: false,
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
