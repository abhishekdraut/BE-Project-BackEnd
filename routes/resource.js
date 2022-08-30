const express = require("express");
const { validate, Resource } = require("../models/resource-model");
const router = express.Router();

router.post("/create", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let resource = new Resource({
    title: req.body.title,
    imgUrl: req.body.imgUrl,
    description: req.body.description,
    link: req.body.link,
    author: req.body.author,
  });

  resource = resource.save();
  res.send(resource);
});

router.get("/", async (req, res) => {
  const resources = await Resource.find();
  res.send(resources);
});

module.exports = router;
