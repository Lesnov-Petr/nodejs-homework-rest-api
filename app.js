/* eslint-disable no-unused-vars */
const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const { connectionMongoDb } = require("./src/db");
const { HttpCode } = require("./src/HttpCode");
const contactsRouter = require("./routes/api/contacts.js");
const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(HttpCode.NOT_FOUND).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(HttpCode.Internal_Server_Error).json({ message: err.message });
});

app.use();

const start = async () => {
  await connectionMongoDb();
};

start();

module.exports = app;
