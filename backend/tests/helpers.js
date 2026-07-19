import request from "supertest";
import app from "../src/app.js";

const defaultAuthor = {
  name: "James Clear",
  bio: "Author of Atomic Habits",
};

const defaultBook = {
  title: "Atomic Habits",
  price: 500,
  stock: 10,
};

/**
 * Create a new author
 */
export const createAuthor = async (data = {}) => {
  return request(app)
    .post("/api/authors")
    .send({
      ...defaultAuthor,
      ...data,
    });
};

/**
 * Create a new book
 */
export const createBook = async (authorId, data = {}) => {
  return request(app)
    .post("/api/books")
    .send({
      ...defaultBook,
      authorId,
      ...data,
    });
};

/**
 * Get a book by ID
 */
export const getBook = async (bookId) => {
  return request(app).get(`/api/books/${bookId}`);
};

/**
 * Update book stock
 */
export const updateBookStock = async (
  bookId,
  operation,
  quantity
) => {
  return request(app)
    .patch(`/api/books/${bookId}/stock`)
    .send({
      operation,
      quantity,
    });
};