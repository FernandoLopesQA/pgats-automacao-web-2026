export function preencherDadosDePagamento(pagamento) {
  cy.get('[data-qa="name-on-card"]').type(pagamento.nomeTitular)
  cy.get('[data-qa="card-number"]').type(pagamento.numero)
  cy.get('[data-qa="cvc"]').type(pagamento.cvc)
  cy.get('[data-qa="expiry-month"]').type(pagamento.mes)
  cy.get('[data-qa="expiry-year"]').type(pagamento.ano)
}

export function confirmarPagamento() {
  cy.get('[data-qa="pay-button"]').click()
}

export function validarPedidoComSucesso() {
  cy.location('pathname').should('match', /^\/payment_done\/\d+$/)

  cy.get('[data-qa="order-placed"]').should('be.visible').and('contain.text', 'Order Placed!')

  cy.contains('p', 'Congratulations! Your order has been confirmed!').should('be.visible')
}
