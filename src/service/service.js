/* eslint-disable array-callback-return */
const fs = require("fs").promises;

const getReadJSON = async (srcJSON) => {
  const dataJSON = await fs.readFile(srcJSON, "utf8");
  const data = JSON.parse(dataJSON);
  return data;
};

const getFindByID = async (data, reqID) => {
  return data.find(({ id }) => `${id}` === reqID);
};

const getFilterByID = async (data, reqID) => {
  return data.filter(({ id }) => `${id}` !== reqID);
};

const getWriteFile = async (path, data) => {
  return fs.writeFile(path, JSON.stringify(data), "utf8");
};

const getUpdateContact = async (req, contactsPath) => {
  const contacts = await getReadJSON(contactsPath);
  let isContactUpdate;
  contacts.find(({ id }, index) => {
    if (String(id) === String(req.params.id)) {
      contacts[index] = {
        ...contacts[index],
        ...req.body,
      };
      getWriteFile(contactsPath, contacts);
      isContactUpdate = contacts[index];
    }
  });

  return isContactUpdate;
};

module.exports = {
  getReadJSON,
  getFindByID,
  getFilterByID,
  getWriteFile,
  getUpdateContact,
};
