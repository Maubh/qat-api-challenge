Cypress.Commands.add('apiAddPetStore', pet => {
    cy.request({
        method: 'POST',
        url: `/pet`,
        failOnStatusCode: false,   
        body:{
            id: pet.id,
            name: pet.name,
            category: pet.category,
            tags: pet.tags,
            status: pet.status
        }   
        
    })

})

// Retrieve pet information by Id 
Cypress.Commands.add('apiGetPetId', pet => { 
    cy.request({
        method: 'GET',
        url: `/pet/${pet.id}`,
        failOnStatusCode: false         
    })

});


// Retrieve pet information by Status 
Cypress.Commands.add('apiGetPetStatus', pet => { 
    cy.request({
        method: 'GET',
        url: `/pet/findByStatus?status=${pet.status}`,
        failOnStatusCode: false         
    })

});

// Retrieve pet information by a empty status 
Cypress.Commands.add('apiGetPetStatusEmpty', pet => { 
    cy.request({
        method: 'GET',
        url: `/pet/findByStatus`,
        failOnStatusCode: false         
    })

});

// Update pet information by Id
Cypress.Commands.add('apiUpdatePet', (pet, updatePet) => {
    cy.request({
        method: 'PUT',
        url: `/pet`,
        failOnStatusCode: false,
        body: {
            id: updatePet.id,
            name: updatePet.name,
            status: updatePet.status
        }            
    })
   

})

// Delete a pet
Cypress.Commands.add('apiDeletePet', (pet) => {
    cy.request({
        method: 'DELETE',
        url: `/pet/${pet.id}`,
        failOnStatusCode: false           
    })
   

})
