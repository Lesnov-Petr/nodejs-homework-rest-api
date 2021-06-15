const path = require("path");
const contactsPath = path.resolve("./model/contacts.json");
const { HttpCode } = require("../HttpCode");
const { schema, getErrorValidation } = require("../validation");
const {
  getReadJSON,
  getFindByID,
  getFilterByID,
  getWriteFile,
  getUpdateContact,
} = require("../service");

const listContacts = async (req, res, next) => {
  try {
    const contacts = await getReadJSON(contactsPath);
    return res.json({
      contacts,
      status: HttpCode.OK,
    });
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const contacts = await getReadJSON(contactsPath);
    const contact = await getFindByID(contacts, req.params.id);
    contact
      ? res.json({ contact, status: HttpCode.OK })
      : res.json({ message: "Not found", status: HttpCode.NOT_FOUND });
  } catch (error) {
    next(error);
  }
};

const removeContact = async (req, res, next) => {
  try {
    const contacts = await getReadJSON(contactsPath);
    const getContactDel = await getFindByID(contacts, req.params.id);
    if (getContactDel) {
      const isNewListContacts = await getFilterByID(contacts, req.params.id);
      await getWriteFile(contactsPath, isNewListContacts);
      return res.json({
        message: `contact ${JSON.stringify(getContactDel)} deleted`,
        status: HttpCode.OK,
      });
    } else {
      return res.json({ message: "Not found", status: HttpCode.NOT_FOUND });
    }
  } catch (error) {
    next(error);
  }
};

const addContact = async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      getErrorValidation(error, HttpCode.BAD_REQUEST, res);
    }

    const { name, phone, email } = req.body;

    const newContact = {
      id: Date.now(),
      name: name,
      phone: phone,
      email: email,
    };

    const contacts = await getReadJSON(contactsPath);
    contacts.push(newContact);
    await getWriteFile(contactsPath, contacts);
    return res.json({ newContact, status: HttpCode.CREATED });
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    if (Object.keys(req.body).length === 0) {
      return res.json({
        message: "missing fields",
        status: HttpCode.BAD_REQUEST,
      });
    }

    const { error } = schema.validate(req.body);
    if (error) {
      await getErrorValidation(error, HttpCode.BAD_REQUEST, res);
    }

    const isContactUpdate = await getUpdateContact(req, contactsPath);
    const response = isContactUpdate
      ? res.json({ isContactUpdate, message: HttpCode.OK })
      : res.json({ message: "Not Found", status: HttpCode.NOT_FOUND });

    return response;
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
