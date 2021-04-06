const User = require("../models/user");
const Quiz = require("../models/quiz");
const express = require("express");
const router = new express.Router();

router.post("/api/grades", async (req, res) => {
  try {
    const userEmail = await User.findOne({ email: req.body.email });
    if (userEmail) {
      res.status(400).send({ error: "Email already in use!" });
    } else {
      const answers = req.body.answers;
      var grades = 0;
      for (let index = 0; index < answers.length; index++) {
        const element = answers[index];
        const correctAns = await Quiz.findById(element.question);
        if (correctAns.answer === element.answer) {
          grades++;
        }
      }
      const user = new User({ email: req.body.email, name: req.body.name, grades });
      await user.save();
      res.status(201).send({ user });
    }
  } catch (e) {
    console.log(e);
    res.status(403).send(e);
  }
});

router.get("/api/grades", async (req, res) => {
  try {
    const users = await User.find().lean();
    users.sort((a, b) => (a.grades > b.grades ? -1 : b.grades > a.grades ? 1 : 0));
    res.send(users);
  } catch (e) {
    res.status(403).send(e);
  }
});

module.exports = router;
