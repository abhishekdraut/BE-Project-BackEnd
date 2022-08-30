const Joi = require("joi");
const mongoose = require("mongoose");

const Classroom = mongoose.model(
  "Classroom",
  new mongoose.Schema({
    classname: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 50,
    },
    section: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 50,
    },
    subject: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 50,
    },
    archived: {
      type: Boolean,
      default: false,
    },
    teachers: {
      type: Array,
      required: false,
    },
    students: {
      type: Array,
      required: false,
    },
    author: {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
      name: { type: String, required: true, minlength: 1, maxlength: 50 },
    },
    code: {
      type: String,
      required: true,
      unique: true,
    },
    imgUrl: {
      type: String,
      required: true,
    },
    timeStamp: { type: Date, default: Date.now },
  })
);

function validateClassroom(classroom) {
  const schema = Joi.object({
    classname: Joi.string().min(1).max(50).required(),
    section: Joi.string().min(1).max(50).required(),
    subject: Joi.string().min(1).max(50).required(),
    author: Joi.object().required(),
    code: Joi.string().required(),
    imgUrl: Joi.string().required(),
  });

  return schema.validate(classroom);
}

exports.Classroom = Classroom;
exports.validate = validateClassroom;
