export function validarSecaoDeInscricao() {
  cy.get('#footer').scrollIntoView()

  cy.contains('#footer h2', /^Subscription$/i).should('be.visible')
}

export function realizarInscricao(email) {
  cy.get('#susbscribe_email').clear().type(email)
  cy.get('#subscribe').click()
}

export function validarInscricaoComSucesso() {
  cy.get('#success-subscribe').should('be.visible').and('contain.text', 'You have been successfully subscribed!')
}
