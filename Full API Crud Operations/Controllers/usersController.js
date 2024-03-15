//                                users controllers:

const { validationResult } = require("express-validator");
const HTTPStatus = require("../Utils/statusText");
const User = require("../Modules/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { use } = require("../Routes/course");
const { json } = require("express");

const getAllUsers = async (req, res, next) => {
  try {
    const limit = req.query.limit || 5;
    const page = req.query.page || 1;
    const skip = (page - 1) * limit;
    const users = await User.find({}, { __v: false }).limit(limit).skip(skip);
    if (users) {
      res.status(201).json({
        status: HTTPStatus.SUCCESS,
        data: { users: users },
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

const register = async (req, res, next) => {
  try {
    const { fname, lname, email, password, role } = req.body;
    const oldUser = await User.findOne({ email: email });
    if (oldUser) {
      res.status(404).json({
        status: HTTPStatus.Fail,
        data: "User Already Exited Into The DB",
      });
      res.end();
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 5);
    const newUser = new User({
      fname: fname,
      lname: lname,
      email: email,
      password: hashedPassword,
      role: role,
    });
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email, role: newUser.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "3m" }
    );
    newUser.token = token;
    await newUser.save();
    res.status(201).json({
      status: HTTPStatus.SUCCESS,
      data: { user: newUser },
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

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const currentUser = await User.findOne({ email: email });
    if (currentUser) {
      const passwordVerification = bcrypt.compare(
        password,
        currentUser.password
      );
      if (passwordVerification) {
        const token = jwt.sign(
          {
            id: currentUser._id,
            email: currentUser.email,
            role: currentUser.role,
          },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "5m" }
        );
        res.status(201).json({
          status: HTTPStatus.SUCCESS,
          data: { token: token },
        });
        res.end();
        return;
      }
      res.status(404).json({
        status: HTTPStatus.Fail,
        data: "Invalid Passing Password",
      });
      res.end();
      return;
    }
    res.status(404).json({
      status: HTTPStatus.Fail,
      data: "User Does Not Exist Into The DB",
    });
  } catch (error) {
    res.status(400).json({
      status: HTTPStatus.ERROR,
      msg: error.message,
    });
    res.end();
  }
};

module.exports = { getAllUsers, register, login };
