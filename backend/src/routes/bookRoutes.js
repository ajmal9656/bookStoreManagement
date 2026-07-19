import express from "express";
import * as bookController from '../controllers/bookController.js'
import { createBookSchema, getAllBooksSchema } from "../validations/bookValidation.js";
import validate from "../middlewares/validationMiddleware.js";

const router = express.Router();

router.get("/",validate(getAllBooksSchema, "query"), bookController.getAllBooks);

router.post(
  "/",
  validate(createBookSchema, "body"),
  bookController.createBook
);

export default router;