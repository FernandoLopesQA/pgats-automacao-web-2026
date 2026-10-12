export function efetuarLogin(email, senha) {
  cy.get('[data-qa="login-email"]').type(email)
  cy.get('[data-qa="login-password"]').type(senha, { log: false })
  cy.get('[data-qa="login-button"]').click()
}

export function validarUsuarioLogado(nome) {
  cy.contains('a', 'Logged in as').should('be.visible').find('b').should('be.visible').and('have.text', nome)
}

export function efetuarLogout() {
  cy.get('a[href="/logout"]').click()
  cy.location('pathname').should('eq', '/login')
  cy.contains('h2', 'Login to your account').should('be.visible')
  cy.contains('a', 'Logged in as').should('not.exist')
}
