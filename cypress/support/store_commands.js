Cypress.Commands.add('apiAddStore', order => {
    cy.request({
        method: 'POST',
        url: `/store/order`,
        body:{
            id: order.id,
            petId: order.petId,
            quantity: order.quantity,
            shipDate: order.shipDate,
            status: order.status,
            complete: order.complete,
        }   
        
    })

})

Cypress.Commands.add('apiGetOrderId', order => {
    cy.request({
        method: 'GET',
        url: `/store/order/${order.id}`,
        failOnStatusCode: false,
        body:{
            id: order.id,
            petId: order.petId,
            quantity: order.quantity,
            shipDate: order.shipDate,
            status: order.status,
            complete: order.complete,
        }   
        
    })

})

// Delete a pet
Cypress.Commands.add('apiDeleteOrder', (order) => {
    cy.request({
        method: 'DELETE',
        url: `/store/order/${order.id}`,
        failOnStatusCode: false          
    })
   

})
