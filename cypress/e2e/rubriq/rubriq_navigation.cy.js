import pageobject from "../../e2e/rubriq/pageObjectRubriq.json"
import loginTestData from "./testDataRubriq.json";

const{
    rubriqLoginEmail,
    rubriqLoginPassword,    
} = loginTestData;

const{
    myAccount,
    rubriqTab,
    abstractTab,
    translateTab, 
    editingTab
} = pageobject.tabNavigation;
 
 
describe('Navigation', function () {
    it('navigates to Translate tab', function() {
        cy.visit('https://secure-aje.staging.sqr.io')
        cy.acceptCookies()
        cy.uiLogin(rubriqLoginEmail,rubriqLoginPassword)
    //cy.url().should('include','/home')
    cy.log(rubriqTab)
    cy.get(myAccount).should('be.visible').click()
    cy.get(rubriqTab).click();
    cy.url().should('include', 'https://secure-aje.staging.sqr.io/en/rubriq')
    cy.get(translateTab).click();
    cy.url().should('include', 'https://secure-aje.staging.sqr.io/en/rubriq/translation')
    }) 
    // it('navigate to Abstract Tab from Editing Tab', function() {
    //     cy.visit('https://secure-aje.staging.sqr.io')
    //     cy.acceptCookies()
    //     cy.uiLogin(rubriqLoginEmail,rubriqLoginPassword )
    // cy.url().should('include', '/home')
    // cy.get(rubriqTab).click();
    // cy.url().should('include', 'https://secure-aje.staging.sqr.io/en/curie')
    // cy.get(editingTab).click();
    // cy.url().should('include', 'https://secure-aje.staging.sqr.io/en/curie/editing')
    // cy.get(abstractTab).click();
    // cy.url().should('include', 'https://secure-aje.staging.sqr.io/en/curie/abstract-writer')

    // }) 
    // it('navigates to Abstract Tab from Translate Tab', function() {
    //     cy.visit('https://secure-aje.staging.sqr.io')
    //     cy.acceptCookies()
    //     cy.uiLogin(rubriqLoginEmail,rubriqLoginPassword)
    // cy.url().should('include', '/home')
    // cy.get(rubriqTab).click();
    // cy.url().should('include', 'https://secure-aje.staging.sqr.io/en/curie')
    // cy.get(translateTab).click()
    // cy.url().should('include', 'https://secure-aje.staging.sqr.io/en/curie/translation')
    // cy.get(abstractTab).click();
    // cy.url().should('include', 'https://secure-aje.staging.sqr.io/en/curie/abstract-writer')

    // }) 
    // it('navigate to Editing Tab from Abstract Tab ', function() {
    //     cy.visit('https://secure-aje.staging.sqr.io')
    //     cy.acceptCookies()
    //     cy.uiLogin( rubriqLoginEmail, rubriqLoginPassword )
    // cy.url().should('include', '/home')
    // cy.get(curieTab).click();
    // cy.url().should('include', 'https://secure-aje.staging.sqr.io/en/curie')
    // cy.get(abstractTab).click()
    // cy.url().should('include', 'https://secure-aje.staging.sqr.io/en/curie/abstract-writer')
    // cy.get(editingTab).click();
    // cy.url().should('include', 'https://secure-aje.staging.sqr.io/en/curie/editing')
    // }) 
    // it('navigate to Editing Tab from Translate tab', function() {
    //     cy.visit('https://secure-aje.staging.sqr.io')
    //     cy.acceptCookies()
    //     cy.uiLogin(rubriqLoginEmail,rubriqLoginPassword )
    // cy.url().should('include', '/home')
    // cy.get(curieTab).click();
    // cy.url().should('include', 'https://secure-aje.staging.sqr.io/en/curie')
    // cy.get(translateTab).click();
    // cy.url().should('include', 'https://secure-aje.staging.sqr.io/en/curie/translation')
    // cy.get(editingTab).click();
    // cy.url().should('include', 'https://secure-aje.staging.sqr.io/en/curie/editing')
    // }) 
    // it('navigates to Translate tab from Abstract Tab', function() {
    //     cy.visit('https://secure-aje.staging.sqr.io')
    //     cy.acceptCookies()
    //     cy.uiLogin(rubriqLoginEmail,rubriqLoginPassword )
    // cy.url().should('include', '/home')
    // cy.get(curieTab).click();
    // cy.url().should('include', 'https://secure-aje.staging.sqr.io/en/curie')
    // cy.get(abstractTab).click()
    // cy.url().should('include', 'https://secure-aje.staging.sqr.io/en/curie/abstract-writer')
    // cy.get(translateTab).click();
    // cy.url().should('include', 'https://secure-aje.staging.sqr.io/en/curie/translation')
    // }) 
    // it('navigates to Translate tab from Editing tab', function() {
    //     cy.visit('https://secure-aje.staging.sqr.io')
    //     cy.acceptCookies()
    //     cy.uiLogin(rubriqLoginEmail,rubriqLoginPassword)
    // cy.url().should('include', '/home')
    // cy.get(curieTab).click();
    // cy.url().should('include', 'https://secure-aje.staging.sqr.io/en/curie')
    // cy.get(editingTab).click();
    // cy.url().should('include', 'https://secure-aje.staging.sqr.io/en/curie/editing')
    // cy.get(translateTab).click();
    // cy.url().should('include', 'https://secure-aje.staging.sqr.io/en/curie/translation')
    // }) 
})


