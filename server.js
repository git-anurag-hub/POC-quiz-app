const express = require("express");
const app = express();
const gradesRouter = require("./src/routes/grades");
const quizRouter = require("./src/routes/quiz");

require("./src/db/mongoose");

app.get("", (req, res) => {
  res.send("Hello");
});
app.use(express.json());
app.use(gradesRouter);
app.use(quizRouter);

const server = require("http").createServer(app);

server.listen(5000, () => {
  console.log(`Server running on port: 5000`);
});
