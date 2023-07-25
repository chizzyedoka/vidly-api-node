const mongoose = require("mongoose");
const genres = require("./routes/genres");
const customers = require("./routes/customer");

const express = require("express");

const app = express();
const port = 3000;

mongoose
  .connect("mongodb://0.0.0.0:27017/vidyl-api-node", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

app.use(express.json());
app.use("/api/genres", genres);
app.use("/api/customers", customers);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
