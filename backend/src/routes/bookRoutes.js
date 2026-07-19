import express from "express";
import * as bookController from '../controllers/bookController.js'
import { createBookSchema, getAllBooksSchema, idParamSchema, updateBookStockSchema } from "../validations/bookValidation.js";
import validate from "../middlewares/validationMiddleware.js";

const router = express.Router();

router.get("/",validate(getAllBooksSchema, "query"), bookController.getAllBooks);

router.post(
  "/",
  validate(createBookSchema, "body"),
  bookController.createBook
);

router.patch(
  "/:id/stock",
  validate(idParamSchema, "params"),
  validate(updateBookStockSchema, "body"),
  bookController.updateBookStock
);

export default router;