const Joi = require("joi");
const mongoose = require("mongoose");

const scheduleSchema = mongoose.Schema({
  subject: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50,
  },
  start_time: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50,
  },
  day: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50,
  },
  class_link: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50,
  },
  teacher: { type: String, required: true, minlength: 1, maxlength: 50 },
});

const Department = mongoose.model(
  "Department",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 50,
    },
    class: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 50,
    },
    schedule: {
      type: [scheduleSchema],
      required: false,
    },
    headOfDepartment: {
      type: String,
      required: false,
      minlength: 1,
      maxlength: 50,
    },
    faculty: {
      type: Array,
      required: false,
    },
    timeStamp: { type: Date, default: Date.now },
  })
);

function validateDepartment(institute) {
  const schema = Joi.object({
    name: Joi.string().min(1).max(50).required(),
    class: Joi.string().min(1).max(50).required(),
    schedule: Joi.array(),
  });

  return schema.validate(institute);
}

function validateSchedule(institute) {
  const schema = Joi.object({
    classname: Joi.string().min(1).max(50).required(),
    subject: Joi.string().min(1).max(50).required(),
    start_time: Joi.string().min(1).max(50).required(),
    day: Joi.string().min(1).max(50).required(),
    class_link: Joi.string().min(1).max(50).required(),
    teacher: Joi.string().min(1).max(50).required(),
  });

  return schema.validate(institute);
}

exports.Department = Department;
exports.validate = validateDepartment;
exports.validateSchedule = validateSchedule;
