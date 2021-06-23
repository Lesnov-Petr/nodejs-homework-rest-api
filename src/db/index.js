const { connectionMongoDb } = require("./connection");
const { Contact } = require("./contactModel");

module.exports = { connectionMongoDb, Contact };
