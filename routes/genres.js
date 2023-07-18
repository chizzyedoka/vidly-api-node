const express = require("express");
const router = express.Router(); // This is a mini express application

const Joi = require("joi");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://0.0.0.0:27017/vidyl-api-node", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
});

const Genre = mongoose.model("Genre", genreSchema);

// This is a mock database
// const genres = [
//   { id: 1, name: "Action" },
//   { id: 2, name: "Horror" },
//   { id: 3, name: "Romance" },
// ];

// This is a route handler
router.get("/", async (req, res) => {
  const genres = await Genre.find().sort("name");
  res.send(genres);
});

router.post("/", async (req, res) => {
  const { value, error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let genre = new Genre({ name: req.body.name });
  const result = await genre.save();
  res.send(result);
});

// function to validate courses added to the database
const validateCourse = (course) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(), // name is required and must be at least 3 characters
  });
  return schema.validate(course);
};

module.exports = router;
