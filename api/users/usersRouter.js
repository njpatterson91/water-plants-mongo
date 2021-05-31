const router = require("express").Router();

//Gets plants accessable to user. Requires user to be logged in.
router.get("/plants", (req, res) =>{

})

//Deletes a user and all plants associated with them. Requires user to be logged in.
router.delete("/", (req, res)=>{

})

//Registers a new user.
router.post("/", (req, res) =>{

})

//Logs a user in.
router.post("/" (req, res) =>{

})

//Changes a users password. Requires a user to be logged in and pass password validation checks.
router.patch("/password", (req, res) =>{

})

module.exports = router;