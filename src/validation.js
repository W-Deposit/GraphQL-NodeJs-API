const Joi = require("@hapi/joi");

//registration validation
const registerValidation = (data) => {
  const schema = {
    name: Joi.string().min(6).required(),
    firstname: Joi.string().min(6).required(),
    lastname: Joi.string().min(6).required(),
    phoneNumber: joi.string().length(10).pattern(/^[0-9]+$/).required(),
    email: Joi.string().min(6).required().email(),
    password:Joi.string.required()
  };
  return Joi.validate(data, schema);
};
module.exports = registerValidation;
