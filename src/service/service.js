const { Contact } = require("../db");
const multer = require("multer");

const getStorage = (fileDir) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, fileDir);
    },
    filename: (req, file, cb) => {
      const [filename, extension] = file.originalname.split(".");
      cb(null, `${filename}.${extension}`);
    },
  });
  const uploadMiddleware = multer({ storage });

  return uploadMiddleware;
};

const getData = async (userId, skip, limit) => {
  const Contacts = await Contact.find({ userId })
    .select({ __v: 0 })
    .skip(skip)
    .limit(limit);
  return Contacts;
};

const getFindByID = async (contactId, userId) => {
  const contact = await Contact.findOne({ _id: contactId, userId });
  return contact;
};

const getDeletContact = async (contactId, userId) => {
  await Contact.findOneAndRemove({ _id: contactId, userId });
};

const getAddContact = async (newContact) => {
  const contact = new Contact(newContact);
  await contact.save();
};

const getUpdateContact = async (req, userId) => {
  const paramBody = req.body;
  const { id } = req.params;
  const isResultUpdate = await Contact.findOneAndUpdate(
    { _id: id, userId },
    {
      $set: { ...paramBody },
    }
  );
  const isContactUpdate = isResultUpdate ? getFindByID(id, userId) : null;
  return isContactUpdate;
};

module.exports = {
  getData,
  getFindByID,
  getAddContact,
  getDeletContact,
  getUpdateContact,
  getStorage,
};
