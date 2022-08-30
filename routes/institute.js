const express = require("express");
const { Institute, validate } = require("../models/institute-model");
const router = new express.Router();

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let institute = new Institute({
    name: req.body.name,
    address: req.body.address,
    departments: req.body.departments,
    grade: req.body.grade,
    principal: req.body.principal,
    instImgUrl: req.body.instImgUrl,
  });

  institute = await institute.save();
  res.send(institute);
});

module.exports = router;
