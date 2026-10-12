export function acessarTelaDeLogin() {
  cy.visit('/')
  cy.location('pathname').should('eq', '/')
  cy.get('#slider').should('be.visible')
  cy.get('a[href="/login"]').click()
}