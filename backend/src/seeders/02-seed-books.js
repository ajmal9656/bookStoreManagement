"use strict";

export default {
  async up(queryInterface) {
    await queryInterface.bulkInsert("books", [
      {
        title: "Atomic Habits",
        isbn: "9780735211292",
        price: 599.00,
        stock: 25,
        authorId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Clean Code",
        isbn: "9780132350884",
        price: 799.00,
        stock: 18,
        authorId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Refactoring",
        isbn: "9780134757599",
        price: 899.00,
        stock: 10,
        authorId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("books", null, {});
  },
};