const express = require("express");
const router = express.Router();
const {
  registrationControler,
  registrationConfirmationControler,
  loginControler,
} = require("../src/Controlers");

router
  .post("/registration", registrationControler)
  .post("/registration_cofirmation/:code", registrationConfirmationControler)
  .post("/login", loginControler);

module.exports = router;
