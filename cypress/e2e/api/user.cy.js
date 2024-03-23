/// <reference types="cypress"  />

import { faker } from '@faker-js/faker';

describe('User API', (user) => {

    it('should log in', () => {

        // User data
        const user = {            
            id: faker.number.int(100),
            username: faker.internet.userName(),
            firstName: faker.person.firstName(),
            lastName:faker.person.lastName(), 
            email: faker.internet.email(),
            password: faker.internet.password(),
            phone: faker.phone.number(),
            userStatus: 1 
        }
        
        // Create the user
        cy.apiCreateUser(user)
        .then(response => {
            expect(response.status).to.equal(200)

        })

        // Login
        cy.api_loginUser(user)
        .then(response => {
            expect(response.status).to.equal(200)
        })
        
        
    });
    it('should create a new user', () => {

        // User data
        const user = {            
            id: faker.number.int(100),
            username: faker.internet.userName(),
            firstName: faker.person.firstName(),
            lastName:faker.person.lastName(), 
            email: faker.internet.email(),
            password: faker.internet.password(),
            phone: faker.phone.number(),
            userStatus: 1 
        }
        
        // Create a user
        cy.apiCreateUser(user)
        .then(response => {
            expect(response.status).to.equal(200)

        })


    });

    it('should create a user and retrieve it by username', () => {

        // User data
        const user = {            
            id: faker.number.int(100),
            username: faker.internet.userName(),
            firstName: faker.person.firstName(),
            lastName:faker.person.lastName(), 
            email: faker.internet.email(),
            password: faker.internet.password(),
            phone: faker.phone.number(),
            userStatus: 2 
        }
        
        // Create the user
        cy.apiCreateUser(user)
        .then(response => {
            expect(response.status).to.equal(200)

        })

        // Find user by username
        cy.apiGetUserByName(user)
        .then(response => {
            expect(response.status).to.eq(200)
            expect(response.body.username).to.eq(user.username)

        })


    });

    it('should create a user and update it by username', () => {
        
        // User data
        const user = {            
            id: faker.number.int(100),
            username: faker.internet.userName(),
            firstName: faker.person.firstName(),
            lastName:faker.person.lastName(), 
            email: faker.internet.email(),
            password: faker.internet.password(),
            phone: faker.phone.number(),
            userStatus: 3
        }

        // User data to be updated
        const updateUser = {
            username: faker.internet.userName(),
            firstName: faker.person.firstName(),
            lastName:faker.person.lastName(), 

        }
        
        // Create the user
        cy.apiCreateUser(user)
        .then(response => {
            expect(response.status).to.equal(200)

        })

        // Update the user information
        cy.apiUpdateUser(user, updateUser)
        .then(response => {
            expect(response.status).to.equal(200)

        })

        // Find user by username
        cy.apiGetUserByName(updateUser)
        .then(response => {
            expect(response.status).to.eq(200)
            expect(response.body.username).to.eq(updateUser.username)
            expect(response.body.firstName).to.eq(updateUser.firstName)
            expect(response.body.email).to.eq(updateUser.email)

        })


    });
 
    
    it('should update an inexistent user', () => {

        // User data
        const user = {
            id: faker.number.int(100),
            username: faker.internet.userName(),
        }

        // User data to be updated
        const updateUser = {
            id: faker.number.int(100),
            username: faker.internet.userName(),
        }

        // Update user information without create an user
        cy.apiUpdateUser(user, updateUser)
        .then(response => {
            expect(response.status).to.equal(404)
        })
    
    })   

    it('should create a user and then delete it', () => {

        // User data
        const user = {            
            id: faker.number.int(100),
            username: faker.internet.userName(),
            firstName: faker.person.firstName(),
            lastName:faker.person.lastName(), 
            email: faker.internet.email(),
            password: faker.internet.password(),
            phone: faker.phone.number(),
            userStatus: 1 
        }
        
        // Create the user
        cy.apiCreateUser(user)
        .then(response => {
            expect(response.status).to.equal(200)

        })

        // Before to delete a user, it's necessary to do the log in
        cy.api_loginUser(user)
        .then(response => {
            expect(response.status).to.equal(200)
        })

        // Delete a user
        cy.apiDeleteUser(user)
        .then(response => {
            expect(response.status).to.equal(200)
        })

        // Find user by username
        cy.apiGetUserByName(user)
        .then(response => {
            expect(response.status).to.eq(404)
        })


    });


});
