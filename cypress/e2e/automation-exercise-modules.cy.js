import {
  iniciarCadastro,
  preencherEEnviarCadastro,
  validarCadastroComSucesso,
  verificarMensagemDeCadastroExistente,
  deletarCadastro,
} from '../modules/cadastro'
import { efetuarLogin, validarUsuarioLogado, efetuarLogout } from '../modules/login'

describe('Cadastro e autenticação de usuários', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.location('pathname').should('eq', '/')
    cy.get('#slider').should('be.visible')
    cy.get('a[href="/login"]').click()
  })

  const usuarioExistente = {
    nome: 'Teste CT02',
    email: 'testct02@uorak.com',
    senha: '123456',
  }

  it('TC01 - deve cadastrar um usuário, confirmar o login e excluir a conta', () => {
    cy.xpath('//h2[contains(.,"New User Signup!")]').should('be.visible')

    const email = `pgats.${Date.now()}@example.com`

    iniciarCadastro('PGATS Aut', email)

    cy.xpath('//h2[normalize-space(.)="Enter Account Information"]').should('be.visible')

    cy.get('[data-qa="name"]').should('have.value', 'PGATS Aut')
    cy.get('[data-qa="email"]').should('have.value', email)

    preencherEEnviarCadastro('12345')

    validarCadastroComSucesso()
    cy.get('[data-qa="continue-button"]').click()

    validarUsuarioLogado('PGATS Aut')

    deletarCadastro()
  })

  it('TC02 - deve logar usuário com e-mail e senha corretos', () => {
    // Pré-condição: a conta deve existir antes da execução.

    cy.contains('h2', 'Login to your account').should('be.visible')

    efetuarLogin(usuarioExistente.email, usuarioExistente.senha)

    // Confirma a mensagem de login e o nome esperado da conta.
    validarUsuarioLogado(usuarioExistente.nome)

    // cy.get('a[href="/delete_account"]').click()
    // cy.get('[data-qa="account-deleted"]').should('be.visible').and('contain.text', 'Account Deleted!')
  })

  it('TC03 - deve exibir erro ao tentar fazer login com e-mail e senha incorretos', () => {
    const email = `invalido.${Date.now()}@example.com`
    const senha = 'senha-incorreta'

    cy.contains('h2', 'Login to your account').should('be.visible')

    efetuarLogin(email, senha)

    cy.contains('p', 'Your email or password is incorrect!').should('be.visible')
  })

  it('TC04 - deve fazer login e retornar à página de login após o logout', () => {
    cy.contains('h2', 'Login to your account').should('be.visible')

    efetuarLogin(usuarioExistente.email, usuarioExistente.senha)

    validarUsuarioLogado(usuarioExistente.nome)

    efetuarLogout()
  })

  it('TC05 - deve exibir erro ao tentar cadastrar um usuário com e-mail já registrado', () => {
    cy.contains('h2', 'New User Signup!').should('be.visible')

    iniciarCadastro(usuarioExistente.nome, usuarioExistente.email)

    verificarMensagemDeCadastroExistente()
  })
})
