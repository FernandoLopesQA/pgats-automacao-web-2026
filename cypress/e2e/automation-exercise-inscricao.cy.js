import { faker } from '@faker-js/faker'
import { acessarPaginaInicial } from '../modules/home'
import { validarSecaoDeInscricao, realizarInscricao, validarInscricaoComSucesso } from '../modules/inscricao'

describe('Inscrição na página inicial', () => {
  beforeEach(() => {
    acessarPaginaInicial()
  })

  it('TC10 - deve realizar a inscrição com sucesso pela página inicial', () => {
    const email = `pgats.${faker.string.uuid()}@example.com`

    validarSecaoDeInscricao()

    realizarInscricao(email)

    validarInscricaoComSucesso()
  })
})
