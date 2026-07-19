import * as authorService from "../services/authorService.js";

export const searchAuthors = async (req, res, next) => {
  try {
    const authors = await authorService.searchAuthors(req.query);
    console.log(authors);

    return res.status(200).json({
      success: true,
      authors,
    });
  } catch (error) {
    next(error);
  }
};

export const getAuthors = async (req, res, next) => {
  try {
    const result = await authorService.getAuthors(req.query);
    console.log("contro", result);

    return res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    next(error);
  }
};

export const createAuthor = async (req, res, next) => {
  try {
    const author = await authorService.createAuthor(req.body);

    return res.status(201).json({
      success: true,
      message: "Author created successfully.",
      author,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteAuthor = async (req, res, next) => {
  try {
    await authorService.deleteAuthor(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Author deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};

export const getAuthorById = async (req, res, next) => {
  try {
    console.log("query", req.query);

    const result = await authorService.getAuthorById(req.params.id, req.query);

    return res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    next(error);
  }
};
