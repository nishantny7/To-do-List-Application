const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  registerValidation,
  loginValidation,
} = require("../controllers/validation");

router.post("/register", async (req, res) => {
  //Validation of credentials before user creation
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Check if the user already is the databse
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email already exists");

  //Hash password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  //Create a new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
  });

  try {
    savedUser = await user.save();
    res.send("Registration successful, Please login.");
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/login", async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Check if user is registered
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email is wrong");

  //Check if password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Invalid password");

  //Create and send token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, {
    expiresIn: "1800s",
  });

  //Sending authToken using cookie
  res.cookie("authToken", token, { httpOnly: true });
  res.send({
    currentUser: {
      _id: user._id,
      name: user.name,
      createdAt: user.createdAt,
    },
  });

  //console.log(token);
  //res.header("auth-token", token).send({ currentUser: user });
});

module.exports = router;
