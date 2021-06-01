const router = require("express").Router();
const User = require("./models/userSchema");
const bcryptjs = require("bcryptjs");
const makeToken = require("../middleware/makeToken");
const restricted = require("../middleware/restricted");

//Gets plants accessable to user. Requires user to be logged in.
router.get("/plants/", restricted, async (req, res) => {
  const id = req.decodedToken.id;
  try {
    const user = await User.findById(id);
    res.status(200).send(user.ownedPlants);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Deletes a user and all plants associated with them. Requires user to be logged in.
router.delete("/", restricted, async (req, res) => {
  const id = req.decodedToken.id;
  try {
    await User.findById(id).deleteOne();
    res.status(200).json({ message: "User removed." });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Registers a new user. requires username, password, telephone number, email.
router.post("/register", async (req, res) => {
  const credentials = req.body;
  //hashes the password for safe storage
  const hash = bcryptjs.hashSync(credentials.password, 10);
  credentials.password = hash;
  // creates a user object based off the body of the request and the schema to be used to insert into the database
  const user = new User({
    username: req.body.username,
    password: req.body.password,
    telephone: req.body.telephone,
    email: req.body.email,
    ownedPlants: [],
  });

  try {
    //looks for users with that username
    const isUser = await User.find({ username: req.body.username });
    //if there is no users it allows creation
    if (isUser.length == 0) {
      try {
        const newUser = await user.save();
        res.status(201).json(newUser);
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
      //if there is a user it sends an error
    } else {
      res.send("Username must be unique");
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Logs a user in. Requires username, password.
router.post("/login", async (req, res) => {
  const user = await User.find({ username: req.body.username });
  const password = user[0].password;
  //validates the user has entered the correct password
  if (bcryptjs.compareSync(req.body.password, password)) {
    const verifiedUser = {
      id: user[0]["_id"],
      username: user[0].username,
    };
    const token = makeToken(verifiedUser);
    res.status(200).json({
      message: `Welcome ${verifiedUser.username}!`,
      Token: token,
      id: user[0]["_id"],
    });
  } else {
    res.status(400).json({ message: "Incorrect Credentials" });
  }
});

//Test endpoint to make sure token is being passed correctly
router.get("/testlogin", restricted, (req, res) => {
  res.send("Validation Working");
});

//Changes a users password. Requires a user to be logged in and pass password validation checks.
router.patch("/password", restricted, (req, res) => {});

module.exports = router;
