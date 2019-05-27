class DepList {
    visit() {
        cy.visit('/departments');
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

    get treeBtn(){
        return cy.get('[data-cy=treeView]')
    }
    
}



export const depList = new DepList();