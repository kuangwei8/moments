const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const profileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  website: {
    type: String,
    required: true
  },
  bio: {
    type: String
  },
  phoneNumber: {
    type: Number
  },
  gender: {
    type: String,
    required: true
  }
});
module.exports = profile = mongoose.module("profile", profileSchema);
