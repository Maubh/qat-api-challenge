/// <reference types="cypress"  />

import { faker } from '@faker-js/faker';

describe('Pet API', (pet) => {
    it('should create a new pet to the store', () => {

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
                    id: 0,
                    name: "srd"
                  }
                ],
                status: "available",
        }
        
        // Create the pet
        cy.apiAddPetStore(pet)
        .then(response => {
          expect(response.status).to.equal(200)          
              
        })
        
    });


    it('should create a new pet without informing the Id', () => {

      // Pet data
      const pet = {            
          
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
              status: "available",
      }
      
      // Create the pet
      cy.apiAddPetStore(pet)
      .then(response => {
        expect(response.status).to.equal(500)          
            
      })
      
  });

    it('should create a new pet and retrieve it by id', () => {

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
                  id: 0,
                  name: "srd"
                }
              ],
              status: "available"

      }
      
        // Create the pet
        cy.apiAddPetStore(pet)
        .then(response => {
            expect(response.status).to.equal(200)

        })

        //Find the pet by Id
        cy.apiGetPetId(pet)
        .then(response => {
            expect(response.status).to.eq(200)
            expect(response.body.id).to.eq(pet.id)

        })
      


  });

  it('should create a new pet and retrieve it by status', () => {

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
                id: 1,
                name: "sphynx"
              }
            ],
            status: "pending"

    }
    
      // Create the pet
      cy.apiAddPetStore(pet)
      .then(response => {
          expect(response.status).to.equal(200)
          expect(response.body.id).to.eq(pet.id)

      })

      // Find the pet by status
      cy.apiGetPetStatus(pet)
      .then(response => {
          expect(response.status).to.eq(200)
          expect(response.body).to.be.an('array');
          // Check if the pet created previously is being returned on the GetPetStatus request
          const foundPet = response.body.find(petItem => petItem.id === pet.id);
          expect(foundPet).to.not.be.undefined;

      })

  });

  it('should create a new pet and retrieve it by a empty status', () => {

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
                id: 1,
                name: "sphynx"
              }
            ],
            status: "pending"

    }
    
      // Create the pet
      cy.apiAddPetStore(pet)
      .then(response => {
          expect(response.status).to.equal(200)
          expect(response.body.id).to.eq(pet.id)

      })

      // Find the pet by status
      cy.apiGetPetStatusEmpty(pet)
      .then(response => {
          expect(response.status).to.eq(400)
      })
    


  });

  it('should try to retrieve a non-existent pet by id', () => {
      //Find the pet by Id
      const pet = {
        id: 15615161516156165
      }
      cy.apiGetPetId(pet.id)
      .then(response => {
          expect(response.status).to.eq(400)

      })
    


  });

  it('should create a pet and update it by id', () => {
    
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
          id: 1,
          name: "sphymx"
        }
      ],
      status: "pending",
}

    const updatePet = {
        id: pet.id,
        name: "Donatella",
        status: "available"

    }
    
    // Create the pet
    cy.apiAddPetStore(pet)
    .then(response => {
      const petId = response.body.id
      cy.log("the pet id is: " + petId)
        expect(response.status).to.equal(200)

    })

    // Update the pet information
    cy.apiUpdatePet(pet, updatePet)
    .then(response => {
      expect(response.status).to.equal(200)

    })
   

    // Find the pet by Id
    cy.apiGetPetId(updatePet)
    .then(response => {
        expect(response.status).to.eq(200)
        expect(response.body.id).to.eq(updatePet.id)
        expect(response.body.name).to.eq(updatePet.name)
        expect(response.body.status).to.eq(updatePet.status)

    })


  });

  it('should try to update a pet without informing an id', () => {
    
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
          id: 0,
          name: "srd"
        }
      ],
      status: "sold",
}

    const updatePet = {
        name: "Donatella",
        status: "available"
    }
    
    // Create the pet
    cy.apiAddPetStore(pet)
    .then(response => {
        expect(response.status).to.equal(200)

    })

    // Update the pet information
    cy.apiUpdatePet(pet, updatePet)
    .then(response => {
      expect(response.status).to.equal(500)

    })

  });

  it('should update a non-existent pet', () => {


    const pet = {
      id: faker.number.int(100),
      name: faker.person.firstName(),
      category: {
        id: 2,
        name: "Dogs"
      },
      photoUrls: [
        "string"
      ],
      tags: [
        {
          id: 3,
          name: "golden"
        }
      ],
      status: "sold",
    }

    const updatePet = {
        id: 1232456,
        name: faker.person.firstName()
    }

    // Update the pet information
    cy.apiUpdatePet(pet, updatePet)
    .then(response => {
        expect(response.status).to.equal(404)
    })

})    

  it('should create a pet and then delete it', () => {

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
          id: 0,
          name: "srd"
        }
      ],
      status: "sold",
  }
      
    // Create the pet
    cy.apiAddPetStore(pet)
    .then(response => {
        expect(response.status).to.equal(200)
  
    })
  
    // Delete the pet
    cy.apiDeletePet(pet)
    .then(response => {
      expect(response.status).to.equal(200)
  
    })

    // Find the pet by Id
    cy.apiGetPetId(pet)
    .then(response => {
        expect(response.status).to.eq(404)
    })
    
  
  });

});





    
