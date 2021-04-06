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

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

const server = require("http").createServer(app);

server.listen(process.env.PORT, () => {
  console.log(`Server running on port: ${process.env.PORT}`);
});
