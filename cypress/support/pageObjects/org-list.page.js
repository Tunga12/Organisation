class OrgList {
    visit() {
        cy.visit('/');
    }
    get newOrgBtn() {
        return   cy.get('[data-cy=newOrg]');
    }

    get editBtn(){
        return cy.get('[data-cy=editOrg]');
    }

    get deleteBtn(){
        return cy.get('[data-cy=deleteOrg]');
    }
    
}



export const orgList = new OrgList();