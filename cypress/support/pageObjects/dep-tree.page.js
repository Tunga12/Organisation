class DepTree {
    visit() {
        cy.visit('/departments/tree');
    }
    
    get backBtn() {
        return   cy.get('[data-cy=back]')
    }

    
    
}



export const depTree = new DepTree();