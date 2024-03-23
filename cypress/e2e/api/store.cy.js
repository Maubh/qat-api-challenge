/// <reference types="cypress"  />

import { faker } from '@faker-js/faker';

describe('Store API', () => {
    it('should place a new order in the store', () => {

      // Pet data
        const pet = {
            id: faker.number.int(100),
            name: faker.person.firstName(),
            category: {
              id: 1,
              name: "Cats"
            },
            photoUrls: [
              "string"
            ],
            tags: [
              {
                id: faker.number.int(100),
                name: "srd"
              }
            ],
            status: "available"
        }

        // Order data
        const order = {
            id: faker.number.int(100),
            petId: pet.id,
            quantity: faker.number.int(10),
            shipDate: faker.date.recent(),
            status: "placed",
            complete: true
        }

        // Create a pet        
        cy.apiAddPetStore(pet)
        .then(response => {
          expect(response.status).to.equal(200)          
              
        })

        // Place an order for a pet
        cy.apiAddStore(order)
        .then(response => {
            expect(response.status).to.equal(200)
    
        })
  
        
    });


    it('should place a new order and retrieve it by order id', () => {

      // Pet data
      const pet = {
          id: faker.datatype.number(),
          name: faker.person.firstName(),
          category: {
            id: 1,
            name: "Cats"
          },
          photoUrls: [
            "string"
          ],
          tags: [
            {
              id: 0,
              name: "srd"
            }
          ],
          status: "available"
      }

      // Order data
      const order = {
          id: faker.number.int(100),
          petId: pet.id,
          quantity: faker.number.int(10),
          shipDate: faker.date.recent(),
          status: "placed",
          complete: true
      }

      // Create a new pet    
      cy.apiAddPetStore(pet)
      .then(response => {
        expect(response.status).to.equal(200)          
            
      })

      // Place the order
      cy.apiAddStore(order)
      .then(response => {
          expect(response.status).to.equal(200)
  
      })

      // Find the order by Id
      cy.apiGetOrderId(order)
      .then(response => {
        expect(response.status).to.equal(200)
        expect(response.body.id).to.eq(order.id)

    })
  });


  it('should try to retrieve a non-existent order by id', () => {
        // Pet Data
        const order = {
            id: faker.number.int(1000)
        }

        // Find the order by Id
        cy.apiGetOrderId(order)
        .then(response => {
          expect(response.status).to.eq(404)
        })
  
  
  });


  it('should place a new order and then delete it', () => {

    // Pet data
    const pet = {
        id: faker.datatype.number(1000),
        name: faker.person.firstName(),
        category: {
          id: 1,
          name: "Cats"
        },
        photoUrls: [
          "string"
        ],
        tags: [
          {
            id: 1,
            name: "sphynx"
          }
        ],
        status: "available"
    }

    // Order data
    const order = {
      id: faker.number.int(100),
      petId: pet.id,
      quantity: faker.number.int(10),
      shipDate: faker.date.recent(),
      status: "placed",
      complete: true
    }

    // Create a new pet    
    cy.apiAddPetStore(pet)
    .then(response => {
      expect(response.status).to.equal(200)          
          
    })

    // Place the order
    cy.apiAddStore(order)
    .then(response => {
        expect(response.status).to.equal(200)

    })

    // Delete the order
    cy.apiDeleteOrder(order)
    .then(response => {
        expect(response.status).to.equal(200)

    })

    // Find the order by Id
    cy.apiGetOrderId(order)
    .then(response => {
      expect(response.status).to.equal(404)
    })
    
  });

});


