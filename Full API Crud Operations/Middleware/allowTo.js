//                                   roles middleware:

const HTTPStatus = require("../Utils/statusText");
const checkRole = (...roles) => {
  return (req, res, next) => {
    const currentUserRole = req.currentUser.role;
    if (!roles.includes(currentUserRole)) {
      res.status(404).json({
        status: HTTPStatus.Fail,
        data: "Invalid User Role",
      });
      res.end();
      return;
    }
    next();
  };
};

module.exports = checkRole;
