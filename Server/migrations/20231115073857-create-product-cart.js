"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ProductCarts", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      ProductId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Products",
          },
          key: "id",
        },
      },
      CartId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Carts",
          },
          key: "id",
        },
      },
      productQuantity: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable("ProductCarts");
  },
};
