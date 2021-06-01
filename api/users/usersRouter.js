const router = require("express").Router();
const User = require("./models/userSchema");
const bcryptjs = require("bcryptjs");
const makeToken = require("../middleware/makeToken");
const restricted = require("../middleware/restricted");

//Gets plants accessable to user. Requires user to be logged in.
router.get("/plants", (req, res) => {});

//Deletes a user and all plants associated with them. Requires user to be logged in.
router.delete("/", (req, res) => {});

//Registers a new user.
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

//Logs a user in.
router.post("/login", async (req, res) => {
  const user = await User.find({ username: req.body.username });
  const password = user[0].password;
  if (bcryptjs.compareSync(req.body.password, password)) {
    const verifiedUser = {
      id: user[0]["_id"],
      username: user[0].username,
    };
    const token = makeToken(verifiedUser);
    res
      .status(200)
      .json({ message: `Welcome ${verifiedUser.username}!`, Token: token });
  }
});

router.get("/testlogin", restricted, (req, res) => {
  res.send("Validation Working");
});

//Changes a users password. Requires a user to be logged in and pass password validation checks.
router.patch("/password", (req, res) => {});

module.exports = router;
