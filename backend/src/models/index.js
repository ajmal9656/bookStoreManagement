import Author from "./Author.js";
import Book from "./Book.js";

Author.hasMany(Book, {
  foreignKey: "authorId",
  as: "books",
  onDelete: "RESTRICT",
});

Book.belongsTo(Author, {
  foreignKey: "authorId",
  as: "author",
});

export { Author, Book };