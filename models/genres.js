const Joi = require("joi");
const mongoose = require("mongoose");

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
});

const Genre = mongoose.model("Genre", genreSchema);

// function to validate genres added to the database
const validateGenre = (genre) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(), // name is required and must be at least 3 characters
  });
  return schema.validate(genre);
};

module.exports.Genre = Genre;
module.exports.validateG = validateGenre;
