const Joi = require("joi");

const registerValidator = (data) => {
  const schema = Joi.object({
    fullName: Joi.string().min(3).max(100).required().messages({
      "string.empty": "Ism-familiya kiritilishi shart",
      "string.min": "Ism-familiya kamida 3 ta belgidan iborat bo'lishi kerak",
      "any.required": "Ism-familiya kiritilishi shart",
    }),
    email: Joi.string().email().required().messages({
      "string.empty": "Email kiritilishi shart",
      "string.email": "Email formati noto'g'ri",
      "any.required": "Email kiritilishi shart",
    }),
    password: Joi.string().min(6).required().messages({
      "string.empty": "Parol kiritilishi shart",
      "string.min": "Parol kamida 6 ta belgidan iborat bo'lishi kerak",
      "any.required": "Parol kiritilishi shart",
    }),
    phoneNumber: Joi.string().optional(),
  });

  return schema.validate(data);
};

const loginValidator = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().messages({
      "string.empty": "Email kiritilishi shart",
      "string.email": "Email formati noto'g'ri",
      "any.required": "Email kiritilishi shart",
    }),
    password: Joi.string().required().messages({
      "string.empty": "Parol kiritilishi shart",
      "any.required": "Parol kiritilishi shart",
    }),
  });

  return schema.validate(data);
};

const forgetPasswordValidator = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().messages({
      "string.empty": "Email kiritilishi shart",
      "string.email": "Email formati noto'g'ri",
      "any.required": "Email kiritilishi shart",
    }),
  });

  return schema.validate(data);
};

const resetPasswordValidator = (data) => {
  const schema = Joi.object({
    token: Joi.string().required().messages({
      "string.empty": "Token kiritilishi shart",
      "any.required": "Token kiritilishi shart",
    }),
    newPassword: Joi.string().min(6).required().messages({
      "string.empty": "Yangi parol kiritilishi shart",
      "string.min": "Parol kamida 6 ta belgidan iborat bo'lishi kerak",
      "any.required": "Yangi parol kiritilishi shart",
    }),
  });

  return schema.validate(data);
};

module.exports = {
  registerValidator,
  loginValidator,
  forgetPasswordValidator,
  resetPasswordValidator,
};
