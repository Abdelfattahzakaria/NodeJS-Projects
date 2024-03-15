//                                     Courses Controller Functions:

const { validationResult } = require("express-validator");
const Course = require("../Modules/course");
const HTTPStatus = require("../Utils/statusText");

let getAllCourses = async (req, res) => {
  try {
    let limit = req.query.limit || 5;
    let page = req.query.page || 1;
    let skip = (page - 1) * limit;
    let courses = await Course.find({}, { __v: false }).limit(limit).skip(skip);
    if (courses) {
      res.status(201).json({
        status: HTTPStatus.SUCCESS,
        data: { courses: courses },
      });
      res.end();
      return;
    }
    res.status(404).json({
      status: HTTPStatus.Fail,
      data: null,
    });
    res.end();
  } catch (error) {
    res.status(400).json({
      status: HTTPStatus.ERROR,
      msg: error.message,
    });
    res.end();
  }
};

let getSpecificCourse = async (req, res) => {
  try {
    let course = await Course.findById(req.params.courseId);
    if (course) {
      res.status(201).json({
        status: HTTPStatus.SUCCESS,
        data: { course: course },
      });
      res.end();
      return;
    }
    res.status(404).json({
      status: HTTPStatus.Fail,
      data: null,
    });
    res.end();
  } catch (error) {
    res.status(400).json({
      status: HTTPStatus.ERROR,
      msg: error.message,
    });
    res.end();
  }
};

let addCourse = async (req, res) => {
  try {
    const validator_errors = validationResult(req);
    if (!validator_errors.isEmpty()) {
      res.status(404).json({
        status: HTTPStatus.Fail,
        data: validator_errors.array(),
      });
      res.end();
      return;
    }
    const newCourse = new Course(req.body);
    await newCourse.save();
    res.status(201).json({
      status: HTTPStatus.SUCCESS,
      data: { course: newCourse },
    });
    res.end();
  } catch (error) {
    res.status(400).json({
      status: HTTPStatus.ERROR,
      msg: error.message,
    });
    res.end();
  }
};

let updateCourse = async (req, res) => {
  try {
    let oldCourse = await Course.findByIdAndUpdate(
      { _id: req.params.courseId },
      { $set: { ...req.body } }
    );
    if (oldCourse) {
      let course = await Course.findById(req.params.courseId);
      res.status(201).json({
        status: HTTPStatus.SUCCESS,
        data: { course, course },
      });
      res.end();
      return;
    }
    res.status(404).json({
      status: HTTPStatus.Fail,
      data: null,
    });
    res.end();
  } catch (error) {
    res.status(400).json({
      status: HTTPStatus.ERROR,
      msg: error.message,
    });
    res.end();
  }
};

let deleteCourse = async (req, res) => {
  try {
    let deletionAck = await Course.deleteOne({ _id: req.params.courseId });
    if (deletionAck) {
      res.status(201).json({
        status: HTTPStatus.SUCCESS,
        data: { ack: deletionAck },
      });
      return;
    }
    res.status(404).json({
      status: HTTPStatus.Fail,
      data: null,
    });
    res.end();
  } catch (error) {
    res.status(400).json({
      status: HTTPStatus.ERROR,
      msg: error.message,
    });
    res.end();
  }
};

module.exports = {
  getAllCourses,
  getSpecificCourse,
  addCourse,
  updateCourse,
  deleteCourse,
};
