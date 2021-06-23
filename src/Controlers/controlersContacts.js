const { HttpCode } = require("../HttpCode");
const { schema, getErrorValidation } = require("../validation");
const {
  getData,
  getFindByID,
  getDeletContact,
  getAddContact,
  getUpdateContact,
} = require("../service");

const listContacts = async (req, res, next) => {
  try {
    const contacts = await getData(req);
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
    const contact = await getFindByID(req);
    contact
      ? res.json({ contact, status: HttpCode.OK })
      : res.json({ message: "Not found", status: HttpCode.NOT_FOUND });
  } catch (error) {
    next(error);
  }
};

const removeContact = async (req, res, next) => {
  try {
    const getContactDel = await getFindByID(req);
    if (getContactDel) {
      await getDeletContact(req);
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

    const { name, phone, email, favorite } = req.body;

    const newContact = {
      name: name,
      phone: phone,
      email: email,
      favorite: favorite,
    };
    await getAddContact(req, newContact);
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

    const isContactUpdate = await getUpdateContact(req);
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
