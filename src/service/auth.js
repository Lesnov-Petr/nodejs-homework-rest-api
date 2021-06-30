const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const { NotAuthorizedError } = require("../validation");
const { User } = require("../db");

const registration = async (req) => {
  const { email, password } = req.body;

  const user = new User({ email, password });

  await user.save();
};

const login = async (req) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  console.log(user);

  if (!user) {
    throw new NotAuthorizedError(`No user with email ${email} found`);
  }

  if (!(await bcrypt.compare(password, user.password))) {
    throw new NotAuthorizedError(`Wrong password`);
  }

  const token = jsonwebtoken.sign(
    {
      _id: user._id,
    },
    process.env.JWT_SECRET
  );

  return token;
};

module.exports = { registration, login };
