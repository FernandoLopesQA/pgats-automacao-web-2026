import { acessarPaginaInicial } from '../modules/home'
import {
  acessarProdutos,
  validarPaginaDeProdutos,
  validarListaDeProdutos,
  abrirPrimeiroProduto,
  validarDetalhesDoProduto,
  pesquisarProduto,
  validarResultadosDaPesquisa,
} from '../modules/produtos'

describe('Catálogo e pesquisa de produtos', () => {
  beforeEach(() => {
    acessarPaginaInicial()
  })

  it('TC08 - deve exibir todos os produtos e os detalhes do primeiro produto', () => {
    const produto = {
      id: 1,
      nome: 'Blue Top',
      categoria: 'Women > Tops',
      preco: 'Rs. 500',
      disponibilidade: 'In Stock',
      condicao: 'New',
      marca: 'Polo',
    }

    acessarProdutos()

    validarPaginaDeProdutos()
    validarListaDeProdutos()

    abrirPrimeiroProduto()

    validarDetalhesDoProduto(produto)
  })

  it('TC09 - deve pesquisar um produto e exibir resultados relacionados', () => {
    const nomeProduto = 'Blue Top'

    acessarProdutos()

    validarPaginaDeProdutos()

    pesquisarProduto(nomeProduto)

    validarResultadosDaPesquisa(nomeProduto)
  })
})
