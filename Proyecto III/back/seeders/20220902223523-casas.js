'use strict';

let tipo=["Casa 1 piso", "Departamento", "Casa residencial", "Duplex", "Casa en ciudadela", "Suite"]  

module.exports = {
  async up (queryInterface, Sequelize) {
    for (let i = 0; i <50; i++) {  
      await queryInterface.bulkInsert('casas', [{

          tipo: tipo[Math.floor(Math.random() * tipo.length)],
          propietario_id: Math.floor(Math.random() *40), 
          createdAt: new Date(),  
          updatedAt: new Date()  
      }], {});  
   } 
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('casas', null, {});
  }
};
