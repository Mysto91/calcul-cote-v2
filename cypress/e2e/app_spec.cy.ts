describe('calculations', () => {
  it('should not calculate when quotation or betValue is missing', () => {
    cy.visit('/')

    cy.get('#betValue-input').clear()
    cy.get('#quotationOne-input').clear()
    cy.get('#quotationTwo-input').clear()

    cy.get('td').contains('C\'est l\'heure des cotes, sortez vos billets')

    cy.get('#betValue-input').type('10')
    cy.get('td').contains('C\'est l\'heure des cotes, sortez vos billets')

    cy.get('#betValue-input').clear()
    cy.get('#quotationOne-input').type('2')
    cy.get('td').contains('C\'est l\'heure des cotes, sortez vos billets')

    cy.get('#quotationOne-input').clear()
    cy.get('#quotationTwo-input').type('2')
    cy.get('td').contains('C\'est l\'heure des cotes, sortez vos billets')
  })

  it('should calculate bets with boosted bet enabled', () => {
    cy.visit('/')

    cy.get('td').contains('C\'est l\'heure des cotes, sortez vos billets')

    cy.get('#betValue-input').clear().type('10')
    cy.get('#quotationOne-input').clear().type('2')
    cy.get('#quotationTwo-input').clear().type('2.5')

    cy.get('tr')
      .contains('td', '1r2')
      .closest('tr')
      .then($tr => {
        cy.wrap($tr).should('contain.text', '1.20')
        cy.wrap($tr).should('contain.text', '10 €')
        cy.wrap($tr).should('contain.text', '6.67 €')
        cy.wrap($tr).should('contain.text', '20 €')
        cy.wrap($tr).should('contain.text', '+3.33 €')
      })

    cy.get('tr')
      .contains('td', '2r1')
      .closest('tr')
      .then($tr => {
        cy.wrap($tr).should('contain.text', '1.25')
        cy.wrap($tr).should('contain.text', '10 €')
        cy.wrap($tr).should('contain.text', '10 €')
        cy.wrap($tr).should('contain.text', '25 €')
        cy.wrap($tr).should('contain.text', '+5 €')
      })

    cy.get('tr')
      .contains('td', '1ou2')
      .closest('tr')
      .then($tr => {
        cy.wrap($tr).should('contain.text', '1.11')
        cy.wrap($tr).should('contain.text', '10 €')
        cy.wrap($tr).should('contain.text', '8 €')
        cy.wrap($tr).should('contain.text', '20 €')
        cy.wrap($tr).should('contain.text', '+2 €')
      })
  })

  it('should calculate bets with boosted bet disabled', () => {
    cy.visit('/')

    cy.get('td').contains('C\'est l\'heure des cotes, sortez vos billets')

    cy.get('#betValue-input').clear().type('20')
    cy.get('#quotationOne-input').clear().type('2.25')
    cy.get('#quotationTwo-input').clear().type('2.10')
    cy.get('#boostedBetEnabled').click()

    cy.get('tr')
      .contains('td', '1r2')
      .closest('tr')
      .then($tr => {
        cy.wrap($tr).should('contain.text', '1.18')
        cy.wrap($tr).should('contain.text', '10.48 €')
        cy.wrap($tr).should('contain.text', '9.52 €')
        cy.wrap($tr).should('contain.text', '23.57 €')
        cy.wrap($tr).should('contain.text', '+3.57 €')
      })

    cy.get('tr')
      .contains('td', '2r1')
      .closest('tr')
      .then($tr => {
        cy.wrap($tr).should('contain.text', '1.17')
        cy.wrap($tr).should('contain.text', '8.89 €')
        cy.wrap($tr).should('contain.text', '11.11 €')
        cy.wrap($tr).should('contain.text', '23.33 €')
        cy.wrap($tr).should('contain.text', '+3.33 €')
      })

    cy.get('tr')
      .contains('td', '1ou2')
      .closest('tr')
      .then($tr => {
        cy.wrap($tr).should('contain.text', '1.09')
        cy.wrap($tr).should('contain.text', '9.66 €')
        cy.wrap($tr).should('contain.text', '10.34 €')
        cy.wrap($tr).should('contain.text', '21.72 €')
        cy.wrap($tr).should('contain.text', '+1.72 €')
      })
  })
})
