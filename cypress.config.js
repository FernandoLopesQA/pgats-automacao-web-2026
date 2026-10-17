const { defineConfig } = require('cypress')

module.exports = defineConfig({
  screenshotOnRunFailure: false,
  // retries: 1,
  // Evita carregar publicidade durante os testes do site de exercícios.
  blockHosts: ['*.googlesyndication.com', '*.doubleclick.net'],
  // Mantém apenas o último teste no histórico de snapshots do modo interativo.
  numTestsKeptInMemory: 1,
  reporter: 'cypress-mochawesome-reporter',
  e2e: {
    baseUrl: 'https://automationexercise.com/',
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on)
    },
  },
})
