const router = require("express").Router();
const User = require("./models/userSchema");
const bcryptjs = require("bcryptjs");

//Gets plants accessable to user. Requires user to be logged in.
router.get("/plants", (req, res) => {});

//Deletes a user and all plants associated with them. Requires user to be logged in.
router.delete("/", (req, res) => {});

//Registers a new user.
router.post("/register", async (req, res) => {
  const credentials = req.body;

  const hash = bcryptjs.hashSync(credentials.password, 10);
  credentials.password = hash;

  const user = new User({
    username: req.body.username,
    password: req.body.password,
    telephone: req.body.telephone,
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Logs a user in.
router.post("/login", (req, res) => {});

//Changes a users password. Requires a user to be logged in and pass password validation checks.
router.patch("/password", (req, res) => {});

module.exports = router;
