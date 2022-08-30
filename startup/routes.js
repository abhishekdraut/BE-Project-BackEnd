const express = require("express");
const institute = require("../routes/institute");
const department = require("../routes/department");
const classroom = require("../routes/classroom");
const resource = require("../routes/resource");
const users = require("../routes/users");
const auth = require("../routes/auth");
const discussion = require("../routes/discussion");
const error = require("../middleware/error");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/institute", institute);
  app.use("/api/department", department);
  app.use("/api/users", users);
  app.use("/api/classroom", classroom);
  app.use("/api/resource", resource);
  app.use("/api/auth", auth);
  app.use("/api/discussion", discussion);
  app.use(error);
};
