class DepDetail {
    visit() {
        cy.visit('/departments/detail');
    }
    
    get backBtn() {
        return   cy.get('[data-cy=back]')
    }

    
    
}



export const depDetail = new DepDetail();