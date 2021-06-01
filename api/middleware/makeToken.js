const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT || "OOGGGGIIIEEEE";

module.exports = function makeToken(user) {
  const payload = {
    id: user.id,
    username: user.username,
  };
  const options = {
    expiresIn: "900000s",
  };
  return jwt.sign(payload, jwtSecret, options);
};
