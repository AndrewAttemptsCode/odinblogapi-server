const { body } = require('express-validator');
const prisma = require('../../config/prismaClient');

const registerValidation = [
  body('username')
    .trim()
    .isLength({ min: 3 }).withMessage('Minimum length of 3 characters')
    .isLength({ max: 20 }).withMessage('Maximum length of 20 characters')
    .matches(/^[a-zA-Z0-9]+$/).withMessage('Letters and numbers only')
    .custom(async (username) => {
      try {
        const userExists = await prisma.user.findUnique({
          where: { username },
        });
        if (userExists) {
          throw new Error('Username already exists');
        }
        return true;
      } catch (error) {
        if (error.message === 'Username already exists') throw error;
        throw new Error('Database query failed. Please try again later.')
      }
    }),

  body('email')
    .trim()
    .isEmail().withMessage('Invalid Email syntax')
    .custom(async (email) => {
      try {
        const existingEmail = await prisma.user.findUnique({
          where: { email },
        });
        if (existingEmail) {
          throw new Error('Email already exists');
        }
        return true;
      } catch (error) {
        if (error.message === 'Email already exists') throw error;
        throw new Error('Database query failed. Please try again later.')
      }      
    }),

  body('password')
    .trim()
    .isLength({ min: 8 }).withMessage('Minimum length of 8 characters'),

  body('confirmPassword')
    .trim()
    .custom((confirmPassword, { req }) => {
      if (confirmPassword !== req.body.password || confirmPassword === '') {
        throw new Error('Passwords do not match');
      }
      return true;
    }),
];

module.exports = registerValidation;