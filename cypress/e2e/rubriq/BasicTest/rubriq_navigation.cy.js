const pageobject = require('../../../support/pageObjectRubriq.json');
let testData; // define outside so we can use it in beforeEach or inside cy.session

before(() => {
  cy.fixture('testDataRubriq').then((data) => {
    testData = data;
    
  });
});

beforeEach(() => {
    cy.session([testData.rubriqLoginEmail, testData.rubriqLoginPassword], () => {
      cy.visit(Cypress.config('baseUrl'));
      cy.acceptCookies();
      cy.uiLogin(testData.rubriqLoginEmail, testData.rubriqLoginPassword);
      cy.get(pageobject.tabNavigation.myAccount).should('be.visible').click();
      cy.contains('Workspace').click({ force: true });
     
    });

      cy.visit(Cypress.config('baseUrl')+'/en/rubriq');
     
});
after(function(){
    cy.get(pageobject.tabNavigation.myAccount).should('be.visible').click()
    cy.contains('Log out').click({force:true})  
    cy.get(pageobject.login.email).should('be.visible')
})



 
 
describe('Navigation', function () {
    it('navigates to Translate tab', function() {
    cy.url().should('include', '/en/rubriq')
    cy.get('body').then(($body) => {
        if ($body.find(pageobject.tabNavigation.Gotit).length > 0) {
          cy.get(pageobject.tabNavigation.Gotit).click({force:true});
        }
      });
    cy.get(pageobject.tabNavigation.translateTab,{ timeout: 20000 }).click();
    cy.url().should('include', Cypress.config('baseUrl')+'/en/rubriq/translation')
    
    }) 
    it('navigate to Abstract Tab from Editing Tab', function() {
    cy.get(pageobject.tabNavigation.editingTab).click();
    cy.url().should('include', Cypress.config('baseUrl')+'/en/rubriq/editing')
    cy.get(pageobject.tabNavigation.abstractTab).click();
    cy.url().should('include', Cypress.config('baseUrl')+'/en/rubriq/abstract-writer')
    }) 
    it('navigates to Abstract Tab from Translate Tab', function() {
    cy.get(pageobject.tabNavigation.translateTab).click()
    cy.url().should('include', Cypress.config('baseUrl')+'/en/rubriq/translation')
    cy.get(pageobject.tabNavigation.abstractTab).click();
    cy.url().should('include', Cypress.config('baseUrl')+'/en/rubriq/abstract-writer')

    }) 
    it('navigate to Editing Tab from Abstract Tab ', function() {
    cy.get(pageobject.tabNavigation.abstractTab).click();
    cy.url().should('include', Cypress.config('baseUrl')+'/en/rubriq/abstract-writer')
    cy.get(pageobject.tabNavigation.editingTab).click();
    cy.url().should('include', Cypress.config('baseUrl')+'/en/rubriq/editing')
    }) 
    it('navigate to Editing Tab from Translate tab', function() {
    cy.get(pageobject.tabNavigation.translateTab).click();
    cy.url().should('include', Cypress.config('baseUrl')+'/en/rubriq/translation')
    cy.get(pageobject.tabNavigation.editingTab).click();
    cy.url().should('include', Cypress.config('baseUrl')+'/en/rubriq/editing')
    }) 
    it('navigates to Translate tab from Abstract Tab', function() {
    cy.get(pageobject.tabNavigation.abstractTab).click()
    cy.url().should('include', Cypress.config('baseUrl')+'/en/rubriq/abstract-writer')
    cy.get(pageobject.tabNavigation.translateTab).click();
    cy.url().should('include', Cypress.config('baseUrl')+'/en/rubriq/translation')
    }) 
    it('navigates to Translate tab from Editing tab', function() {
    cy.get(pageobject.tabNavigation.editingTab).click();
    cy.url().should('include', Cypress.config('baseUrl')+'/en/rubriq/editing')
    cy.get(pageobject.tabNavigation.translateTab).click();
    cy.url().should('include', Cypress.config('baseUrl')+'/en/rubriq/translation')
    }) 
})


