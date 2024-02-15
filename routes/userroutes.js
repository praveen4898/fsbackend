const express = require("express");
const { UserModel } = require("../model/usermodel");
const bcyrpt = require("bcrypt");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");


userRouter.post("/register", (req, res) => {
  const { username, email, password } = req.body;
  try {
    bcyrpt.hash(password, 5, async (err, hash) => {
      if (hash) {
        const user = new UserModel({ username, email, password: hash });
        await user.save();
        res.send({ msg: "new user has been registered successfully" });
      } else {
        res.send({ msg: "error occured" });
      }
    });
  } catch (error) {
    res.send({ msg: "error occured" });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    bcyrpt.compare(password, user.password, (err, result) => {
      if (result) {
        const token = jwt.sign({userID:user._id,author:user.username}, "masai");
        res.send({ msg: "user logged in successfully", token });
      } else {
        res.send({ msg: "invalid user" });
      }
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = {
  userRouter,
};
