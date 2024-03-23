// Update user information by username
Cypress.Commands.add('api_loginUser', user => {
    cy.request({
        method: 'GET',
        url: `/user/login?username=${user.username}&password=${user.password}`      
    })
   

})

Cypress.Commands.add('api_logoutUser', () => {
    cy.request({
        method: 'GET',
        url: `/user/logout`      
    })
   

})
