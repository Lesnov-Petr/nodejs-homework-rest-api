const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().min(3).max(30).required(),

  phone: Joi.string().min(5).max(15).required(),

  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  favorite: Joi.boolean().required(),
});

const getErrorValidation = async (error, statusCode, res) => {
  const isRrequiredField = JSON.stringify(error.details[0].path[0]);
  return res.json({
    message: `missing required ${isRrequiredField} field`,
    status: statusCode,
  });
};

const schemaAuth = Joi.object({
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),

  password: Joi.string().min(6).max(15).required(),

  subscription: Joi.string(),
});

module.exports = { schema, schemaAuth, getErrorValidation };
