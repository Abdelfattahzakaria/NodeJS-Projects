//                               middlewares:

const { body } = require("express-validator");

let postMidleware = [
  body("title")
    .notEmpty()
    .withMessage("Title Must Not Be Empty")
    .isLength({ min: 3 })
    .withMessage("Title Must Be Greater Than 3"),
  body("price").notEmpty().withMessage("Price Must Not Be Null"),
];

let patchMidelware = body("title")
  .notEmpty()
  .withMessage("Title Must Not Be Empty")
  .isLength({ min: 3 })
  .withMessage("Title Length Must Be Greater Than 3");

module.exports = { postMidleware, patchMidelware };
