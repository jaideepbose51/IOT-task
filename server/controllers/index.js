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

//Strong password ckecker
function isStrongPassword(password) {
  // Minimum length requirement
  const minLength = 8;

  // Check for minimum length
  if (password.length < minLength) {
    return false;
  }

  // Check for at least one uppercase letter
  if (!/[A-Z]/.test(password)) {
    return false;
  }

  // Check for at least one lowercase letter
  if (!/[a-z]/.test(password)) {
    return false;
  }

  // Check for at least one digit
  if (!/\d/.test(password)) {
    return false;
  }

  // Check for at least one special character
  if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password)) {
    return false;
  }

  // If all checks pass, the password is strong
  return true;
}

//email check
function emailCheck(email) {
// Check for @
  if (!/[@]/.test(email)) {
    return false;
  }

  // If all checks pass ie the email contains @ symbol
  return true;
}

export const createUser = async (req, res) => {
  if (isStrongPassword(req.body.password)&&emailCheck(req.body.email)) {
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
  } else {
    console.log(
      "Select strong passward. The password should contain atleast one uppercase , one lowercase , one digit , one special character and minimum length should be 8"
    );
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
      res.redirect("/singup");
      console.log("Incorrect Credentials");
    }
  } catch (error) {
    res.status(409).json(error);
  }
};
