const express = require("express");
const router = express.Router();

const { Movie, validate } = require("../models/movies");
const { Genre } = require("../models/genres");

// endpoint to get all movies
router.get("/", async (req, res) => {
  const movie = await Movie.find().sort("name");
  res.send();
});

// endpoint to get a movie by id
router.get("/:id", async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie)
    return res.status(404).send("The movie with the given ID was not found.");
  res.send(movie);
});

// endpoint to add a movie
router.post("/", async (req, res) => {
  const { value, error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // validate the genre
  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send("Invalid genre.");

  // create a new movie
  let movie = new Movie({
    title: req.body.title,
    genre: { _id: genre._id, name: genre.name }, // only store the genre id and name
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
  });
  movie = await movie.save();
  res.send(movie);
});

module.exports = router;
