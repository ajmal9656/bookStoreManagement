import * as bookService from "../services/bookService.js";

export const getAllBooks = async (req, res, next) => {
  try {
    const result = await bookService.getAllBooks(req.query);

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const createBook = async (req, res, next) => {
  try {
    const book = await bookService.createBook(req.body);

    return res.status(201).json({
      success: true,
      message: "Book created successfully.",
      book,
    });
  } catch (error) {
    next(error);
  }
};

export const getBookById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const book = await bookService.getBookById(id);

    res.status(200).json({
      success: true,
      book,
    });
  } catch (error) {
    next(error);
  }
};

export const updateBookStock = async (req, res, next) => {
  try {

    const { id } = req.params;

    const book = await bookService.updateBookStock(id, req.body);

    return res.status(200).json({
      success: true,
      message: "Stock updated successfully.",
      book,
    });
  } catch (error) {
    next(error);
  }
};
