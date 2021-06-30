const {
  getData,
  getFindByID,
  getDeletContact,
  getAddContact,
  getUpdateContact,
} = require("./service");

const { registration, login } = require("./auth");

module.exports = {
  getData,
  getFindByID,
  getAddContact,
  getDeletContact,
  getUpdateContact,
  registration,
  login,
};
