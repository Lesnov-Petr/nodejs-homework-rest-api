const express = require("express");
const router = express.Router();
const path = require("path");
const { authMiddleware } = require("../src/middlewares");

const { uploadController } = require("../src/Controlers");
const { avatarsController } = require("../src/Controlers");
const { getStorage } = require("../src/service");

const fileDir = path.resolve("./public/avatars");

router.use(authMiddleware);

router.post("/upload", getStorage(fileDir).single("avatar"), uploadController);
router.patch(
  "/avatars",
  getStorage(fileDir).single("avatar"),
  avatarsController
);
router.use("/download", express.static(fileDir));

module.exports = router;
