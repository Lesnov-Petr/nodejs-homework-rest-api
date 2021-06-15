const { listContacts } = require("./controlersContacts");
const { getContactById } = require("./controlersContacts");
const { removeContact } = require("./controlersContacts");
const { addContact } = require("./controlersContacts");
const { updateContact } = require("./controlersContacts");

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
