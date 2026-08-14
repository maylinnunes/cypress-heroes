describe('Permissão - Criar Herói', () => {
  it('permite acesso à tela /heroes/new mesmo sem login (bug de UX)', () => {
    cy.visit('/heroes/new')
    cy.get('input').should('exist')
  })

  it('não cria o herói ao submeter o formulário sem estar logado', () => {
    cy.visit('/heroes/new')

    cy.get('input').eq(0).type('Heroi Sem Permissao')
    cy.contains('Submit').click()

    cy.visit('/heroes')
    cy.contains('Heroi Sem Permissao').should('not.exist')
  })

  it('permite criar herói quando logado como admin', () => {
    cy.visit('/')
    cy.contains('Login').click()
    cy.get('input[type="email"]').type('admin@test.com')
    cy.get('input[type="password"]').type('test123')
    cy.contains('Sign in').click()

    cy.contains('Create New Hero').click()
    cy.get('input').eq(0).type('Heroi De Teste Admin')
    cy.get('input').eq(1).type('20')
    cy.get('input').eq(2).type('10')
    cy.get('input').eq(3).type('10')
    cy.get('select, [data-cy=powersSelect]').first().select(0)
    cy.contains('Submit').click()

    cy.visit('/heroes')
    cy.contains('Heroi De Teste Admin').should('exist')
  })
})