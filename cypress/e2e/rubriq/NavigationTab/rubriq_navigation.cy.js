const pageobject = require('../pageObjectRubriq.json');
let testData; // define outside so we can use it in beforeEach or inside cy.session

before(() => {
  cy.fixture('testDataRubriq').then((data) => {
    testData = data;
    
  });
});

beforeEach(() => {
    cy.session([testData.rubriqLoginEmail, testData.rubriqLoginPassword], () => {
      cy.visit('https://secure-aje.staging.sqr.io');
      cy.acceptCookies();
      cy.uiLogin(testData.rubriqLoginEmail, testData.rubriqLoginPassword);
      cy.get(pageobject.tabNavigation.myAccount).should('be.visible').click();
      cy.contains('Workspace').click({ force: true });
     
    });

      cy.visit('https://secure-aje.staging.sqr.io/en/rubriq');
     
});
after(function(){
    cy.get(myAccount).should('be.visible').click()
    cy.contains('Log out').click({force:true})  
    cy.get(pageobject.login.email).should('be.visible')
})


const{
    myAccount,
    rubriqTab,
    abstractTab,
    translateTab, 
    editingTab
} = pageobject.tabNavigation;
 
 
describe('Navigation', function () {
    it('navigates to Translate tab', function() {
    cy.url().should('include', '/en/rubriq')
    cy.get('body').then(($body) => {
        if ($body.find(pageobject.tabNavigation.Gotit).length > 0) {
          cy.get(pageobject.tabNavigation.Gotit).click({force:true});
        }
      });
    cy.get(translateTab,{ timeout: 20000 }).click();
    cy.url().should('include', 'https://secure-aje.staging.sqr.io/en/rubriq/translation')
    
    }) 
    it('navigate to Abstract Tab from Editing Tab', function() {
    cy.get(editingTab).click();
    cy.url().should('include', 'https://secure-aje.staging.sqr.io/en/rubriq/editing')
    cy.get(abstractTab).click();
    cy.url().should('include', 'https://secure-aje.staging.sqr.io/en/rubriq/abstract-writer')
    }) 
    it('navigates to Abstract Tab from Translate Tab', function() {
    cy.get(translateTab).click()
    cy.url().should('include', 'https://secure-aje.staging.sqr.io/en/rubriq/translation')
    cy.get(abstractTab).click();
    cy.url().should('include', 'https://secure-aje.staging.sqr.io/en/rubriq/abstract-writer')

    }) 
    it('navigate to Editing Tab from Abstract Tab ', function() {
    cy.get(abstractTab).click();
    cy.url().should('include', 'https://secure-aje.staging.sqr.io/en/rubriq/abstract-writer')
    cy.get(editingTab).click();
    cy.url().should('include', 'https://secure-aje.staging.sqr.io/en/rubriq/editing')
    }) 
    it('navigate to Editing Tab from Translate tab', function() {
    cy.get(translateTab).click();
    cy.url().should('include', 'https://secure-aje.staging.sqr.io/en/rubriq/translation')
    cy.get(editingTab).click();
    cy.url().should('include', 'https://secure-aje.staging.sqr.io/en/rubriq/editing')
    }) 
    it('navigates to Translate tab from Abstract Tab', function() {
    cy.get(abstractTab).click()
    cy.url().should('include', 'https://secure-aje.staging.sqr.io/en/rubriq/abstract-writer')
    cy.get(translateTab).click();
    cy.url().should('include', 'https://secure-aje.staging.sqr.io/en/rubriq/translation')
    }) 
    it('navigates to Translate tab from Editing tab', function() {
    cy.get(editingTab).click();
    cy.url().should('include', 'https://secure-aje.staging.sqr.io/en/rubriq/editing')
    cy.get(translateTab).click();
    cy.url().should('include', 'https://secure-aje.staging.sqr.io/en/rubriq/translation')
    }) 
})


