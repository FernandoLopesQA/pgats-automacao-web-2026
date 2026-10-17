/// <reference types="cypress" />

describe('Automation Exercise', () => {
  // Cadastro
  // cy.get() -> elementos baseados em css selector
  // cy.contains() -> elementos baseados em texto

  it('Cadastrar um novo usuário com sucesso', () => {
    cy.visit('https://www.automationexercise.com')
    cy.get('a[href*=login]').click()

    // const timestamp = new Date().getTime()

    cy.get('[data-qa="signup-name"]').type(`PGATS Aut`)
    // cy.get('[data-qa="signup-email"]').type(`pgats-aut-test-${timestamp}@mail.com`)
    cy.get('[data-qa="signup-email"]').type(`pgats-aut-test-${Date.now()}@mail.com`)

    cy.get('[data-qa="signup-button"]').click()

    // radio buttons -> check
    cy.get('#id_gender2').check()

    cy.get('[data-qa="password"]').type('12345')

    // Selects e Comboboxes -> select
    cy.get('[data-qa="days"]').select('1')
    cy.get('[data-qa="months"]').select('September')
    cy.get('[data-qa="years"]').select('1990')

    // checkboxes -> check
    cy.get('#newsletter').check()
    cy.get('#optin').check()
    cy.get('[data-qa="first_name"]').type('PGATS')
    cy.get('[data-qa="last_name"]').type('Aut')
    cy.get('[data-qa="company"]').type('PGATS')
    cy.get('[data-qa="address"]').type('Example Address')

    cy.get('[data-qa="country"]').select('United States')
    cy.get('[data-qa="state"]').type('California')
    cy.get('[data-qa="city"]').type('San Francisco')
    cy.get('[data-qa="zipcode"]').type('12345')

    cy.get('[data-qa="mobile_number"]').type('999999999')

    cy.get('[data-qa="create-account"]').click()

    /**
     * 1 - IA gerando asserções tradicionais
     */

    cy.get('[data-qa="create-account"]').click()
    cy.get('[data-qa="account-created"]')
      .should('be.visible')
      .and('contain', 'Account Created!')


  });

  it('Efetuar Login de Usuário com email e senha corretos', () => {
    // ARRANGE
    /**
     * Ter uma conta para efetuar o Login
     * pgats-aut-test-1791030872114@mail.com / 12345
     */

    // acesso a página de login
    // Problema 1: Repetição do cy.visit
    cy.visit('https://www.automationexercise.com/login')

    // ACT
    cy.get('[data-qa="login-email"]').type('pgats-aut-test-1791030872114@mail.com')
    cy.get('[data-qa="login-password"]').type('12345')

    cy.get('[data-qa="login-button"]').click()
    // cy.contains('Login') 

    // ASSERT
    // cy.get('a').should('contain', 'PGATS Aut')
    // cy.get('a > b').should('contain', 'PGATS Aut')


    // 
    // cy.contains('Logged in as PGATS Auto').should('be.visible')
    cy.contains('.navbar-nav li', 'PGATS Aut')

    cy.get('.navbar-nav li')
      .contains('PGATS Aut')
      .should('be.visible')

  });

  it('Efetuar Login de Usuário email e senha INCORRETOS', () => {
    cy.visit('https://www.automationexercise.com/login')

    // ACT
    cy.get('[data-qa="login-email"]').type('pgats-aut-test-1791030872114@mail.com')
    cy.get('[data-qa="login-password"]').type('54321')

    cy.get('[data-qa="login-button"]').click()

    cy.get('form[action*="login"] > p')
      .should('exist')
      .should('be.visible')
      .should('contain', 'Your email or password is incorrect!')
      .and('contain.text', 'Your email or password is incorrect!')

  });

  it('Efetuar Logout', () => {
    cy.visit('https://www.automationexercise.com/login')

    // ACT
    cy.get('[data-qa="login-email"]').type('pgats-aut-test-1791030872114@mail.com')
    cy.get('[data-qa="login-password"]').type('12345')
    cy.get('[data-qa="login-button"]').click()

    // assert do login
    cy.get('a[href*="logout"]')
      .should('be.visible')
      .click()

    cy.get('.login-form > h2').should('be.visible')
    cy.get('a[href*="logout"]').should('not.exist')
    cy.get('[action*="login"]').should('be.visible');
    cy.url().should('include', 'login')

    // https://www.automationexercise.com/login -> 'login'

  });

  it('Tentar cadastrar usuário com e-mail já cadastrado', () => {
    cy.visit('https://www.automationexercise.com')
    cy.get('a[href*=login]').click()

    // const timestamp = new Date().getTime()

    cy.get('[data-qa="signup-name"]').type(`PGATS Aut`)
    // cy.get('[data-qa="signup-email"]').type(`pgats-aut-test-${timestamp}@mail.com`)
    cy.get('[data-qa="signup-email"]').type(`pgats-aut-test-1791030872114@mail.com`)

    cy.get('[data-qa="signup-button"]').click()

    cy.get('form[action*=signup] p')
      .should('exist')
      .should('be.visible')
      .should('contain', 'Email Address already exist!')
      .and('contain.text', 'Email Address already exist!')


  });

});