

// Create a new user
Cypress.Commands.add('apiCreateUser', user => {
    cy.request({
        method: 'POST',
        url: `/user`,
        body:{
            id: user.id,
            username: user.username,
            firstName: user.firstName,
            lastName:user.lastName, 
            email: user.email,
            password: user.password,
            phone: user.phone,
            userStatus:user.userStatus
        }
    
    })


})

// Retrieve user information by username 
Cypress.Commands.add('apiGetUserByName', user => {
    cy.request({
        method: 'GET',
        url: `/user/${user.username}`,
        failOnStatusCode: false         
    })

})

// Update user information by username
Cypress.Commands.add('apiUpdateUser', (user, updateUser) => {
    cy.request({
        method: 'PUT',
        url: `/user/${user.username}`,
        failOnStatusCode: false,
        body: {
            username: updateUser.username,
            firstName: updateUser.firstName,
            email: updateUser.email
        }            
    })
   

})

// Delete user
Cypress.Commands.add('apiDeleteUser', user => {
    cy.request({
        method: 'DELETE',
        url: `/user/${user.username}`,
        failOnStatusCode: false
    })
   

})

