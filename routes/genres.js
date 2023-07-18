const express = require("express");
const router = express.Router(); // This is a mini express application
const Joi = require("joi");

// This is a mock database
const genres = [
  { id: 1, name: "Action" },
  { id: 2, name: "Horror" },
  { id: 3, name: "Romance" },
];

// This is a route handler
router.get("/", (req, res) => {
  res.send(genres);
});

router.post("/", (req, res) => {
  const { value, error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const genre = {
    id: genres.length + 1,
    name: req.body.name,
  };
  genres.push(genre);
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
