const express = require("express");
const SignupController = require("../Controller/controll/SignupController");
const router = express.Router();

router.post("/", SignupController.signup);

module.exports = router;
