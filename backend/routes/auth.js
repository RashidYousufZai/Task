const express = require("express");
const router = express.Router()
const { registerUser, loginUser, logoutUser, refecthUser } = require("../controller/auth.js");
const varifyToken = require("../middleware/varifyToken.js")

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout",varifyToken, logoutUser);
router.get("/refetch", refecthUser);

module.exports = router