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
import { cadastrarUsuarioPorApi, removerUsuarioPorApi } from '../modules/usuarios-api'

describe('Cadastro e autenticação de usuários', () => {
  let usuario

  beforeEach(() => {
    usuario = criarUsuario()
  })

  afterEach(() => {
    removerUsuarioPorApi(usuario)
  })

  it('TC01 - deve cadastrar um usuário, confirmar o login e excluir a conta', () => {
    acessarTelaDeLogin()

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
    cadastrarUsuarioPorApi(usuario)

    acessarTelaDeLogin()
    validarFormularioDeLogin()

    efetuarLogin(usuario.email, usuario.senha)
    validarUsuarioLogado(usuario.nome)

    deletarCadastro()
  })

  it('TC03 - deve exibir erro ao tentar fazer login com e-mail e senha incorretos', () => {
    const email = `invalido.${faker.string.uuid()}@example.com`
    const senha = faker.internet.password({ length: 12 })

    acessarTelaDeLogin()

    validarFormularioDeLogin()

    efetuarLogin(email, senha)

    validarMensagemDeLoginInvalido()
  })

  it('TC04 - deve fazer login e retornar à página de login após o logout', () => {
    cadastrarUsuarioPorApi(usuario)

    acessarTelaDeLogin()
    validarFormularioDeLogin()

    efetuarLogin(usuario.email, usuario.senha)
    validarUsuarioLogado(usuario.nome)

    efetuarLogout()
  })

  it('TC05 - deve exibir erro ao tentar cadastrar um usuário com e-mail já registrado', () => {
    cadastrarUsuarioPorApi(usuario)

    acessarTelaDeLogin()
    validarFormularioDeNovoUsuario()

    iniciarCadastro(usuario.nome, usuario.email)
    verificarMensagemDeCadastroExistente()
  })
})
