const { listContacts } = require("./controlersContacts");
const { getContactById } = require("./controlersContacts");
const { removeContact } = require("./controlersContacts");
const { addContact } = require("./controlersContacts");
const { updateContact } = require("./controlersContacts");
const { registrationControler } = require("./authControlers");
const { loginControler } = require("./authControlers");
const { uploadController } = require("./filesController");
const { avatarsController } = require("./filesController");

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  registrationControler,
  loginControler,
  uploadController,
  avatarsController,
};
