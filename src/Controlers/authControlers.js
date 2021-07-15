const { registration, registrationConfirmation, login } = require("../service");
const { HttpCode } = require("../HttpCode");
const { schemaAuth, getErrorValidation } = require("../validation");

const registrationControler = async (req, res, next) => {
  try {
    const { email, subscription } = req.body;

    const { error } = schemaAuth.validate(req.body);

    if (error) {
      getErrorValidation(error, HttpCode.BAD_REQUEST, res);
    }
    await registration(req);
    res.json({
      status: HttpCode.CREATED,
      user: {
        email: email,
        subscription: subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

const registrationConfirmationControler = async (req, res, next) => {
  try {
    const { code } = req.params;
    await registrationConfirmation(code);
    res.json({
      status: "success",
    });
  } catch (error) {
    next(error);
  }
};

const loginControler = async (req, res, next) => {
  try {
    const token = await login(req);
    res.json({ status: HttpCode.OK, token });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registrationControler,
  loginControler,
  registrationConfirmationControler,
};
