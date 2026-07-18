import * as bookService from "../services/bookService.js";

export const getAllBooks = async (req, res, next) => {
  try {
    const result = await bookService.getAllBooks(req.query);
    console.log(result);
    

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};