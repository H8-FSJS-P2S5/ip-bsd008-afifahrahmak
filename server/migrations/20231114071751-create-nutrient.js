"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Nutrients", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            calories: {
                type: Sequelize.FLOAT,
            },
            carbs: {
                type: Sequelize.FLOAT,
            },
            protein: {
                type: Sequelize.FLOAT,
            },
            fat: {
                type: Sequelize.FLOAT,
            },
            sugar: {
                type: Sequelize.FLOAT,
            },
            fiber: {
                type: Sequelize.FLOAT,
            },
            sodium: {
                type: Sequelize.FLOAT,
            },
            cholesterol: {
                type: Sequelize.FLOAT,
            },
            recipeId: {
                type: Sequelize.INTEGER,
                references: {
                    model: "Recipes",
                    key: "id",
                },
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("Nutrients");
    },
};
