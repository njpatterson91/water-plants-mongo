require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const UserRouter = require("./users/usersRouter");

const server = express();
const mongoose = require("mongoose");

//********mongodb connection********
//Establishes database location and paramaters
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// connects to the database and assigns it to db
const db = mongoose.connection;
// Informs of errors on connection
db.on("error", (error) => console.error(error));
// Informs of successful connection
db.once("open", () => console.log("Connected to Database"));

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/users", UserRouter);

server.get("/", (req, res) => {
  res.send("Server is live");
});

module.exports = server;
