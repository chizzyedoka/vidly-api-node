const { Rental, validate } = require("../models/rentals");
const { Movie } = require("../models/movies");
const { Customer } = require("../models/customer");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

// endpoint to get all rentals
router.get("/", async (req, res) => {
  const rentals = await Rental.find().sort("-dateOut");
  res.send(rentals);
});

// endpoint to add a rental
router.post("/", async (req, res) => {
  // validate the rental
  const { error } = validate(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  // validate the customer
  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send("Invalid customer.");

  // validate the movie
  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(400).send("Invalid movie.");

  if (movie.numberInStock === 0)
    return res.status(400).send("Movie not in stock.");

  // create a new rental
  let rental = new Rental({
    customer: {
      _id: customer._id, // only store the customer id
      name: customer.name,
      phone: customer.phone,
    },
    movie: {
      _id: movie._id, // only store the movie id
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate,
    },
  });
  rental = await rental.save();

  movie.numberInStock--;
  movie.save();

  console.log(rental);
  res.send(rental);
});

module.exports = router;
