const express = require("express");
const router = express.Router();
const discussion = require("../models/discussion");
const { question, answer } = discussion;

router.get("/questions", async function (req, res) {
  const page_number = parseInt(req.query.page);
  const page_items = 5;
  var questions = [];
  try {
    if (page_number > 0) {
      const results = await question
        .find()
        .skip(page_items * (page_number - 1))
        .limit(page_items);
      questions = results;
      res.send(questions);
    } else {
      const results = await question.find();
      res.send(results);
    }
  } catch (err) {
    res.status(400).send(err);
  }
});
//To get questions classroom wise
router.get("/questions/:classroom_id", async (req, res) => {
  const classrom_id = req.params.classroom_id;
  question.find({ classroom_id: classrom_id }, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      if (results.length >= 1) {
        res.send(results);
      } else {
        res.status(404).send("Not found");
      }
    }
  });
});
//For getting question and answer related to it, also included pegignation.
router.get("/retrieve_question/:qid", async function (req, res) {
  const qid = req.params.qid;
  const query_data = req.query;

  const page_number = parseInt(query_data.page);
  const page_items = 3;

  try {
    const question_data = await question.find({ _id: qid });
    var answer_data_related_to_this_question = [];

    if (question_data) {
      if (page_number > 0) {
        var data = await answer
          .find({ question_id: qid })
          .skip(page_items * (page_number - 1))
          .limit(page_items);
        answer_data_related_to_this_question = data;
      } else {
        var data = await answer.find({ question_id: qid });
        answer_data_related_to_this_question = data;
      }

      const question_and_answers = {
        question: question_data[0],
        answers: answer_data_related_to_this_question,
      };
      res.send(question_and_answers);
    } else {
      res.status(500).send("question not found");
    }
  } catch (error) {
    res.status(400).send("Wrong qid");
  }
});
// Json Format for adding question.
// {
//     "question":"Define Factory function",
//     "user":{
//         "username":"Abhsihek",
//     },
//     "user_id":"623b556dd3999356d1dcd3f6",
//     "classroom_id":"123456787654321",
//     "tags":["Js","ES6"]
//     }
router.post("/questions", function (req, res) {
  const data = req.body;

  question.create(data, function (err, data) {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      console.log(data);
      res.send("Question Submitted");
    }
  });
});

// Json Formate for adding ans
// {
//     "answer":"answer 1 ",
//     "user":{
//         "name":"Kishor"
//     },
//     "question_id":"12345672345",
//     "user_id":"24356123456"
// }
router.get("/answer/:qid", async function (req, res) {
  const id = req.params.qid;
  console.log(id);

  if (id) {
    try {
      const results = await answer.find({ question_id: id });

      res.send(results);
    } catch (err) {
      res.send(err);
    }
  }
});

router.post("/answer/:qid", async function (req, res) {
  const id = req.params.qid;
  if (id) {
    try {
      const results = await answer.create(req.body);
      if (results) {
        console.log(results);
        res.status(200).send("Answer submitted");
      }
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  } else {
    res.send("Did't pass the id of question");
  }
});

module.exports = router;
