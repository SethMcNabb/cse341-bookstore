const Validator = require("validatorjs");

const validateBook = (req, res, next) => {
  const validationRule = {
    title: "required|string",
    author: "required|string",
    genre: "required|string",
    publishYear: "required|numeric",
    pages: "required|numeric",
  };

  const validation = new Validator(req.body, validationRule);

  if (validation.fails()) {
    return res.status(422).json({
      success: false,
      message: "Validation failed",
      data: validation.errors.all(),
    });
  }

  next();
};

module.exports = {
  validateBook,
};
