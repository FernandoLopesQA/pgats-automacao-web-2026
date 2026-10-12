export function adicionarProdutoAoCarrinho(idProduto) {
  cy.get(`.features_items .productinfo a[data-product-id="${idProduto}"]`).click()

  cy.get('#cartModal').should('be.visible')

  cy.contains('#cartModal', 'Your product has been added to cart.').should('be.visible')

  cy.contains('#cartModal button', 'Continue Shopping').click()

  cy.get('#cartModal').should('not.be.visible')
}

export function acessarCarrinho() {
  cy.get('header a[href="/view_cart"]').click()
}

export function validarPaginaDoCarrinho() {
  cy.location('pathname').should('eq', '/view_cart')
  cy.get('#cart_info').should('be.visible')
}

export function validarProdutoNoCarrinho(produto) {
  cy.get(`#product-${produto.id}`)
    .should('be.visible')
    .within(() => {
      cy.get('.cart_description a').should('have.text', produto.nome)

      cy.get('.cart_price').should('contain.text', `Rs. ${produto.preco}`)

      cy.get('.cart_quantity button').should('have.text', String(produto.quantidade))

      cy.get('.cart_total_price').should('have.text', `Rs. ${produto.preco * produto.quantidade}`)
    })
}

export function prosseguirParaCheckout() {
  cy.contains('a', 'Proceed To Checkout').click()
  cy.location('pathname').should('eq', '/checkout')
}
