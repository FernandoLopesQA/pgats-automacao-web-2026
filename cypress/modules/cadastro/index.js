export function iniciarCadastro(nome, email) {
  cy.get('[data-qa="signup-name"]').type(nome)
  cy.get('[data-qa="signup-email"]').type(email)
  cy.get('[data-qa="signup-button"]').click()
}

export function preencherEEnviarCadastro(senha) {
  // Radio buttons -> check
  cy.get('#id_gender2').check().should('be.checked')

  cy.get('[data-qa="password"]').type(senha, { log: false })

  // Selects e comboboxes -> select
  cy.get('[data-qa="days"]').select('1')
  cy.get('[data-qa="months"]').select('1')
  cy.get('[data-qa="years"]').select('1990')

  // Checkboxes -> check
  cy.get('#newsletter').check().should('be.checked')
  cy.get('[name="optin"]').check().should('be.checked')

  cy.get('[data-qa="first_name"]').type('PGATS')
  cy.get('[data-qa="last_name"]').type('Aut')
  cy.get('[data-qa="company"]').type('PGATS')
  cy.get('[data-qa="address"]').type('OAK Street')
  cy.get('[data-qa="address2"]').type('The end of')
  cy.get('[data-qa="country"]').select('United States')
  cy.get('[data-qa="state"]').type('California')
  cy.get('[data-qa="city"]').type('San Francisco')
  cy.get('[data-qa="zipcode"]').type('12345')
  cy.get('[data-qa="mobile_number"]').type('51987654321')

  cy.get('[data-qa="create-account"]').click()
}

export function validarCadastroComSucesso() {
  cy.contains('h2', 'Account Created!').should('be.visible')
  cy.contains('p', 'Congratulations! Your new account has been successfully created!').should('be.visible')
  cy.contains('p', 'You can now take advantage of member privileges to enhance your online shopping experience with us.').should('be.visible')
}

export function verificarMensagemDeCadastroExistente() {
  cy.contains('p', 'Email Address already exist!').should('be.visible')
}

export function deletarCadastro() {
  cy.intercept('GET', '**/delete_account').as('excluirConta')

  cy.get('header a[href="/delete_account"]').click()

  cy.wait('@excluirConta')
  cy.location('pathname').should('eq', '/delete_account')

  cy.get('[data-qa="account-deleted"]').should('be.visible').and('contain.text', 'Account Deleted!')

  cy.get('a[data-qa="continue-button"][href="/"]').should('be.visible').click()

  cy.location('pathname').should('eq', '/')
  cy.get('#slider').should('be.visible')
}

export function validarFormularioDeNovoUsuario() {
  cy.xpath('//h2[contains(.,"New User Signup!")]').should('be.visible')
}

export function validarInformacoesDaConta(nome, email) {
  cy.xpath('//h2[normalize-space(.)="Enter Account Information"]').should('be.visible')

  cy.get('[data-qa="name"]').should('have.value', nome)
  cy.get('[data-qa="email"]').should('have.value', email)
}

export function continuarAposCadastro() {
  cy.get('[data-qa="continue-button"]').click()
}

export function preencherCadastroComUsuario(usuario) {
  cy.get('#id_gender2').check().should('be.checked')

  cy.get('[data-qa="password"]').type(usuario.senha, { log: false })

  cy.get('[data-qa="days"]').select('1')
  cy.get('[data-qa="months"]').select('1')
  cy.get('[data-qa="years"]').select('1990')

  cy.get('#newsletter').check().should('be.checked')
  cy.get('[name="optin"]').check().should('be.checked')

  cy.get('[data-qa="first_name"]').type(usuario.primeiroNome)
  cy.get('[data-qa="last_name"]').type(usuario.sobrenome)
  cy.get('[data-qa="company"]').type(usuario.empresa)
  cy.get('[data-qa="address"]').type(usuario.endereco)
  cy.get('[data-qa="address2"]').type(usuario.complemento)
  cy.get('[data-qa="country"]').select(usuario.pais)
  cy.get('[data-qa="state"]').type(usuario.estado)
  cy.get('[data-qa="city"]').type(usuario.cidade)
  cy.get('[data-qa="zipcode"]').type(usuario.cep)
  cy.get('[data-qa="mobile_number"]').type(usuario.telefone)

  cy.get('[data-qa="create-account"]').click()
}
