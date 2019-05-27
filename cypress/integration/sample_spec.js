import { orgList} from '../support/pageObjects/org-list.page'; 
import { orgForm} from '../support/pageObjects/org-form.page'; 
import { depList } from '../support/pageObjects/dep-list.page'; 
import { depForm } from '../support/pageObjects/dep-form.page'; 
import { depTree } from '../support/pageObjects/dep-tree.page'; 
import { depDetail } from '../support/pageObjects/dep-detail.page'; 
import { toast} from '../support/pageObjects/toast'; 


describe('Organisation', function () {

    it('creates a new organisation', function () {

        orgList.visit()

        orgList.newOrgBtn.click()

        cy.url().should('include', '/organisations/new')

        orgForm.name.type("Org n1")

        orgForm.description.type("Org n1 desc")

        orgForm.rootName.type("CEO of org n1")

        orgForm.rootDescription.type("CEO of org n1 desc")

        orgForm.submitBtn.click()

        toast.successToast

    })


    it('edit an organisation', function () {

        // cy.get('[data-cy=editOrg]').click()
        orgList.editBtn.click()


        cy.url().should('include', '/organisations')
            .and('include', '/edit')

        orgForm.name.should("have.value", "Org n1")

        orgForm.description.should("have.value", "Org n1 desc")

        orgForm.rootName.should("have.value", "CEO of org n1")

        orgForm.rootDescription.should("have.value", "CEO of org n1 desc")


        orgForm.name.type("***")

        orgForm.submitBtn.click()

        toast.infoToast



    })


    it('delete an organisation', function(){

        orgList.deleteBtn.click()

        toast.warningToast
    })


})


describe('Department', function () {

    before(function(){

        orgList.visit()

        orgList.newOrgBtn.click()

        cy.url().should('include', '/organisations/new')

        orgForm.name.type("Org n1")

        orgForm.description.type("Org n1 desc")

        orgForm.rootName.type("CEO of org n1")

        orgForm.rootDescription.type("CEO of org n1 desc")

        orgForm.submitBtn.click()


    })

    it('create a department', function () {

        cy.get('tbody>tr').eq(0).get('td').eq(0).click()

        cy.url().should('include', '/departments')

        depList.newDepBtn.click()


        cy.url().should('include', '/departments/new')

        depForm.name.type('dep1')

        depForm.description.type('dep1 desc')

        cy.get('.ant-select-arrow-icon').click()

        cy.contains('CEO of org n1').click()

        depForm.submitBtn.click()

        cy.url().should('include', '/departments')

        toast.successToast

    })


    it('edit a department', function () {

        // cy.request('POST', '/departments/new', {
        //     name: "dep2",
        //     description: "dep2 desc",
        //     parent: "CEO of org n1"

        // })

        depList.editBtn.eq(1).click()

        cy.url().should('include', '/departments')
            .and('include', '/edit')

        depForm.name.type('***')

        cy.get('.ant-select-arrow-icon').click()

        cy.contains('CEO of org n1').click()

        depForm.submitBtn.click()

        cy.url().should('include', '/departments')

        toast.infoToast

    })


    it('delete a department', function () {

        depList.deleteBtn.eq(1).click()


        toast.warningToast
    })


    it('shows a tree view', function(){

        depList.treeBtn.click()

        cy.url().should('include', '/departments/tree')

        depTree.backBtn.click()

    })


    it('shows the detail of a department', function(){

        cy.get('tbody>tr').eq(0).get('td').eq(0).click()

        cy.url().should('include', '/departments/')
            .and('include', '0')

        // check that the right content is sent

        depDetail.backBtn.click()

    })

    
})


describe('Department Edge Cases', function () {

    it('doesn\'t create a cycle', function(){

        cy.newDepartment('dep1', 'dep1 desc', 'CEO of org n1')

        cy.newDepartment('dep2', 'dep2 desc', 'dep1')

        depList.editBtn.eq(1).click()

        cy.url().should('include', '/departments')
            .and('include', '/edit')

        cy.get('.ant-select-arrow-icon').click()

        cy.contains('dep2').should('not.exist')

        cy.contains('CEO of org n1').click()

        depForm.submitBtn.click()



    })


    it('deletes all children of a deleted department', function(){

        depList.deleteBtn.eq(1).click()

        toast.warningToast.contains('dep1')

        toast.warningToast.contains('dep2')

        cy.get('tbody>tr').should('have.length', 1)

    })

})