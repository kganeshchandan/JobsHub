const express = require("express");
const router = express.Router();
const Bcrypt = require("bcryptjs");
const User = require("../models/Users");
const Joi = require("joi");

router.get("/", async (req, res) => {
  User.find().then((items) => res.json(items));
});

/////////////validations//////////////
// const Schema = Joi.object({
//     jobtype: Joi.string().min(6).required(),
//     email: Joi.string().min(6).required().email(),
//     password: Joi.string().min(6).required(),
// });

router.post("/register", async (req, res) => {
  // if(error)
  // const validation = Schema.validate(req.body);
  // // res.send(validation);
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    const salt = await Bcrypt.genSalt(10);
    const hashPass = await Bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      jobtype: req.body.jobtype,
      email: req.body.email,
      password: hashPass,
    });
    console.log(newUser);
    try {
      const saved = await newUser.save();
      res.json("User succesfully added !");
    } catch (err) {
      res.json(err.message);
    }
  } else {
    return res.status(400).send("email already exists plis login");
  }
});
router.post("/login", async (req, res) => {
  const givenpassword = req.body.password;
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    res.status(400).send(" This email is not registered");
  } else {
    const validity = await Bcrypt.compare(givenpassword, user.password);
    if (!validity) {
      res.status(400).send("password is incorrect");
    } else {
      res.json(user);
    }
  }
});
module.exports = router;
