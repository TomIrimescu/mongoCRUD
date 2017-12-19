const mongoose = require("mongoose");
const PostSchema = require("./post_schema");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    validate: {
      validator: name => name.length > 2,
      message: "Name must be longer than 2 characters"
    },
    required: [true, "Name is required."]
  },
  postCount: Number,
  posts: [PostSchema] // nested sub-document
});

const User = mongoose.model("user", UserSchema); // User class or User model

module.exports = User;
