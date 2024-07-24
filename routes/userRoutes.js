const express = require('express');
const router = express.Router(); // This is correct
const {registerUser, loginUser, currentUser }=require("../controllers/userControllers");
const validateToken = require('../middleware/validateTokenHandler');


router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/Current", validateToken,currentUser);

module.exports = router;
 