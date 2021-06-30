const express = require("express");
const router = express.Router();
const { registrationControler, loginControler } = require("../src/Controlers");

router
  .post("/registration", registrationControler)
  .post("/login", loginControler);

module.exports = router;
