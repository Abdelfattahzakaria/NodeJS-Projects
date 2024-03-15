//                               Folder Organization:

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const HTTPStatus = require("./Utils/statusText");

const app = express();
const local_port = process.env.LOCAL_PORT;
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGOOSE_URL).then(() => {
  console.log("Successfully Connect To The DB");
});

const apiRoutesHander = require("./Routes/course");
const userRoutesHander = require("./Routes/user");

app.use("/api", apiRoutesHander);
app.use("/api/users", userRoutesHander);
app.all("*", (req, res, next) => {
  res.status(404).json({
    status: HTTPStatus.Fail,
    data: "Route Handeler Not Found",
  });
});

app.listen(process.env.LOCAL_PORT || 3000, () => {
  console.log("Server Running At LocalHost Port 3000");
});
