"use strict";

const BcryptHelper = require("../helpers/bcrypt");

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
        let data = require("../data/users.json");
        data = data.map((d) => {
            d.password = BcryptHelper.hashPassword(d.password);
            d.createdAt = new Date();
            d.updatedAt = new Date();
            return d;
        });
        await queryInterface.bulkInsert("Users", data);
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete("Users", null, {});
    },
};
