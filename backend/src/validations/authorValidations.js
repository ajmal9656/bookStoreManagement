import Joi from "joi";

export const searchAuthorsSchema = Joi.object({
  search: Joi.string()
      .trim()
      .allow("")
      .optional()
      .messages({
        "string.base": "Search must be a string.",
      }),
});

export const listAuthorsSchema = Joi.object({
  search: Joi.string()
      .trim()
      .allow("")
      .optional()
      .messages({
        "string.base": "Search must be a string.",
      }),

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
});


export const createAuthorSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(3)
    .max(100)
    .required()
    .messages({
      "string.base": "Name must be a string.",
      "string.empty": "Name is required.",
      "string.min": "Name must be at least 3 characters.",
      "string.max": "Name cannot exceed 100 characters.",
      "any.required": "Name is required.",
    }),

  bio: Joi.string()
    .trim()
    .min(10)
    .max(500)
    .required()
    .messages({
      "string.base": "Bio must be a string.",
      "string.empty": "Bio is required.",
      "string.min": "Bio must be at least 10 characters.",
      "string.max": "Bio cannot exceed 500 characters.",
      "any.required": "Bio is required.",
    }),
});