function interpretarResposta(body) {
  return typeof body === 'string' ? JSON.parse(body) : body
}

export function cadastrarUsuarioPorApi(usuario) {
  return cy.request({
    method: 'POST',
    url: '/api/createAccount',
    form: true,
    log: false,
    body: {
      name: usuario.nome,
      email: usuario.email,
      password: usuario.senha,
      title: 'Mrs',
      birth_date: '1',
      birth_month: '1',
      birth_year: '1990',
      firstname: usuario.primeiroNome,
      lastname: usuario.sobrenome,
      company: usuario.empresa,
      address1: usuario.endereco,
      address2: usuario.complemento,
      country: usuario.pais,
      state: usuario.estado,
      city: usuario.cidade,
      zipcode: usuario.cep,
      mobile_number: usuario.telefone,
    },
  }).then(({ body }) => {
    const resposta = interpretarResposta(body)

    expect(resposta.responseCode, 'criação da conta').to.eq(201)
  })
}

export function removerUsuarioPorApi(usuario) {
  return cy.request({
    method: 'DELETE',
    url: '/api/deleteAccount',
    form: true,
    log: false,
    body: {
      email: usuario.email,
      password: usuario.senha,
    },
  }).then(({ body }) => {
    const resposta = interpretarResposta(body)

    expect(
      resposta.responseCode,
      'conta removida ou já inexistente',
    ).to.be.oneOf([200, 404])
  })
}