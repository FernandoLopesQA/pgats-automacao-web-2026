const { defineConfig } = require('cypress')

module.exports = defineConfig({
  screenshotOnRunFailure: true,
  // retries: 1,
  // Evita carregar publicidade durante os testes do site de exercícios.
  blockHosts: ['*.googlesyndication.com', '*.doubleclick.net'],
  // Mantém apenas o último teste no histórico de snapshots do modo interativo.
  numTestsKeptInMemory: 1,
  reporter: 'cypress-multi-reporters',
  reporterOptions: {
    reporterEnabled: 'cypress-mochawesome-reporter, mocha-junit-reporter',

    cypressMochawesomeReporterReporterOptions: {
      reportDir: 'cypress/reports',
      reportFilename: 'index',
      reportPageTitle: 'PGATS - Automação Web',
      charts: true,
      embeddedScreenshots: true,
      inlineAssets: true,
      saveJson: true,
    },

    mochaJunitReporterReporterOptions: {
      mochaFile: 'cypress/reports/junit/results-[hash].xml',
    },
  },
  e2e: {
    baseUrl: 'https://automationexercise.com/',
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on)
    },
  },
})
