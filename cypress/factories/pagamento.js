import { faker } from '@faker-js/faker'

export function criarPagamento(nomeTitular) {
  return {
    nomeTitular,
    numero: '4111111111111111',
    cvc: faker.string.numeric(3),
    mes: '12',
    ano: String(new Date().getFullYear() + 2),
  }
}
