class OrgForm {

    visit() {
        cy.visit('/organisations/new');
        cy.url().should('include', 'organisations/new')
    }

    get name() {
        return   cy.get('[data-cy=nameOrg]')
    }
    get description() {
        return cy.get('[data-cy=descOrg]')
    }

    get rootName() {
        return   cy.get('[data-cy=rootName]')
    }

    get rootDescription() {
        return   cy.get('[data-cy=rootDesc]')
    }

    get submitBtn(){
        return cy.get('[data-cy=submitOrg]')
    }
    
}



export const orgForm = new OrgForm();