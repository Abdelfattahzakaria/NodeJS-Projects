//                               users middleware:

const jwt = require("jsonwebtoken");
const HTTPStatus = require("../Utils/statusText");

const tokenVerfication = (req, res, next) => {
  try {
    const authenticationToken =
      req.headers["Authorization"] || req.headers["authorization"];
    const token = authenticationToken.split(" ")[1];
    const currentUser = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.currentUser = currentUser;
    next();
  } catch (error) {
    res.status(400).json({
      status: HTTPStatus.ERROR,
      msg: error.message,
    });
    res.end();
  }
};

module.exports = { tokenVerfication };
