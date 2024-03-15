//                                   courses route hander:

const express = require("express");
const router = express.Router();

let courseControllers = require("../Controllers/coursesController");
let middlewares = require("../Middleware/coursesMidleware");
let tokenMiddleware = require("../Middleware/usersMiddleware");
const allowedTo = require("../Middleware/allowTo");

router
  .route("/getAllCourses")
  .get(tokenMiddleware.tokenVerfication, courseControllers.getAllCourses);

router
  .route("/getCourse/:courseId")
  .get(tokenMiddleware.tokenVerfication, courseControllers.getSpecificCourse);

router
  .route("/addCourse")
  .post(
    tokenMiddleware.tokenVerfication,
    middlewares.postMidleware,
    courseControllers.addCourse
  );

router
  .route("/updateCourse/:courseId")
  .patch(
    tokenMiddleware.tokenVerfication,
    middlewares.patchMidelware,
    courseControllers.updateCourse
  );

router
  .route("/deleteCourse/:courseId")
  .delete(
    tokenMiddleware.tokenVerfication,
    allowedTo("admain", "manger"),
    courseControllers.deleteCourse
  );

module.exports = router;
