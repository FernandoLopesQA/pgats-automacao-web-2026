import { acessarTelaDeLogin } from '../modules/home'
import {
  iniciarCadastro,
  preencherCadastroComUsuario,
  validarCadastroComSucesso,
  verificarMensagemDeCadastroExistente,
  deletarCadastro,
  validarFormularioDeNovoUsuario,
  validarInformacoesDaConta,
  continuarAposCadastro,
} from '../modules/cadastro'
import { efetuarLogin, validarUsuarioLogado, efetuarLogout, validarFormularioDeLogin, validarMensagemDeLoginInvalido } from '../modules/login'
import { faker } from '@faker-js/faker'
import { criarUsuario } from '../factories/usuario'

describe('Cadastro e autenticação de usuários', () => {
  beforeEach(() => {
    acessarTelaDeLogin()
  })

  const usuarioExistente = {
    nome: 'Teste CT02',
    email: 'testct02@uorak.com',
    senha: '123456',
  }

  it('TC01 - deve cadastrar um usuário, confirmar o login e excluir a conta', () => {
    const usuario = criarUsuario()

    validarFormularioDeNovoUsuario()

    iniciarCadastro(usuario.nome, usuario.email)

    validarInformacoesDaConta(usuario.nome, usuario.email)

    preencherCadastroComUsuario(usuario)

    validarCadastroComSucesso()
    continuarAposCadastro()

    validarUsuarioLogado(usuario.nome)

    deletarCadastro()
  })

  it('TC02 - deve logar usuário com e-mail e senha corretos', () => {
    // Pré-condição: a conta deve existir antes da execução.
    validarFormularioDeLogin()

    efetuarLogin(usuarioExistente.email, usuarioExistente.senha)

    validarUsuarioLogado(usuarioExistente.nome)
  })

  it('TC03 - deve exibir erro ao tentar fazer login com e-mail e senha incorretos', () => {
    const email = `invalido.${faker.string.uuid()}@example.com`
    const senha = faker.internet.password({ length: 12 })

    validarFormularioDeLogin()

    efetuarLogin(email, senha)

    validarMensagemDeLoginInvalido()
  })

  it('TC04 - deve fazer login e retornar à página de login após o logout', () => {
    validarFormularioDeLogin()

    efetuarLogin(usuarioExistente.email, usuarioExistente.senha)

    validarUsuarioLogado(usuarioExistente.nome)

    efetuarLogout()
  })

  it('TC05 - deve exibir erro ao tentar cadastrar um usuário com e-mail já registrado', () => {
    validarFormularioDeNovoUsuario()

    iniciarCadastro(usuarioExistente.nome, usuarioExistente.email)

    verificarMensagemDeCadastroExistente()
  })
})
