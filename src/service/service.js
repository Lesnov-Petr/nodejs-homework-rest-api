const { Contact } = require("../db");

const getData = async () => {
  const Contacts = await Contact.find({});
  return Contacts;
};

const getFindByID = async (req) => {
  const { id } = req.params;
  const contact = await Contact.findById(id);
  return contact;
};

const getDeletContact = async (req) => {
  const { id } = req.params;
  await Contact.findByIdAndDelete(id);
};

const getAddContact = async (req, newContact) => {
  const contact = new Contact(newContact);
  await contact.save();
};

const getUpdateContact = async (req) => {
  const paramBody = req.body;
  const { id } = req.params;
  const isResultUpdate = await Contact.findByIdAndUpdate(id, {
    $set: { ...paramBody },
  });
  const isContactUpdate = isResultUpdate ? getFindByID(req) : null;
  return isContactUpdate;
};

module.exports = {
  getData,
  getFindByID,
  getAddContact,
  getDeletContact,
  getUpdateContact,
};
