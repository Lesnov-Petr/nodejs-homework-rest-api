const { User } = require("../db");
const jimp = require("jimp");
const { v4: uuid } = require("uuid");
const path = require("path");
const fs = require("fs").promises;

const IMG_DIR = path.join(process.cwd(), "public", "avatars");

const uploadController = async (req, res, next) => {
  try {
    res.json({ status: "success" });
  } catch (error) {
    next(error);
  }
};

const avatarsController = async (req, res, next) => {
  try {
    if (req.file) {
      const id = req.user._id;
      const { file } = req;
      const img = await jimp.read(file.path);
      await img
        .autocrop()
        .cover(
          250,
          250,
          jimp.HORIZONTAL_ALIGN_CENTER || jimp.VERTICAL_ALIGN_MIDDLE
        )
        .writeAsync(file.path);

      const fileName = `${uuid()}_${file.originalname}`;
      const newPath = path.join(IMG_DIR, fileName);
      await fs.rename(file.path, newPath);

      const avatarURL = req.url + "/" + fileName;
      const user = await User.findByIdAndUpdate(
        { _id: id },
        { $set: { avatarURL } }
      );

      return res.status(200).json({
        status: "success",
        code: 200,
        users: {
          avatarURL: avatarURL,
        },
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { uploadController, avatarsController };
