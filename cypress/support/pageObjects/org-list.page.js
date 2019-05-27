class OrgList {
    visit() {
        cy.visit('/organisations');
        cy.url().should('include', 'organisations')
    }
    get newOrgBtn() {
        return   cy.get('[data-cy=newOrg]');
    }

    get editBtn(){
        return cy.get('[data-cy=editOrg]');
    }

    get deleteBtn(){
        cy.get('[data-cy=deleteOrg]');
    }
    
}



export const orgList = new OrgList();