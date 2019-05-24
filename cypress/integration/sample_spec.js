

describe('Organisation', function () {

    it('creates a new organisation', function () {

        cy.visit('/')

        cy.get('[data-cy=newOrg]').click()

        cy.url().should('include', '/organisations/new')

        cy.get('[data-cy=nameOrg]').type("Org n1")

        cy.get('[data-cy=descOrg]').type("Org n1 desc")

        cy.get('[data-cy=rootName]').type("CEO of org n1")

        cy.get('[data-cy=rootDesc]').type("CEO of org n1 desc")

        cy.get('[data-cy=submitOrg]').click()

        cy.get(".toast-success")


    })


    it('edit an organisation', function () {

        cy.get('[data-cy=editOrg]').click()

        cy.url().should('include', '/organisations')
            .and('include', '/edit')

        cy.get("[data-cy=nameOrg]").should("have.value", "Org n1")

        cy.get("[data-cy=descOrg]").should("have.value", "Org n1 desc")

        cy.get("[data-cy=rootName]").should("have.value", "CEO of org n1")

        cy.get("[data-cy=rootDesc]").should("have.value", "CEO of org n1 desc")


        cy.get("[data-cy=nameOrg]").type("***")

        cy.get('[data-cy=submitOrg]').click()

        cy.get(".toast-info")


    })


    it('delete an organisation', function(){

        cy.get('[data-cy=deleteOrg]').click()

        cy.get(".toast-warning")
    })


})


describe('Department', function () {

    before(function(){
        
        cy.visit('/')

        cy.get('[data-cy=newOrg]').click()

        cy.url().should('include', '/organisations/new')

        cy.get("[data-cy=nameOrg]").type("Org n1")

        cy.get("[data-cy=descOrg]").type("Org n1 desc")

        cy.get("[data-cy=rootName]").type("CEO of org n1")

        cy.get("[data-cy=rootDesc]").type("CEO of org n1 desc")

        cy.get("[data-cy=submitOrg]").click()

    })

    it('create a department', function () {

        cy.get('tbody>tr').eq(0).get('td').eq(0).click()

        cy.url().should('include', '/departments')

        cy.get('[data-cy=newDep]').click()


        cy.url().should('include', '/departments/new')

        cy.get('[data-cy=nameDep]').type('dep1')

        cy.get('[data-cy=descDep]').type('dep1 desc')

        cy.get('.ant-select-arrow-icon').click()

        cy.contains('CEO of org n1').click()

        cy.get('[data-cy=submitDep]').click()

        cy.url().should('include', '/departments')

        cy.get(".toast-success")


    })


    it('edit a department', function () {

        // cy.request('POST', '/departments/new', {
        //     name: "dep2",
        //     description: "dep2 desc",
        //     parent: "CEO of org n1"

        // })

        cy.get('tbody>tr').eq(1).get('.anticon-edit').eq(1).click()

        cy.url().should('include', '/departments')
            .and('include', '/edit')

        cy.get('[data-cy=nameDep]').type('***')

        cy.get('.ant-select-arrow-icon').click()

        cy.contains('CEO of org n1').click()

        cy.get('[data-cy=submitDep]').click()

        cy.url().should('include', '/departments')

        cy.get('.toast-info')

    })


    it('delete a department', function () {

        cy.get('tbody>tr').eq(1).get('[data-cy=deleteDep]').eq(1).click()


        cy.get('.toast-warning')
    })


    it('shows a tree view', function(){

        cy.get('[data-cy=treeView]').click()

        cy.url().should('include', '/departments/tree')

        cy.get('[data-cy=back]').click()

    })


    it('shows the detail of a department', function(){

        cy.get('tbody>tr').eq(0).get('td').eq(0).click()

        cy.url().should('include', '/departments/')
            .and('include', '0')

        // check that the right content is sent

        cy.get('[data-cy=back]').click()

    })

    
})


describe('Department Edge Cases', function () {

    it('doesn\'t create a cycle', function(){

        cy.newDepartment('dep1', 'dep1 desc', 'CEO of org n1')

        cy.newDepartment('dep2', 'dep2 desc', 'dep1')

        cy.get('tbody>tr').eq(1).get('[data-cy=editDep]').eq(1).click()

        cy.url().should('include', '/departments')
            .and('include', '/edit')

        cy.get('.ant-select-arrow-icon').click()

        cy.contains('dep2').should('not.exist')

        cy.contains('CEO of org n1').click()

        cy.get('[data-cy=submitDep]').click()



    })


    it('deletes all children of a deleted department', function(){

        cy.get('tbody>tr').eq(1).get('[data-cy=deleteDep]').eq(1).click()

        cy.get('.toast-warning').contains('dep1')

        cy.get('.toast-warning').contains('dep2')

        cy.get('tbody>tr').should('have.length', 1)

    })

})