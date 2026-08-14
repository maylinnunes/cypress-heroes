describe('Login', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('permite login com usuário válido', () => {
    cy.contains('Login').click()
    cy.get('input[type="email"]').type('test@test.com')
    cy.get('input[type="password"]').type('test123')
    cy.contains('Sign in').click()

    cy.get('[data-cy=hero-card]').should('exist')
  })
  it('exibe erro ao tentar login com credenciais inválidas', () => {
      cy.contains('Login').click()
      cy.get('input[type="email"]').type('test@test.com')
      cy.get('input[type="password"]').type('senhaerrada')
      cy.contains('Sign in').click()

      cy.contains('Invalid email or password').should('be.visible')
    })
})