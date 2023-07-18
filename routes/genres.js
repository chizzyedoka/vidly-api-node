const express = require("express");
//import { Router } from "express";
const router = express.Router(); // This is a mini express application

const genres = ["Action", "Comedy", "Drama"];

router.get("/", (req, res) => {
  res.send(genres);
});

module.exports = router;
