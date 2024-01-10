// controllers/index.js

import User from "../models/index.js";

export const authentication = (req, res, next) => {
  const { username, password } = req.body; // Corrected typo in variable name

  // Search for users with a specific condition
  User.find({ username, password }, (err, users) => {
    if (err) {
      console.error(err);
      next();
    } else {
      console.log(users);
      console.log("User exists");
      next();
    }
  });
};

export const createUser = async (req, res) => {
  const user = { email: req.body.email, pass: req.body.password };
  console.log(user);
  try {
    const newUser = new User(user);
    await newUser.save();
    console.log("OK");
    res.status(201).redirect("/login");
  } catch (error) {
    res.status(409).json(error);
  }
};

export const login = async (req, res) => {
  const data = { mail: req.body.email, pass: req.body.password };
  console.log(data);
  try {
    const user = await User.findOne(data);
    if (user) {
      console.log("User Successfully logged in");
    } else {
      res.redirect("/user/register");
      console.log("Incorrect Credentials");
    }
  } catch (error) {
    res.status(409).json(error);
  }
};
