'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const species = require("../data/species.json");
    species.forEach((el) => {
      delete el.id;
      el.createdAt = el.updatedAt = new Date();
    });
    await queryInterface.bulkInsert("Species", species, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Species", null, {});
  },
};
