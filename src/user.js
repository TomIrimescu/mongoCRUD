const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  postCount: Number
});

const User = mongoose.model("user", UserSchema); // User class or User model

module.exports = User;
