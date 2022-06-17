const router = require("express").Router();
const User = require("../models/User");
import bcrypt from "bcrypt";

//REGISTER
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const salt = await bcrypt.genSaltSync();
    if (password.length < 8) {
      res.status(400).json({
        response: "Password must be at least 8 characters long",
        success: false,
      });
    } else {
      const newUser = await new User({
        username: username,
        email: email,
        password: bcrypt.hashSync(password, salt),
      }).save();
      res.status(201).json({
        response: {
          username: newUser.username,
          email: newUser.email,
          accessToken: newUser.accessToken,
        },
        success: true,
      });
    }
  } catch (error) {
    res.status(400).json({
      response: error,
      success: false,
    });
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(200).json(user);
    } else {
      res.status(400).json({
        response: "username and password don't match",
        success: false,
      });
    }
  } catch (error) {
    res.status(400).json({
      response: error,
      success: false,
    });
  }
});

module.exports = router;
