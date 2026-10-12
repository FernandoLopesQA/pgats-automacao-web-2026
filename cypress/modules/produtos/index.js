export function acessarProdutos() {
  cy.get('a[href="/products"]').click()
}

export function validarPaginaDeProdutos() {
  cy.location('pathname').should('eq', '/products')
  cy.contains('h2', 'All Products').should('be.visible')
}

export function validarListaDeProdutos() {
  cy.get('.features_items .product-image-wrapper')
    .should('have.length.greaterThan', 0)
    .each(($produto) => {
      cy.wrap($produto).should('be.visible')
    })
}

export function abrirPrimeiroProduto() {
  cy.get('.features_items a[href^="/product_details/"]').first().click()
}

export function validarDetalhesDoProduto(produto) {
  cy.location('pathname').should('eq', `/product_details/${produto.id}`)

  cy.get('.product-information')
    .should('be.visible')
    .within(() => {
      cy.get('h2').should('be.visible').and('have.text', produto.nome)

      cy.contains('p', `Category: ${produto.categoria}`).should('be.visible')

      cy.contains('span', `Rs. ${produto.preco}`).should('be.visible')

      cy.contains('p', 'Availability:').should('be.visible').and('contain.text', produto.disponibilidade)

      cy.contains('p', 'Condition:').should('be.visible').and('contain.text', produto.condicao)

      cy.contains('p', 'Brand:').should('be.visible').and('contain.text', produto.marca)
    })
}

export function pesquisarProduto(termo) {
  cy.get('#search_product').clear().type(termo)
  cy.get('#submit_search').click()
}

export function validarResultadosDaPesquisa(nomeEsperado) {
  cy.contains('h2', 'Searched Products').should('be.visible')

  cy.get('.features_items .product-image-wrapper').should('have.length', 1).and('be.visible')

  cy.get('.features_items .productinfo p').should('be.visible').and('have.text', nomeEsperado)
}
