const Joi = require("joi");

const brandValidator = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(50).required().messages({
      "string.empty": "Marka nomi kiritilishi shart",
      "string.min": "Marka nomi kamida 2 ta belgidan iborat bo'lishi kerak",
      "any.required": "Marka nomi kiritilishi shart",
    }),
    description: Joi.string().optional(),
    country: Joi.string().optional(),
    isActive: Joi.boolean().optional(),
  });

  return schema.validate(data);
};

const updateBrandValidator = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(50).optional(),
    description: Joi.string().optional(),
    country: Joi.string().optional(),
    isActive: Joi.boolean().optional(),
  });

  return schema.validate(data);
};

module.exports = {
  brandValidator,
  updateBrandValidator,
};
