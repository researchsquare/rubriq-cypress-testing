
describe('Navigation', function () {
    it('navigate to rubriq Tab', function() {
        loginAndNavigateToRubiq()
    cy.url().should('include', 'https://secure-aje.staging.sqr.io/en/rubriq')
    }) 
})
