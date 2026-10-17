# PGATS — Automação Web 2026

Projeto de testes de interface desenvolvido durante a disciplina de Automação Web, com Cypress e JavaScript. O trabalho de conclusão utiliza a aplicação [Automation Exercise](https://automationexercise.com/) e implementa os casos 1, 2, 3, 4, 5, 8, 9, 10, 15 e 16 da página [Test Cases](https://automationexercise.com/test_cases).

Os exercícios anteriores da disciplina também permanecem no projeto e fazem parte da execução completa: são **21 testes em 6 arquivos**, sendo 10 cenários do trabalho final e 11 exercícios anteriores.

- [Repositório](https://github.com/FernandoLopesQA/pgats-automacao-web-2026)
- [Execuções no GitHub Actions](https://github.com/FernandoLopesQA/pgats-automacao-web-2026/actions/workflows/web-e2e-tests.yml)

## Tecnologias

- **Cypress:** execução dos testes de interface.
- **JavaScript:** implementação dos cenários e das ações de negócio.
- **Faker:** geração de dados fictícios para usuários e pagamentos.
- **Cypress XPath:** seletores utilizados nos exercícios da disciplina.
- **Mochawesome:** relatório HTML com gráficos e capturas de falhas.
- **JUnit:** resultados em XML para apresentação no GitHub Actions.
- **Cypress Multi Reporters:** geração dos dois formatos na mesma execução.
- **GitHub Actions:** execução manual da suíte, resumo dos resultados e armazenamento dos relatórios.

As versões das dependências estão em `package.json` e `package-lock.json`.

## Casos do trabalho final

| Caso | Comportamento validado | Arquivo em `cypress/e2e/` |
| --- | --- | --- |
| TC01 | Cadastrar usuário, validar autenticação e excluir a conta | `automation-exercise-modules.cy.js` |
| TC02 | Efetuar login com credenciais corretas e excluir a conta | `automation-exercise-modules.cy.js` |
| TC03 | Rejeitar login com credenciais incorretas | `automation-exercise-modules.cy.js` |
| TC04 | Efetuar logout e retornar à tela de login | `automation-exercise-modules.cy.js` |
| TC05 | Rejeitar cadastro com e-mail já registrado | `automation-exercise-modules.cy.js` |
| TC08 | Exibir catálogo e detalhes do primeiro produto | `automation-exercise-produtos.cy.js` |
| TC09 | Pesquisar produto e validar o resultado | `automation-exercise-produtos.cy.js` |
| TC10 | Realizar inscrição pelo rodapé da página inicial | `automation-exercise-inscricao.cy.js` |
| TC15 | Cadastrar usuário antes do checkout e concluir pedido | `automation-exercise-pedidos.cy.js` |
| TC16 | Efetuar login antes do checkout e concluir pedido | `automation-exercise-pedidos.cy.js` |

Os arquivos `automation-exercise-xpath.cy.js` e `trabalho-home.cy.js` preservam os exercícios anteriores, respectivamente sobre XPath no Automation Exercise e transações na aplicação [Dev Finance](https://devfinance-agilizei.netlify.app/).

## Pré-requisitos

- Node.js 24 e npm 10 ou superior.
- Google Chrome instalado para os comandos npm do projeto.
- Git, caso a instalação seja feita por clone.
- Acesso à internet: os testes utilizam aplicações públicas e a API do Automation Exercise.

Não é necessário iniciar um servidor local da aplicação.

## Instalação

```bash
git clone https://github.com/FernandoLopesQA/pgats-automacao-web-2026.git
cd pgats-automacao-web-2026
npm ci
```

Se recebeu o projeto por ZIP, extraia o conteúdo, abra o terminal na pasta que contém `package.json` e execute `npm ci`.

## Execução local

Para executar todos os testes no Chrome, em modo headless:

```bash
npm test
```

Para abrir a interface do Cypress e selecionar os testes:

```bash
npm run cy:open
```

O comando `npm run cy:run` também executa a suíte em modo headless no Chrome, utilizando a configuração do Cypress.

Para investigar um arquivo específico, por exemplo os cenários de pedidos:

```bash
npx cypress run --browser chrome --spec "cypress/e2e/automation-exercise-pedidos.cy.js"
```

As execuções completas incluem os exercícios anteriores. Não há filtro que limite a suíte aos casos do trabalho final.

## Organização e dados dos testes

```text
.github/workflows/
  web-e2e-tests.yml       # Execução e relatórios no GitHub Actions
cypress/
  e2e/                   # Cenários do trabalho e exercícios anteriores
  factories/             # Dados fictícios de usuários e pagamentos
  fixtures/              # Dados de referência dos produtos
  modules/               # Ações de negócio, seletores e validações
    usuarios-api/        # Preparação e limpeza de contas de teste
  support/               # Registro do XPath e do Mochawesome
  reports/               # Relatórios gerados durante a execução
docs/                    # Material dos exercícios
cypress.config.js        # Configuração do Cypress e dos reporters
```

Nos testes modularizados, as specs descrevem os cenários e utilizam funções dos módulos de ações de negócio. As interações e os seletores ficam nos módulos; dados variáveis são produzidos pelas factories e dados de referência ficam nas fixtures.

Os cenários de autenticação e pedidos do trabalho geram um usuário exclusivo por teste. A API prepara as contas que precisam existir previamente e tenta removê-las no `afterEach`, inclusive quando um teste falha. Nos casos que exigem cadastro ou exclusão pela interface, essas etapas continuam sendo executadas pela interface.

O exercício XPath preserva uma conta fixa definida no próprio arquivo para seus cenários de login e cadastro existente. Essa conta precisa continuar cadastrada para que esses testes funcionem. Os exercícios anteriores não utilizam necessariamente o mesmo padrão de preparação e limpeza dos cenários modularizados.

Os testes dependem da disponibilidade e do conteúdo das aplicações externas. O Cypress bloqueia os hosts de publicidade definidos em `cypress.config.js` para reduzir interferências durante a navegação.

## Relatórios locais

Uma execução em modo `run` gera os dois formatos, sem repetir os testes:

| Arquivo | Finalidade |
| --- | --- |
| `cypress/reports/index.html` | Relatório Mochawesome para abrir no navegador |
| `cypress/reports/index.json` | Resultados consolidados do Mochawesome |
| `cypress/reports/junit/results-*.xml` | Resultados JUnit separados por arquivo de testes |
| `cypress/screenshots/` | Capturas automáticas quando há falhas |

O HTML incorpora estilos e capturas de falhas. Abra `cypress/reports/index.html` diretamente no navegador. Não há gravação de vídeos habilitada na configuração atual.

O relatório HTML representa a execução mais recente, que pode ser de apenas uma spec. Os XMLs JUnit de execuções locais anteriores podem permanecer na pasta; antes de consolidar resultados de uma nova execução local, remova os relatórios gerados anteriormente. No Actions, cada execução utiliza um runner novo.

## GitHub Actions

O workflow **Web E2E Tests** é acionado manualmente:

1. Acesse a aba **Actions** do repositório.
2. Selecione **Web E2E Tests**.
3. Clique em **Run workflow**, escolha a branch e confirme.
4. Aguarde o término e abra o resumo da execução.

O workflow instala as dependências com `npm install` e executa `npx cypress run`. Como esse comando não especifica navegador, utiliza o Electron padrão do Cypress; os scripts npm locais especificam Chrome.

A action `dorny/test-reporter` lê os XMLs JUnit e apresenta totais, suítes e detalhes dos testes no resumo do Actions, além da verificação **Testes E2E**.

O artefato **relatorio-mochawesome** fica disponível na seção **Artifacts** por **30 dias**. Baixe o ZIP, extraia o conteúdo e localize o `index.html` para visualizar o relatório completo.

As etapas de resumo e upload também são executadas quando os testes falham, desde que a execução não tenha sido cancelada. A disponibilização depende de os arquivos terem sido gerados. Não há publicação pelo GitHub Pages.

## Entrega do trabalho

Enviar na atividade da plataforma do curso:

- A URL do repositório: https://github.com/FernandoLopesQA/pgats-automacao-web-2026
- Um ZIP com o projeto, sem a pasta `node_modules`.

O ZIP do projeto é diferente do artefato de relatório do Actions. O projeto deve conter o código dos testes, as configurações, `package.json`, `package-lock.json`, este README e a pasta `.github`, permitindo instalar as dependências e reproduzir a execução. Não incluir credenciais locais, arquivos `.env` ou o diretório `.git`.

Antes de enviar, confirme que as alterações foram publicadas no repositório, que a execução completa no Actions foi aprovada e que o relatório pode ser baixado.
