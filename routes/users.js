const auth = require("../middleware/auth");
const config = require("config");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const { User, validate } = require("../models/users");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

// get current user
router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

// route to register(create) new users
router.post("/", async (req, res) => {
  // validate user
  const { error } = validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);
  // check if user is in data base
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).send("User already exists");
  }
  // we have a new user
  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  //user = new User(_.pick(req.body, ["name", "email"])); Alternative
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  user = await user.save();

  // create web token
  const token = user.generateAuthToken();

  // set header(headerName,value)
  res.header("x-auth-token", token);
  res.status(200).json(_.pick(user, ["name", "email", "_id"])); // doesn't send password to user
});

module.exports = router;
