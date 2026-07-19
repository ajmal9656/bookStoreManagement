import ApiError from "../errors/ApiError.js";
import * as bookRepository from "../repositories/bookRepository.js";
import { checkFieldValueExist } from "../utils/checkFieldValueExist.js";
import generateISBN from "../utils/generateISBN.js";


export const getAllBooks = async (query) => {
  const page = Math.max(1, Number(query.page) || 1);

  const limit = Math.min(
    50,
    Math.max(1, Number(query.limit) || 5)
  );

  const search = query.search?.trim();

  const minPrice =
    query.minPrice !== undefined
      ? Number(query.minPrice)
      : undefined;

  const { count, rows } = await bookRepository.findAllBooks({
    page,
    limit,
    search,
    inStock: query.inStock,
    minPrice,
  });

  return {
    books: rows.map((book) => book.toJSON()),
    currentPage: page,
    totalPages: Math.ceil(count / limit),
    totalBooks: count,
  };
};


export const createBook = async ({
  title,
  authorId,
  price,
  stock,
}) => {
  const authorExists = await checkFieldValueExist(
    "Author",
    "id",
    authorId
  );
  
  

  if (!authorExists) {
    throw new ApiError(404, "Author not found.");

    
  }
  const trimmedTitle = title.trim();
  const titleExists = await checkFieldValueExist(
  "Book",
  "title",
  trimmedTitle,
  undefined,
  {
    authorId,
  }
);
console.log("checks",titleExists);

if (titleExists) {
  console.log("inside");
  
  throw new ApiError(
    409,
    "This author already has a book with the same title."
  );
}

  let isbn;

  do {
    isbn = generateISBN();
  } while (
    await checkFieldValueExist(
      "Book",
      "isbn",
      isbn
    )
  );

  const book = await bookRepository.create({
    title: title.trim(),
    isbn,
    authorId,
    price,
    stock,
  });

  return book.toJSON();
};



export const updateBookStock = async (
  id,
  { operation, quantity }
) => {
  const book = await bookRepository.getBookById(id);

  if (!book) {
    throw new ApiError(404, "Book not found.");
  }

  if (
    operation === "decrease" &&
    quantity > book.stock
  ) {
    throw new ApiError(
      400,
      "Validation failed.",
      [
        {
          field: "quantity",
          message: "Quantity cannot exceed current stock.",
        },
      ]
    );
  }

  return await bookRepository.updateBookStock(
    id,
    operation,
    quantity
  );
};