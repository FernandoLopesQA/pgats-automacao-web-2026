export function acessarPaginaInicial() {
  cy.visit('/')
  cy.location('pathname').should('eq', '/')
  cy.get('#slider').should('be.visible')
}

export function acessarTelaDeLogin() {
  acessarPaginaInicial()
  cy.get('a[href="/login"]').click()
}
