import { body ,query } from 'express-validator';

const usersValidationScheme = [
  body('userName')
    .notEmpty().withMessage("No user entered")  // Ensures it's not empty
    .isString().withMessage("Username must be a string")  // Ensures it's a string
    .isLength({ min: 2, max: 20 }).withMessage("Username must be between 2 and 20 characters")  // Checks length
    .matches(/^[^\d].*/).withMessage("Username must not start with a number") // Ensures it doesn't start with a number
  ,body('email')
    .notEmpty().withMessage("email is empty")
];

export default usersValidationScheme;