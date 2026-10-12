import { acessarPaginaInicial } from '../modules/home'
import {
  acessarProdutos,
  validarPaginaDeProdutos,
  validarListaDeProdutos,
  abrirPrimeiroProduto,
  validarDetalhesDoProduto,
  pesquisarProduto,
  validarResultadoUnicoDaPesquisa,
} from '../modules/produtos'
import { blueTop } from '../fixtures/produtos.json'

describe('Catálogo e pesquisa de produtos', () => {
  beforeEach(() => {
    acessarPaginaInicial()
  })

  it('TC08 - deve exibir todos os produtos e os detalhes do primeiro produto', () => {
    const produto = blueTop

    acessarProdutos()

    validarPaginaDeProdutos()
    validarListaDeProdutos()

    abrirPrimeiroProduto()

    validarDetalhesDoProduto(produto)
  })

  it('TC09 - deve pesquisar um produto e exibir resultados relacionados', () => {
    const nomeProduto = blueTop.nome

    acessarProdutos()

    validarPaginaDeProdutos()

    pesquisarProduto(nomeProduto)

    validarResultadoUnicoDaPesquisa(nomeProduto)
  })
})
