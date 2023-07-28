const _ = require("lodash");
const { User, validate } = require("../models/users");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  // validate user
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //  checks if user already exists
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered");

  // if we have a new user, create and add to DB
  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  await user.save();
  res.send(_.pick(user, ["_id", "name", "email"]));
});
module.exports = router;
