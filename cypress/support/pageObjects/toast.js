
class Toast {
    
    get successToast(){
        return cy.get(".toast-success")
    }

    get infoToast(){
        return cy.get(".toast-info")
    }

    get warningToast(){
        return cy.get(".toast-warning")
    }

    
}



export const toast = new Toast();