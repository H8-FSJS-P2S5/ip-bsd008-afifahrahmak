"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const data = require("../data/categories.json");
    data.forEach((item) => {
      delete item.id;
      item.createdAt = item.updatedAt = new Date();
    });

    return queryInterface.bulkInsert("Categories", data);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("Categories", null, {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  },
};
