const express = require("express");
const router = express.Router();
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../src/Controlers");

router
  .get("/", listContacts)
  .get("/:id", getContactById)
  .delete("/:id", removeContact)
  .post("/", addContact)
  .put("/:id", updateContact);

module.exports = router;
