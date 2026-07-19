import Joi from "joi";

export const getAllBooksSchema = Joi.object({
  page: Joi.number()
    .integer()
    .min(1)
    .default(1)
    .messages({
      "number.base": "Page must be a number.",
      "number.integer": "Page must be an integer.",
      "number.min": "Page must be at least 1.",
    }),

  limit: Joi.number()
    .integer()
    .min(1)
    .max(50)
    .default(5)
    .messages({
      "number.base": "Limit must be a number.",
      "number.integer": "Limit must be an integer.",
      "number.min": "Limit must be at least 1.",
      "number.max": "Limit cannot exceed 50.",
    }),

  search: Joi.string()
    .trim()
    .allow("")
    .optional()
    .messages({
      "string.base": "Search must be a string.",
    }),

  minPrice: Joi.number()
    .min(0)
    .optional()
    .messages({
      "number.base": "Minimum price must be a number.",
      "number.min": "Minimum price cannot be negative.",
    }),

  inStock: Joi.boolean()
    .optional()
    .messages({
      "boolean.base": "In-stock must be true or false.",
    }),
}); 

export const createBookSchema = Joi.object({
  title: Joi.string()
    .trim()
    .min(3)
    .max(100)
    .required()
    .messages({
      "string.base": "Title must be a string.",
      "string.empty": "Title is required.",
      "string.min": "Title must be at least 3 characters.",
      "string.max": "Title cannot exceed 100 characters.",
      "any.required": "Title is required.",
    }),

  authorId: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      "number.base": "Author is required.",
      "number.integer": "Author is invalid.",
      "number.positive": "Author is invalid.",
      "any.required": "Author is required.",
    }),

  price: Joi.number()
    .min(0)
    .required()
    .messages({
      "number.base": "Price must be a number.",
      "number.min": "Price cannot be negative.",
      "any.required": "Price is required.",
    }),

  stock: Joi.number()
    .integer()
    .min(0)
    .required()
    .messages({
      "number.base": "Stock must be a number.",
      "number.integer": "Stock must be an integer.",
      "number.min": "Stock cannot be negative.",
      "any.required": "Stock is required.",
    }),
});
