import { faker } from '@faker-js/faker'

// Sobre os aspectos observados:
//
// - Legibilidade: achei os seletores XPath mais extensos e menos fáceis de
// identificar rapidamente, especialmente nas expressões mais complexas.
//
// - Velocidade de execução: nas execuções que comparei, a versão com XPath,
// sem modularização, terminou entre 5 e 6 segundos antes da versão modularizada.
// Essa diferença, por si só, não permite concluir que XPath seja mais rápido,
// pois fatores como carregamento da página e rede podem influenciar o tempo.
//
// - Minhas percepções: considero importante conhecer XPath, principalmente
// para localizar elementos pelo texto ou pela relação com outros elementos.
// Prefiro seletores simples e atributos estáveis quando estão disponíveis.
// A fragilidade depende de como o seletor é construído: caminhos absolutos
// e seletores dependentes da posição dos elementos tendem a quebrar com
// mudanças na página. Usaria XPath quando trouxesse uma vantagem clara.

describe('Cadastro e autenticação de usuários', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.location('pathname').should('eq', '/')
    cy.xpath('//*[@id="slider"]').should('be.visible')
    cy.xpath('//a[@href="/login"]').click()
  })

  const usuarioExistente = {
    nome: 'Teste CT02',
    email: 'testct02@uorak.com',
    senha: '123456',
  }

  it('TC01 - deve cadastrar um usuário, confirmar o login e excluir a conta', () => {
    cy.xpath('//h2[contains(.,"New User Signup!")]').should('be.visible')

    const nome = faker.person.firstName()
    const email = `pgats.${faker.string.uuid()}@example.com`
    const senha = faker.internet.password({ length: 12 })

    cy.xpath('//*[@data-qa="signup-name"]').type(nome)
    cy.xpath('//*[@data-qa="signup-email"]').type(email)
    cy.xpath('//*[@data-qa="signup-button"]').click()

    cy.xpath('//h2[normalize-space(.)="Enter Account Information"]').should('be.visible')

    cy.xpath('//*[@data-qa="name"]').should('have.value', nome)
    cy.xpath('//*[@data-qa="email"]').should('have.value', email)

    // Radio buttons -> check
    cy.xpath('//*[@id="id_gender2"]').check().should('be.checked')

    cy.xpath('//*[@data-qa="password"]').type(senha, { log: false })

    // Selects e comboboxes -> select
    cy.xpath('//*[@data-qa="days"]').select('1')
    cy.xpath('//*[@data-qa="months"]').select('1')
    cy.xpath('//*[@data-qa="years"]').select('1990')

    // Checkboxes -> check
    cy.xpath('//*[@id="newsletter"]').check().should('be.checked')
    cy.xpath('//*[@name="optin"]').check().should('be.checked')

    cy.xpath('//*[@data-qa="first_name"]').type('PGATS')
    cy.xpath('//*[@data-qa="last_name"]').type('Aut')
    cy.xpath('//*[@data-qa="company"]').type('PGATS')
    cy.xpath('//*[@data-qa="address"]').type('OAK Street')
    cy.xpath('//*[@data-qa="address2"]').type('The end of')
    cy.xpath('//*[@data-qa="country"]').select('United States')
    cy.xpath('//*[@data-qa="state"]').type('California')
    cy.xpath('//*[@data-qa="city"]').type('San Francisco')
    cy.xpath('//*[@data-qa="zipcode"]').type('12345')
    cy.xpath('//*[@data-qa="mobile_number"]').type('51987654321')

    cy.xpath('//*[@data-qa="create-account"]').click()

    cy.xpath('//h2[normalize-space(.)="Account Created!"]').should('be.visible')

    cy.xpath('//p[normalize-space(.)="Congratulations! Your new account has been successfully created!"]').should('be.visible')

    cy.xpath(
      '//p[normalize-space(.)="You can now take advantage of member privileges to enhance your online shopping experience with us."]',
    ).should('be.visible')

    cy.xpath('//*[@data-qa="continue-button"]').click()

    cy.xpath('//a[contains(., "Logged in as")]').should('be.visible').xpath('.//b').should('be.visible').and('have.text', nome)

    cy.xpath('//a[contains(@href, "/delete_account")]').click()

    cy.xpath('//h2[@data-qa="account-deleted"]').should('be.visible').and('contain.text', 'Account Deleted!')

    cy.xpath('//*[@data-qa="continue-button"]').click()

    cy.location('pathname').should('eq', '/')
    cy.xpath('//*[@id="slider"]').should('be.visible')
  })

  it('TC02 - deve logar usuário com e-mail e senha corretos', () => {
    // Pré-condição: a conta deve existir antes da execução.

    cy.xpath('//h2[normalize-space(.)="Login to your account"]').should('be.visible')

    cy.xpath('//*[@data-qa="login-email"]').type(usuarioExistente.email)
    cy.xpath('//*[@data-qa="login-password"]').type(usuarioExistente.senha, { log: false })
    cy.xpath('//*[@data-qa="login-button"]').click()

    // Confirma a mensagem de login e o nome esperado da conta.
    cy.xpath('//a[contains(., "Logged in as")]').should('be.visible').xpath('.//b').should('be.visible').and('have.text', usuarioExistente.nome)
  })

  it('TC03 - deve exibir erro ao tentar fazer login com e-mail e senha incorretos', () => {
    const email = `invalido.${faker.string.uuid()}@example.com`
    const senha = faker.internet.password({ length: 12 })

    cy.xpath('//h2[normalize-space(.)="Login to your account"]').should('be.visible')

    cy.xpath('//*[@data-qa="login-email"]').type(email)
    cy.xpath('//*[@data-qa="login-password"]').type(senha, { log: false })
    cy.xpath('//*[@data-qa="login-button"]').click()

    cy.xpath('//p[normalize-space(.)="Your email or password is incorrect!"]').should('be.visible')
  })

  it('TC04 - deve fazer login e retornar à página de login após o logout', () => {
    cy.xpath('//h2[normalize-space(.)="Login to your account"]').should('be.visible')

    cy.xpath('//*[@data-qa="login-email"]').type(usuarioExistente.email)
    cy.xpath('//*[@data-qa="login-password"]').type(usuarioExistente.senha, { log: false })
    cy.xpath('//*[@data-qa="login-button"]').click()

    cy.xpath('//a[contains(., "Logged in as")]').should('be.visible').xpath('.//b').should('be.visible').and('have.text', usuarioExistente.nome)

    cy.xpath('//a[@href="/logout"]').click()

    cy.location('pathname').should('eq', '/login')

    cy.xpath('//h2[normalize-space(.)="Login to your account"]').should('be.visible')

    cy.xpath('//a[contains(., "Logged in as")]').should('not.exist')
  })

  it('TC05 - deve exibir erro ao tentar cadastrar um usuário com e-mail já registrado', () => {
    cy.xpath('//h2[normalize-space(.)="New User Signup!"]').should('be.visible')

    cy.xpath('//*[@data-qa="signup-name"]').type(usuarioExistente.nome)
    cy.xpath('//*[@data-qa="signup-email"]').type(usuarioExistente.email)
    cy.xpath('//*[@data-qa="signup-button"]').click()

    cy.xpath('//p[normalize-space(.)="Email Address already exist!"]').should('be.visible')
  })
})
