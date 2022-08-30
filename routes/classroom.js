const { Classroom, validate } = require("../models/class-model");
const { Assignments, Submission } = require("../models/assignments");
const express = require("express");
const auth = require("../middleware/auth");
const { User } = require("../models/user-model");
const router = new express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const { UploadFile, getFile } = require("../startup/cloud");

router.get("/", async (req, res) => {
  const classroom = await Classroom.find();
  res.send(classroom);
});

router.get("/:user_id", async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const filterClassroom = await Classroom.find({ students: user_id });
    if (filterClassroom.length == 0) {
      res.send({
        results: [],
        msg: "You are not enrolled in any classroom yet.",
      });
    } else {
      res.send({ results: filterClassroom, msg: "ok" });
    }
  } catch (err) {
    res.send(err);
  }
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let classroom = new Classroom({
    classname: req.body.classname,
    section: req.body.section,
    subject: req.body.subject,
    author: req.body.author,
    code: req.body.code,
    imgUrl: req.body.imgUrl,
  });

  classroom = await classroom.save();
  res.send(classroom);
});

router.get("/created/:user", async (req, res) => {
  const user = req.params.user;
  const classesCreated = await Classroom.find({ "author._id": user });
  if (!classesCreated) res.status(400).send("Something went wrong");
  res.send(classesCreated);
});

router.get("/studied/:user", async (req, res) => {
  const user = req.params.user;
  const classesEnrolled = await Classroom.find({ students: { $in: [user] } });
  if (!classesEnrolled) res.status(400).send("Something went wrong");
  res.send(classesEnrolled);
});

router.get("/taught/:user", async (req, res) => {
  const user = req.params.user;
  const classesTaught = await Classroom.find({ teachers: { $in: [user] } });
  if (!classesTaught) res.status(400).send("Something went wrong");
  res.send(classesTaught);
});

router.post("/students/register", async (req, res) => {
  const { student, code } = req.body;

  let classroom = await Classroom.findOne({ code });
  if (!classroom) return res.status(400).send("Enter valid class code");

  if (
    classroom.author._id.toString() === student ||
    classroom.teachers.includes(student)
  )
    return res.status(400).send("The user already has enrolled in this class.");

  classroom.students.push(student);
  classroom = await classroom.save();
  res.send(classroom);
});

router.post("/student/add", async (req, res) => {
  const { classId, email } = req.body;

  let user = await User.findOne({ email });
  let classroom = await Classroom.findOne({ _id: classId });
  if (!user) return res.status(400).send("User not found");

  if (classroom.students.includes(user._id))
    return res
      .status(400)
      .send("The student already has enrolled in this class.");

  classroom.students.push(user._id);
  classroom = await classroom.save();
  res.send(classroom);
});

router.post("/teacher/add", async (req, res) => {
  const { classId, email } = req.body;

  let user = await User.findOne({ email });
  let classroom = await Classroom.findOne({ _id: classId });
  if (!user) return res.status(400).send("User not found");

  if (classroom.teachers.includes(user._id))
    return res
      .status(400)
      .send("The teacher already has joined in this class.");

  classroom.teachers.push(user._id);
  classroom = await classroom.save();
  res.send(classroom);
});

router.get("/assignment/:classroom_id", async function (req, res) {
  try {
    const id = req.params.classroom_id;
    const results = await Assignments.find({ classroom_id: id });
    if (results.length == 0) {
      res.status(400).send("No Assignment is given in the class");
    } else {
      res.send(results);
    }
  } catch (error) {
    res.send(error);
  }
});

router.post(
  "/createAssignment/:classroom_id",
  upload.single("assignment_file"),
  async function (req, res) {
    try {
      if (req.file) {
        const aws_result = await UploadFile(req.file);
        if (aws_result.Location && aws_result.ETag) {
          const body = req.body;
          const id = req.params.classroom_id;
          const final_obj = {
            user_id: body.user_id,
            username: body.username,
            classroom_id: id,
            title: body.title,
            description: body.description,
            due_date: body.due_date,
            file: aws_result,
            points: body.points,
          };
          try {
            const result = await Assignments.create(final_obj);
            res.status(200).send("Data Submitted to DB");
          } catch (error) {
            res.status(400).send(error);
          }
        } else {
          res.status(400).send("File has not been sent");
        }
      } else {
        res.send("You have not submitted File");
      }
    } catch (error) {
      res.send(error);
    }
  }
);

router.get("/submissions/:assignment_id", async function (req, res) {
  try {
    const id = req.params.assignment_id;
    // const classroom_id=req.params.classroom_id;
    const results = await Submission.find({ assignment_id: id });
    if (results.length == 0) {
      res.status(400).send("No One Submitted assignments Yet");
    } else {
      res.send(results);
    }
  } catch (error) {
    res.send(error);
  }
});
router.post(
  "/submitSubmission/:assignment_id",
  upload.single("submission_file"),
  async function (req, res) {
    try {
      console.log(req.file);
      if (req.file) {
        const aws_result = await UploadFile(req.file);
        if (aws_result.Location && aws_result.ETag) {
          const body = req.body;
          const id = req.params.assignment_id;

          const final_obj = {
            user_id: body.user_id,
            username: body.username,
            assignment_id: id,
            title: body.title,
            classroom_id: body.classroom_id,
            date: body.date,
            // late_submitted: Boolean(parseInt(body.late_submitted)),
            file: aws_result,
          };

          try {
            const result = await Submission.create(final_obj);
            console.log(result);
            res.status(200).send("Submission submitted successfully");
          } catch (error) {
            res.status(400).send(error);
          }
        } else {
          res.status(400).send("File has not been sent");
        }
      } else {
        res.status(400).send("Having Problem uploading the file.");
      }
    } catch (error) {
      res.send(error);
    }
  }
);

router.get("/getFile/:key", async function (req, res) {
  const key = req.params.key;
  const results = await getFile(key);
  results.pipe(res);
});
router.get("/getResultSubmission/:user_id/:assignment_id", async function(req, res) {
    try {
      const user_id=req.params.user_id;
      const assignment_id = req.params.assignment_id;
      console.log(user_id, assignment_id);
      const results=await Submission.find({user_id:user_id,assignment_id:assignment_id});
      
      if (results.length > 0) {
        res.status(200).send(results)
      }
      else{
        re.status(404).send("You Have not submitted submission for this assignment")
      }
    

    } catch (error) {
      res.send(error)
    }
    


})

module.exports = router;
