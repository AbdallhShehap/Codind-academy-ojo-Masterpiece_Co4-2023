const express = require("express");
const loginController = require("../Controller/controll/loginController");
const router = express.Router();

router.post("/", loginController.login);
router.get("/getusers", loginController.getUsers);

module.exports = router;
