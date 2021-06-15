const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().min(3).max(30).required(),

  phone: Joi.string().min(5).max(15).required(),

  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
});

const getErrorValidation = async (error, statusCode, res) => {
  const isRrequiredField = JSON.stringify(error.details[0].path[0]);
  return res.json({
    message: `missing required ${isRrequiredField} field`,
    status: statusCode,
  });
};

module.exports = { schema, getErrorValidation };
