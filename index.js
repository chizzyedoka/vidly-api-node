const genres = require("./routes/genres");
// import genres from "./routes/genres";
const express = require("express");
// const Joi = require("joi");

const app = express();
const port = 3000;

app.use(express.json());
app.use("/api/genres", genres);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
