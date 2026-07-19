"use strict";

export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("books", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      isbn: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },

      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },

      stock: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },

      authorId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "authors",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
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

  async down(queryInterface) {
    await queryInterface.dropTable("books");
  },
};