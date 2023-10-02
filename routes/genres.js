const express = require("express");
const router = express.Router(); // This is a mini express application
const { Genre, validateG } = require("../models/genres");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

// endpoint to get all genres
router.get("/", async (req, res, next) => {
  try {
    const genres = await Genre.find().sort("name");
    res.send(genres);
  } catch (ex) {
    next(ex);
  }
});

// endpoint to add a genre
router.post("/", auth, admin, async (req, res) => {
  const { value, error } = validateG(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let genre = new Genre({ name: req.body.name });
  const result = await genre.save();
  res.send(genre);
});

// endpoint to update a genre
router.put("/:id", auth, admin, async (req, res) => {
  // validate the course
  const { value, error } = validateG(req.body);
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
router.delete("/:id", auth, admin, async (req, res) => {
  const genre = await Genre.findByIdAndDelete(req.params.id);
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");
  console.log(req.user);
  res.send(genre);
});

// endpoint to get a genre by id
router.get("/:id", async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");
  res.send(genre);
});

module.exports = router;
