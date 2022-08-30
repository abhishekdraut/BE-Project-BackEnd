const Joi = require("joi");
const mongoose = require("mongoose");

const Resource = mongoose.model(
  "Resource",
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 50,
    },
    imgUrl: {
      type: String,
      required: false,
      minlength: 1,
      maxlength: 150,
    },
    description: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 250,
    },
    link: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 50,
    },
    author: {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
      name: { type: String, required: true, minlength: 1, maxlength: 50 },
    },
    timeStamp: { type: Date, default: Date.now },
  })
);

function validateResource(resource) {
  const schema = Joi.object({
    title: Joi.string().min(1).max(50).required(),
    imgUrl: Joi.string().min(1).max(150),
    description: Joi.string().min(1).max(250).required(),
    link: Joi.string().min(1).max(50).required(),
    author: Joi.object(),
  });

  return schema.validate(resource);
}

exports.Resource = Resource;
exports.validate = validateResource;
