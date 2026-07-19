import {
  createAuthor,
  createBook,
  getBook,
  updateBookStock,
} from "./helpers.js";

describe("Book APIs", () => {

  it("should complete the full happy path flow", async () => {
    // Create Author
    const authorResponse = await createAuthor();
    expect(authorResponse.status).toBe(201);

    const authorId = authorResponse.body.author.id;

    // Create Book
    const bookResponse = await createBook(authorId);

    expect(bookResponse.status).toBe(201);
    expect(bookResponse.body.book).toHaveProperty("id");
    expect(bookResponse.body.book.title).toBe("Atomic Habits");
    expect(bookResponse.body.book.stock).toBe(10);

    const bookId = bookResponse.body.book.id;

    // Increase Stock
    const updateResponse = await updateBookStock(
      bookId,
      "increase",
      5
    );

    expect(updateResponse.status).toBe(200);

    // Fetch Updated Book
    const getResponse = await getBook(bookId);

    expect(getResponse.status).toBe(200);
    expect(getResponse.body.book.stock).toBe(15);
  });

  it("should reject invalid book payload", async () => {
    const authorResponse = await createAuthor();
    const authorId = authorResponse.body.author.id;

    const response = await createBook(authorId, {
      title: "",
      price: -10,
      stock: -5,
    });

    expect(response.status).toBe(400);

    expect(response.body.error.message).toBe("Validation failed");

    expect(response.body.error.errors.length).toBeGreaterThan(0);
  });

  it("should reject stock reduction below zero", async () => {
    const authorResponse = await createAuthor();
    const authorId = authorResponse.body.author.id;

    const bookResponse = await createBook(authorId);
    const bookId = bookResponse.body.book.id;

    const response = await updateBookStock(
      bookId,
      "decrease",
      20
    );

    expect(response.status).toBe(400);

    expect(response.body.error.message).toBe("Validation failed.");

    expect(response.body.error.errors).toContainEqual({
      field: "quantity",
      message: "Quantity cannot exceed current stock.",
    });
  });
});