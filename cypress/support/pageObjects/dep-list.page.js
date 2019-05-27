class DepList {
    visit() {
        cy.visit('/departments');
        cy.url().should('include', 'departments')
    }
    get newDepBtn() {
        return   cy.get('[data-cy=newDep]')
    }

    get editBtn(){
        return cy.get('[data-cy=editDep]')
    }

    get deleteBtn(){
        return cy.get('[data-cy=deleteDep]')
    }
    
}



export const depList = new DepList();