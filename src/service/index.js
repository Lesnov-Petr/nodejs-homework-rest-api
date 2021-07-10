const {
  getData,
  getFindByID,
  getDeletContact,
  getAddContact,
  getUpdateContact,
  getStorage,
} = require("./service");

const { registration, login } = require("./auth");

module.exports = {
  getStorage,
  getData,
  getFindByID,
  getAddContact,
  getDeletContact,
  getUpdateContact,
  registration,
  login,
};
