describe('Listagem de Heróis', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.contains('Login').click()
    cy.get('input[type="email"]').type('test@test.com')
    cy.get('input[type="password"]').type('test123')
    cy.contains('Sign in').click()
  })

  it('exibe a lista de heróis após o login', () => {
    cy.get('[data-cy=hero-card]').should('have.length.greaterThan', 0)
  })

  it('cada card de herói exibe nome, preço, fãs e saves', () => {
    cy.get('[data-cy=hero-card]').first().within(() => {
      cy.get('[data-cy=money]').should('exist')
    })
  })
})