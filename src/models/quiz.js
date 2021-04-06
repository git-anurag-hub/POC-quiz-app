const mongoose = require("mongoose");

const QuizSchema = new mongoose.Schema(
  {
    category: {
      trim: true,
      type: String,
    },
    question: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    options: [
      {
        type: String,
        required: true,
      },
    ],
    answer: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Quiz = mongoose.model("Quiz", QuizSchema);

module.exports = Quiz;
