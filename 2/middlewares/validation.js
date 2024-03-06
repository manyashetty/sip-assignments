const { body, validationResult } = require("express-validator");

const validateLogin = [
  body("username")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Username is required."),
  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters."),
];
const validateBlog = [
  body("title")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Title is required."),
  body("content")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Content is required."),
  // Add more validation rules for blog properties
];
const validateRegistration = [
  body("username")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Username is required."),
  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters."),

];

const validateInputs = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};

module.exports = {
  validateLogin,
  validateRegistration,
  validateInputs,
  validateBlog
};
