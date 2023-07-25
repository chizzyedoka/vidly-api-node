const express = require("express");
const router = express.Router(); // This is a mini express application

const Joi = require("joi");
const mongoose = require("mongoose");

// mongoose
//   .connect("mongodb://0.0.0.0:27017/vidyl-api-node", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("Connected to MongoDB..."))
//   .catch((err) => console.error("Could not connect to MongoDB...", err));

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

// endpoint to get all genres
router.get("/", async (req, res) => {
  const genres = await Genre.find().sort("name");
  res.send(genres);
});

// endpoint to add a genre
router.post("/", async (req, res) => {
  const { value, error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let genre = new Genre({ name: req.body.name });
  const result = await genre.save();
  res.send(genre);
});

// endpoint to update a genre
router.put("/:id", async (req, res) => {
  // validate the course
  const { value, error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");
  res.send(genre);
});

// endpoint to delete a genre
router.delete("/:id", async (req, res) => {
  const genre = await Genre.findByIdAndDelete(req.params.id);
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");
  res.send(genre);
});

// endpoint to get a genre by id
router.get("/:id", async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");
  res.send(genre);
});

// function to validate courses added to the database
const validateCourse = (course) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(), // name is required and must be at least 3 characters
  });
  return schema.validate(course);
};

module.exports = router;
