'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const pets = require("../data/pets.json")
    pets.forEach((pet) => {
      delete pet.id
      pet.createdAt = pet.updatedAt = new Date()
    })
    await queryInterface.bulkInsert("Pets", pets, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Pets", null, {})
  }
};
