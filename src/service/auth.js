const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const sha256 = require("sha256");
const { NotAuthorizedError } = require("../validation");
const { User } = require("../db");
const { Verification } = require("../db");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const registration = async (req) => {
  const { email, password } = req.body;

  const user = new User({ email, password });

  const code = sha256(email + process.env.JWT_SECRET);

  const verification = new Verification({
    code,
    userId: user._id,
  });

  await verification.save();

  const msg = {
    to: email,
    from: "ezhov.kirill98@gmail.com",
    subject: "Verification",
    text: `<h1>Please, confirm your email adress POST http://localhost:3000/api/auth/registration_fonfirmation/${code}</h1>`,
    html: `<h1>Please, confirm your email adress POST http://localhost:3000/api/auth/registration_fonfirmation/${code}</h1>`,
  };

  await sgMail.send(msg);
  await user.save();
};

const registrationConfirmation = async (code) => {
  const verification = await Verification.findOne({ code, active: true });

  if (!verification) {
    throw new NotAuthorizedError(`Invalid or expired confirmation code`);
  }

  const user = await User.findById(verification.userId);

  if (!user) {
    throw new NotAuthorizedError(`No user found`);
  }

  verification.active = false;
  await verification.save();

  user.confirm = true;
  await user.save();

  const msg = {
    to: user.email,
    from: "ezhov.kirill98@gmail.com",
    subject: "Verification",
    text: `<h1>Please, confirm your email adress POST http://localhost:3000/api/auth/registration_fonfirmation/${code}</h1>`,
    html: `<h1>Please, confirm your email adress POST http://localhost:3000/api/auth/registration_fonfirmation/${code}</h1>`,
  };

  await sgMail.send(msg);
};

const login = async (req) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, confirm: true });

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

module.exports = { registration, login, registrationConfirmation };
