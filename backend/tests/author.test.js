import { createAuthor } from "./helpers.js";

describe("Author APIs", () => {
  describe("POST /api/authors", () => {
    it("should create an author successfully", async () => {
      const response = await createAuthor();

      expect(response.status).toBe(201);

      expect(response.body.author).toHaveProperty("id");
      expect(response.body.author.name).toBe("James Clear");
      expect(response.body.author.bio).toBe("Author of Atomic Habits");
    });

    it("should reject duplicate author name", async () => {
      await createAuthor();

      const response = await createAuthor();

      expect(response.status).toBe(409);

      expect(response.body.error.message).toBe(
        "An author with this name already exists."
      );

      expect(response.body.error.errors).toEqual([]);
    });
  });
});