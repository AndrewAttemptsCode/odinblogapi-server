const { body } = require('express-validator');

const postValidation = [
  body('title')
    .trim()
    .notEmpty().withMessage('Title is empty')
    .isLength({ max: 30 }).withMessage('Maximum length of 30 characters'),

  body('text')
    .trim()
    .notEmpty().withMessage('Post is empty'),
];

module.exports = postValidation;