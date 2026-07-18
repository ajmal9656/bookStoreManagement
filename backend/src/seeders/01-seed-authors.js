"use strict";

export default {
  async up(queryInterface) {
    await queryInterface.bulkInsert("authors", [
      {
        name: "James Clear",
        bio: "Author of Atomic Habits.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Robert C. Martin",
        bio: "Known as Uncle Bob.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Martin Fowler",
        bio: "Software architect and author.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("authors", null, {});
  },
};