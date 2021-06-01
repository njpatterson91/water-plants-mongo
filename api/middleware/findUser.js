const User = require("../users/models/userSchema");

async function getUser(req, res, next) {
  let user;
  try {
    user = await User.find({ username: req.body.username });
    if (subscriber == null) {
      res.status(404).json({ message: "Cannot find subscriber" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
  res.user = user;
  next();
}

module.exports = getUser;
