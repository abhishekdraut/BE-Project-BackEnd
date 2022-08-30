const express = require("express");
const {
  Department,
  validate,
  validateSchedule,
} = require("../models/department-model");
const router = new express.Router();

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let department = new Department({
    name: req.body.name,
    class: req.body.class,
    schedule: req.body.schedule,
  });

  department = await department.save();
  res.send(department);
});

router.post("/schedule", async (req, res) => {
  const { error } = validateSchedule(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let department = await Department.findOne({
    class: `${req.body.classname}`,
  });
  if (department) {
    delete req.body.classname;
    department.schedule.push(req.body);
    department = await department.save();
    res.send(department);
  } else {
    res.status(404).send("Department not found.");
  }
});

router.get("/schedule/:day", async (req, res) => {
  const department = await Department.find({ class: "BE" });

  const todaysSchedule = department[0].schedule.filter(
    (schedule) => schedule.day === req.params.day
  );
  res.send(todaysSchedule);
});

module.exports = router;
