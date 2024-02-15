const mongoose = require("mongoose");

const noteSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  userID: {
    type: String,
    required: true
  },
});

const NoteModel = mongoose.model("note", noteSchema);

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
});

const UserModel = mongoose.model("user", userSchema);

module.exports = {
  UserModel,
  NoteModel
};
