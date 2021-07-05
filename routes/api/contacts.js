const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../../src/middlewares");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../src/Controlers");

router.use(authMiddleware);

router
  .get("/", listContacts)
  .get("/:id", getContactById)
  .delete("/:id", removeContact)
  .post("/", addContact)
  .put("/:id", updateContact)
  .patch("/:id", updateContact);

module.exports = router;
