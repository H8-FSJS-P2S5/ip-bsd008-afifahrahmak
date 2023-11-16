'use strict';
const { hash } = require("../helpers/bcryptjs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = require("../data/users.json")
    users.forEach((user) => {
      delete user.id
      user.password = hash(user.password)
      user.createdAt = user.updatedAt = new Date()
    })
    await queryInterface.bulkInsert("Users", users, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {})
  }
};
