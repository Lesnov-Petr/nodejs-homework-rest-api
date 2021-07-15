const {
  getData,
  getFindByID,
  getDeletContact,
  getAddContact,
  getUpdateContact,
  getStorage,
} = require("./service");

const { registration, registrationConfirmation, login } = require("./auth");

module.exports = {
  getStorage,
  getData,
  getFindByID,
  getAddContact,
  getDeletContact,
  getUpdateContact,
  registration,
  registrationConfirmation,
  login,
};
