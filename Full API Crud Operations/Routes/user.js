//                                          users route hander:

const express = require("express");
const router = express.Router();
const usersController = require("../Controllers/usersController");
const usersMiddleware = require("../Middleware/usersMiddleware");

router
  .route("/")
  .get(usersMiddleware.tokenVerfication, usersController.getAllUsers);

router.route("/register").post(usersController.register);

router.route("/login").post(usersController.login);

module.exports = router;
