const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const { NotAuthorizedError } = require("../validation");
const { User } = require("../db");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const registration = async (req) => {
  const { email, password } = req.body;

  const user = new User({ email, password });

  const msg = {
    to: email,
    from: "ezhov.kirill98@gmail.com",
    subject: "hello",
    text: "hello world",
    html: "<h1>Hello world</h1>",
  };

  await sgMail.send(msg);
  await user.save();
};

const login = async (req) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

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
