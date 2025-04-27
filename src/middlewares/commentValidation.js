const { body } = require('express-validator');

const commentValidation = [
  body('text')
    .trim()
    .notEmpty().withMessage('Comment is empty')
    .isLength({ max: 250 }).withMessage('Maximum length of 250 characters'),
];

module.exports = commentValidation;