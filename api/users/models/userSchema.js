const mongoose = require("mongoose");

const plantSchema = new mongoose.Schema({
  nickname: {
    type: String,
    required: true,
  },
  species: {
    type: String,
    required: true,
  },
  h2oFrequency: {
    type: String,
    required: true,
  },
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  telephone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  ownedPlants: [plantSchema],
});

module.exports = mongoose.model("users", userSchema);
