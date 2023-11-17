"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Comments", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      comment: {
        type: Sequelize.STRING,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
          onDelete: "CASCADE", // Aturan ON DELETE CASCADE
          onUpdate: "CASCADE",
        },
        allowNull: false,
      },
      postId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Posts",
          key: "id",
          onDelete: "CASCADE", // Aturan ON DELETE CASCADE
          onUpdate: "CASCADE",
        },
        allowNull: false,
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
    await queryInterface.dropTable("Comments", null, {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  },
};
