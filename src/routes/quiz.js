const Quiz = require("../models/quiz");
const express = require("express");
const router = new express.Router();

router.post("/api/quiz", async (req, res) => {
  try {
    const question = new Quiz(req.body);
    question.save();
    res.send(question);
  } catch (e) {
    console.log(e);
    res.status(403).send(e);
  }
});

router.get("/api/quiz", async (req, res) => {
  try {
    const questions = await Quiz.aggregate([{ $sample: { size: 10 } }]);
    questions.forEach((v) => delete v.answer);
    res.send(questions);
  } catch (e) {
    res.status(403).send(e);
  }
});

module.exports = router;
