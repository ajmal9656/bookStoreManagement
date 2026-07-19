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
    console.log("contro",result);
    

    return res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    next(error);
  }
};

