import express from "express";
import validate from "../middlewares/validationMiddleware.js";
import * as authorController from '../controllers/authorController.js'
import { createAuthorSchema, idParamSchema, listAuthorsSchema, searchAuthorsSchema } from "../validations/authorValidations.js";

const router = express.Router();

router.get(
  "/search",
  validate(searchAuthorsSchema, "query"),
  authorController.searchAuthors
);

router.get(
  "/",
  validate(listAuthorsSchema, "query"),
  authorController.getAuthors
);

router.post(
  "/",
  validate(createAuthorSchema, "body"),
  authorController.createAuthor
);

router.delete(
  "/:id",
  validate(idParamSchema, "params"),
  authorController.deleteAuthor
);


export default router;