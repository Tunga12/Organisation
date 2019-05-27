class DepForm {

    visit() {
        cy.visit('/departments/new');
    }

    get name() {
        return   cy.get('[data-cy=nameDep]')
    }
    get description() {
        return cy.get('[data-cy=descDep]')
    }

    get submitBtn(){
        return cy.get('[data-cy=submitDep]')
    }
    
}



export const depForm = new DepForm();