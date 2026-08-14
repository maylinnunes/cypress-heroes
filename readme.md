# Cypress Heroes — Testes Automatizados

Este repositório contém a suíte de testes automatizados desenvolvida com **Cypress** para o projeto **Cypress Heroes**, como parte do módulo de Automação de Testes do curso **Guardião da Qualidade**, da LumeStack.

## Sobre o projeto

O Cypress Heroes é uma aplicação de catálogo de heróis, com autenticação de usuários (comum e admin) e controle de permissões para criação de novos heróis. O projeto é dividido em `client` (frontend em React/Vite) e `server` (backend em NestJS + Prisma).

## Tecnologias utilizadas

- Cypress (testes end-to-end)
- TypeScript

## Como rodar os testes

```bash
npm install
npm run setup
npm run dev
```

Em outro terminal, dentro da pasta `client`:

```bash
npx cypress open
```

## Funcionalidades testadas

### 1. Login (`login.cy.ts`)
- Login com usuário válido
- Login com credenciais inválidas (validação da mensagem de erro "Invalid email or password")

### 2. Listagem de Heróis (`heroes-list.cy.ts`)
- Exibição da listagem de heróis após o login
- Verificação de que cada card exibe as informações esperadas (nome, preço, fãs, saves)

### 3. Criação de Herói e Controle de Permissão (`permissao-criar-heroi.cy.ts`)
- Acesso à tela `/heroes/new` sem estar logado
- Tentativa de submissão do formulário de criação sem estar logado
- Criação de herói com sucesso, estando logado como usuário admin

## Bug encontrado

Durante os testes de controle de permissão, foi identificado o seguinte comportamento:

**A tela de criação de herói (`/heroes/new`) é acessível mesmo sem o usuário estar autenticado.** Um usuário deslogado consegue visualizar e preencher o formulário completo de criação de herói, quando o esperado seria o sistema redirecionar para a tela de login ou exibir uma mensagem de acesso negado.

Ao investigar mais a fundo, confirmou-se que a criação do herói **é bloqueada corretamente pelo backend** (o herói não é salvo no banco de dados quando o formulário é submetido sem autenticação). Porém, **nenhuma mensagem de erro é exibida ao usuário** nesse cenário, o que é uma falha de usabilidade: a pessoa não recebe nenhum retorno sobre o motivo da ação não ter funcionado.

**Sugestão de melhoria:** a rota `/heroes/new` deveria verificar a autenticação do usuário antes de renderizar o formulário, redirecionando para o login caso o usuário não esteja autenticado. Adicionalmente, ao tentar submeter uma ação sem permissão, o sistema deveria exibir uma mensagem de erro clara (ex: "Você precisa estar logado como administrador para criar um herói").

## Casos de teste

A documentação completa dos casos de teste (cenários, passos, resultados esperados/obtidos e evidências) está disponível na planilha `Plano_de_Testes_CypressHeroes-v2.xlsx`, mantida separadamente deste repositório.

## Autor

Maylin Nunes — projeto desenvolvido como parte do curso Guardião da Qualidade (LumeStack).