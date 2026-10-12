import { faker } from '@faker-js/faker'

export function criarUsuario() {
  const primeiroNome = faker.person.firstName()
  const sobrenome = faker.person.lastName()

  return {
    nome: `${primeiroNome} ${sobrenome}`,
    email: `pgats.${faker.string.uuid()}@example.com`,
    senha: faker.internet.password({ length: 12 }),
    primeiroNome,
    sobrenome,
    empresa: faker.company.name(),
    endereco: faker.location.streetAddress(),
    complemento: 'Apartment 10',
    pais: 'United States',
    estado: 'California',
    cidade: 'Los Angeles',
    cep: faker.location.zipCode('#####'),
    telefone: faker.string.numeric(10),
  }
}
