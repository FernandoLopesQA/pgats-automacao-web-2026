import { validarProdutoNoCarrinho } from '../carrinho'

function validarEndereco(seletor, usuario) {
  cy.get(seletor)
    .should('be.visible')
    .within(() => {
      cy.get('.address_firstname.address_lastname').should('contain.text', `${usuario.primeiroNome} ${usuario.sobrenome}`)

      cy.get('.address_address1.address_address2')
        .should('have.length', 3)
        .then(($linhas) => {
          expect($linhas.eq(0).text().trim()).to.eq(usuario.empresa)
          expect($linhas.eq(1).text().trim()).to.eq(usuario.endereco)
          expect($linhas.eq(2).text().trim()).to.eq(usuario.complemento)
        })

      cy.get('.address_city.address_state_name.address_postcode').should(($endereco) => {
        const texto = $endereco.text().replace(/\s+/g, ' ').trim()

        expect(texto).to.eq(`${usuario.cidade} ${usuario.estado} ${usuario.cep}`)
      })

      cy.get('.address_country_name').should('have.text', usuario.pais)

      cy.get('.address_phone').should('have.text', usuario.telefone)
    })
}

export function validarEnderecosDoCheckout(usuario) {
  cy.location('pathname').should('eq', '/checkout')

  cy.contains('h2', 'Address Details').should('be.visible')

  validarEndereco('#address_delivery', usuario)
  validarEndereco('#address_invoice', usuario)
}

export function validarResumoDoPedido(produto) {
  cy.contains('h2', 'Review Your Order').should('be.visible')

  cy.get('#cart_info tbody tr[id^="product-"]').should('have.length', 1)

  validarProdutoNoCarrinho(produto)

  cy.contains('tr', 'Total Amount')
    .find('.cart_total_price')
    .should('have.text', `Rs. ${produto.preco * produto.quantidade}`)
}

export function preencherComentarioDoPedido(comentario) {
  cy.get('textarea[name="message"]').clear().type(comentario)
}

export function prosseguirParaPagamento() {
  cy.contains('a', 'Place Order').click()

  cy.location('pathname').should('eq', '/payment')
  cy.contains('h2', 'Payment').should('be.visible')
}
