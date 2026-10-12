import { faker } from '@faker-js/faker'
import { criarUsuario } from '../factories/usuario'
import { criarPagamento } from '../factories/pagamento'
import { acessarTelaDeLogin } from '../modules/home'
import {
  validarFormularioDeNovoUsuario,
  iniciarCadastro,
  validarInformacoesDaConta,
  preencherCadastroComUsuario,
  validarCadastroComSucesso,
  continuarAposCadastro,
  deletarCadastro,
} from '../modules/cadastro'
import { validarUsuarioLogado, validarFormularioDeLogin, efetuarLogin, efetuarLogout } from '../modules/login'
import {
  adicionarProdutoAoCarrinho,
  acessarCarrinho,
  validarPaginaDoCarrinho,
  validarProdutoNoCarrinho,
  prosseguirParaCheckout,
} from '../modules/carrinho'
import { validarEnderecosDoCheckout, validarResumoDoPedido, preencherComentarioDoPedido, prosseguirParaPagamento } from '../modules/checkout'
import { preencherDadosDePagamento, confirmarPagamento, validarPedidoComSucesso } from '../modules/pagamento'
import { blueTop } from '../fixtures/produtos.json'

describe('Realização de pedidos', () => {
  it('TC15 - deve cadastrar um usuário antes do checkout e concluir o pedido', () => {
    const usuario = criarUsuario()
    const pagamento = criarPagamento(usuario.nome)
    const comentario = faker.lorem.sentence()

    const produto = {
      ...blueTop,
      quantidade: 1,
    }

    // Acessar a página inicial e navegar para cadastro.
    acessarTelaDeLogin()
    validarFormularioDeNovoUsuario()

    // Cadastrar e validar o usuário.
    iniciarCadastro(usuario.nome, usuario.email)
    validarInformacoesDaConta(usuario.nome, usuario.email)
    preencherCadastroComUsuario(usuario)
    validarCadastroComSucesso()
    continuarAposCadastro()
    validarUsuarioLogado(usuario.nome)

    // Adicionar o produto e conferir o carrinho.
    adicionarProdutoAoCarrinho(produto.id)
    acessarCarrinho()
    validarPaginaDoCarrinho()
    validarProdutoNoCarrinho(produto)

    // Conferir os endereços e o pedido.
    prosseguirParaCheckout()
    validarEnderecosDoCheckout(usuario)
    validarResumoDoPedido(produto)
    preencherComentarioDoPedido(comentario)
    prosseguirParaPagamento()

    // Pagar e validar a confirmação.
    preencherDadosDePagamento(pagamento)
    confirmarPagamento()
    validarPedidoComSucesso()

    // Excluir a conta criada para este cenário.
    deletarCadastro()
  })

  describe('TC16 - compra com usuário previamente cadastrado', () => {
    let usuario

    beforeEach(() => {
      usuario = criarUsuario()

      // Pré-condição: criar uma conta própria e encerrar a sessão.
      acessarTelaDeLogin()
      validarFormularioDeNovoUsuario()
      iniciarCadastro(usuario.nome, usuario.email)
      validarInformacoesDaConta(usuario.nome, usuario.email)
      preencherCadastroComUsuario(usuario)
      validarCadastroComSucesso()
      continuarAposCadastro()
      validarUsuarioLogado(usuario.nome)
      efetuarLogout()
    })

    it('TC16 - deve fazer login antes do checkout e concluir o pedido', () => {
      const pagamento = criarPagamento(usuario.nome)
      const comentario = faker.lorem.sentence()

      const produto = {
        ...blueTop,
        quantidade: 1,
      }

      // Acessar a página inicial e realizar o login.
      acessarTelaDeLogin()
      validarFormularioDeLogin()
      efetuarLogin(usuario.email, usuario.senha)
      validarUsuarioLogado(usuario.nome)

      // Adicionar o produto e conferir o carrinho.
      adicionarProdutoAoCarrinho(produto.id)
      acessarCarrinho()
      validarPaginaDoCarrinho()
      validarProdutoNoCarrinho(produto)

      // Conferir os endereços e o pedido.
      prosseguirParaCheckout()
      validarEnderecosDoCheckout(usuario)
      validarResumoDoPedido(produto)
      preencherComentarioDoPedido(comentario)
      prosseguirParaPagamento()

      // Pagar e validar a confirmação.
      preencherDadosDePagamento(pagamento)
      confirmarPagamento()
      validarPedidoComSucesso()

      // Excluir a conta utilizada no cenário.
      deletarCadastro()
    })
  })
})
