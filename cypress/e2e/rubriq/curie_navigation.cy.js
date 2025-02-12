import LoginPageObject from "./pageObjectCurie.json";
import loginTestData from "./testDataCurie.json";

const{
    curieLoginEmail,
    curieLoginPassword,    
} = loginTestData;

const{
    email,
    password,
    submit,
    curieTab,
    abstractTab,
    translateTab, 
    editingTab
} = LoginPageObject;
 
 
describe('Navigation', function () {
    it('navigate to Curie Tab', function() {
        cy.visit('https://secure-aje.staging.sqr.io')
        cy.acceptCookies()
        cy.uiLogin( curieLoginEmail, curieLoginPassword )
    cy.url().should('include', '/home')
    cy.get(curieTab).click();
    cy.url().should('include', 'https://secure-aje.staging.sqr.io/en/curie')
    }) 
    it('navigate to Abstract Tab ', function() {
        cy.visit('https://secure-aje.staging.sqr.io')
      
        cy.acceptCookies()

        cy.uiLogin( curieLoginEmail, curieLoginPassword )
    
    cy.url().should('include', '/home')
    cy.get(curieTab).click();
    cy.url().should('include', 'https://secure-aje.staging.sqr.io/en/curie')
    cy.get(abstractTab).click();
    cy.url().should('include', 'https://secure-aje.staging.sqr.io/en/curie/abstract-writer')
    }) 
    it('navigates to Translate tab', function() {
        cy.visit('https://secure-aje.staging.sqr.io')
        cy.acceptCookies()
        cy.uiLogin( curieLoginEmail, curieLoginPassword )
    cy.url().should('include', '/home')
    cy.get(curieTab).click();
    cy.url().should('include', 'https://secure-aje.staging.sqr.io/en/curie')
    cy.get(translateTab).click();
    cy.url().should('include', 'https://secure-aje.staging.sqr.io/en/curie/translation')
    }) 
    it('navigate to Abstract Tab from Editing Tab', function() {
        cy.visit('https://secure-aje.staging.sqr.io')
        cy.acceptCookies()
        cy.uiLogin( curieLoginEmail, curieLoginPassword )
    cy.url().should('include', '/home')
    cy.get(curieTab).click();
    cy.url().should('include', 'https://secure-aje.staging.sqr.io/en/curie')
    cy.get(editingTab).click();
    cy.url().should('include', 'https://secure-aje.staging.sqr.io/en/curie/editing')
    cy.get(abstractTab).click();
    cy.url().should('include', 'https://secure-aje.staging.sqr.io/en/curie/abstract-writer')

    }) 
    it('navigates to Abstract Tab from Translate Tab', function() {
        cy.visit('https://secure-aje.staging.sqr.io')
        cy.acceptCookies()
        cy.uiLogin( curieLoginEmail, curieLoginPassword )
    cy.url().should('include', '/home')
    cy.get(curieTab).click();
    cy.url().should('include', 'https://secure-aje.staging.sqr.io/en/curie')
    cy.get(translateTab).click()
    cy.url().should('include', 'https://secure-aje.staging.sqr.io/en/curie/translation')
    cy.get(abstractTab).click();
    cy.url().should('include', 'https://secure-aje.staging.sqr.io/en/curie/abstract-writer')

    }) 
    it('navigate to Editing Tab from Abstract Tab ', function() {
        cy.visit('https://secure-aje.staging.sqr.io')
        cy.acceptCookies()
        cy.uiLogin( curieLoginEmail, curieLoginPassword )
    cy.url().should('include', '/home')
    cy.get(curieTab).click();
    cy.url().should('include', 'https://secure-aje.staging.sqr.io/en/curie')
    cy.get(abstractTab).click()
    cy.url().should('include', 'https://secure-aje.staging.sqr.io/en/curie/abstract-writer')
    cy.get(editingTab).click();
    cy.url().should('include', 'https://secure-aje.staging.sqr.io/en/curie/editing')
    }) 
    it('navigate to Editing Tab from Translate tab', function() {
        cy.visit('https://secure-aje.staging.sqr.io')
        cy.acceptCookies()
        cy.uiLogin( curieLoginEmail, curieLoginPassword )
    cy.url().should('include', '/home')
    cy.get(curieTab).click();
    cy.url().should('include', 'https://secure-aje.staging.sqr.io/en/curie')
    cy.get(translateTab).click();
    cy.url().should('include', 'https://secure-aje.staging.sqr.io/en/curie/translation')
    cy.get(editingTab).click();
    cy.url().should('include', 'https://secure-aje.staging.sqr.io/en/curie/editing')
    }) 
    it('navigates to Translate tab from Abstract Tab', function() {
        cy.visit('https://secure-aje.staging.sqr.io')
        cy.acceptCookies()
        cy.uiLogin( curieLoginEmail, curieLoginPassword )
    cy.url().should('include', '/home')
    cy.get(curieTab).click();
    cy.url().should('include', 'https://secure-aje.staging.sqr.io/en/curie')
    cy.get(abstractTab).click()
    cy.url().should('include', 'https://secure-aje.staging.sqr.io/en/curie/abstract-writer')
    cy.get(translateTab).click();
    cy.url().should('include', 'https://secure-aje.staging.sqr.io/en/curie/translation')
    }) 
    it('navigates to Translate tab from Editing tab', function() {
        cy.visit('https://secure-aje.staging.sqr.io')
        cy.acceptCookies()
        cy.uiLogin( curieLoginEmail, curieLoginPassword )
    cy.url().should('include', '/home')
    cy.get(curieTab).click();
    cy.url().should('include', 'https://secure-aje.staging.sqr.io/en/curie')
    cy.get(editingTab).click();
    cy.url().should('include', 'https://secure-aje.staging.sqr.io/en/curie/editing')
    cy.get(translateTab).click();
    cy.url().should('include', 'https://secure-aje.staging.sqr.io/en/curie/translation')
    }) 
})


