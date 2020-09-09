const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  nom: {
    type: String,
    trim: true,
  },

  sex: {
    type: String,
    trim: true,
  },

  password: {
    type: String,
    trim: true,
  },
  numero: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
  },
  prenon: {
    type: String,
    trim: true,
  },
  postNom: {
    type: String,
    trim: true,
  },
});

const user = mongoose.model("user", userSchema);

module.exports = { user };
