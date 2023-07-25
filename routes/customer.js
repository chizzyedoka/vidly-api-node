const express = require("express");
const router = express.Router(); // This is a mini express application

const Joi = require("joi");
const mongoose = require("mongoose");

const Customer = mongoose.model(
  "Customer",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 3,
    },
    isGold: {
      type: Boolean,
      default: false,
    },
    phone: {
      type: String,
      required: true,
      minlength: 5,
    },
  })
);

// endpoint to get all customers
router.get("/", async (req, res) => {
  const customer = await Customer.find().sort("name");
  res.send(customer);
});

// endpoint to get a customer by id
router.get("/:id", async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer)
    return res
      .status(404)
      .send("The customer with the given ID was not found.");
  res.send(customer);
});

// endpoint to add a customer
router.post("/", async (req, res) => {
  const { value, error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let customer = new Customer({
    name: req.body.name,
    isGold: req.body.isGold,
    phone: req.body.phone,
  });
  const result = await customer.save();
  res.send(customer);
});

// endpoint to update a customer
router.put("/:id", async (req, res) => {
  // validate the course
  const { value, error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const customer = await Customer.findByIdAndUpdate();
  if (!customer)
    return res
      .status(404)
      .send("The customer with the given ID was not found.");
  res.send(customer);
});

// endpoint to delete a customer
router.delete("/:id", async (req, res) => {
  const customer = await Customer.findByIdAndDelete(req.params.id);
  if (!customer)
    return res
      .status(404)
      .send("The customer with the given ID was not found.");
  res.send(customer);
});

function validateCourse(customer) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    isGold: Joi.boolean(),
    phone: Joi.string().min(5).required(),
  });

  return schema.validate(customer);
}

module.exports = router;
