const Joi = require("joi");
const mongoose = require("mongoose");

const Institute = mongoose.model(
  "Institute",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 50,
    },
    address: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 50,
    },
    departments: {
      type: Array,
      required: true,
    },
    grade: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 50,
    },
    principal: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 50,
    },
    instImgUrl: {
      type: String,
      required: false,
    },
    timeStamp: { type: Date, default: Date.now },
  })
);

function validateInstitute(institute) {
  const schema = Joi.object({
    name: Joi.string().min(1).max(50).required(),
    address: Joi.string().min(1).max(50).required(),
    departments: Joi.array().required(),
    grade: Joi.string().min(1).max(50).required(),
    principal: Joi.string().min(1).max(50).required(),
    instImgUrl: Joi.string().min(1).max(50).required(),
  });

  return schema.validate(institute);
}

exports.Institute = Institute;
exports.validate = validateInstitute;
