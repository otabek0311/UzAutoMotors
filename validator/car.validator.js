const Joi = require("joi");

const carValidator = (data) => {
  const schema = Joi.object({
    brand: Joi.string().required().messages({
      "string.empty": "Marka ID kiritilishi shart",
      "any.required": "Marka ID kiritilishi shart",
    }),
    model: Joi.string().min(2).max(100).required().messages({
      "string.empty": "Model nomi kiritilishi shart",
      "string.min": "Model nomi kamida 2 ta belgidan iborat bo'lishi kerak",
      "any.required": "Model nomi kiritilishi shart",
    }),
    year: Joi.number().integer().min(1900).max(new Date().getFullYear() + 1).required().messages({
      "number.base": "Yil raqam bo'lishi kerak",
      "number.min": "Yil 1900 dan kichik bo'lmasligi kerak",
      "any.required": "Yil kiritilishi shart",
    }),
    price: Joi.number().positive().required().messages({
      "number.base": "Narx raqam bo'lishi kerak",
      "number.positive": "Narx musbat bo'lishi kerak",
      "any.required": "Narx kiritilishi shart",
    }),
    color: Joi.string().required().messages({
      "string.empty": "Rang kiritilishi shart",
      "any.required": "Rang kiritilishi shart",
    }),
    fuelType: Joi.string().valid("benzin", "dizel", "elektr", "gibrid").required().messages({
      "any.only": "Yoqilg'i turi: benzin, dizel, elektr yoki gibrid bo'lishi kerak",
      "any.required": "Yoqilg'i turi kiritilishi shart",
    }),
    transmission: Joi.string().valid("mexanika", "avtomat").required().messages({
      "any.only": "Transmissiya: mexanika yoki avtomat bo'lishi kerak",
      "any.required": "Transmissiya kiritilishi shart",
    }),
    engineCapacity: Joi.string().optional(),
    mileage: Joi.number().min(0).optional(),
    features: Joi.array().items(Joi.string()).optional(),
    description: Joi.string().optional(),
    isAvailable: Joi.boolean().optional(),
  });

  return schema.validate(data);
};

const updateCarValidator = (data) => {
  const schema = Joi.object({
    brand: Joi.string().optional(),
    model: Joi.string().min(2).max(100).optional(),
    year: Joi.number().integer().min(1900).max(new Date().getFullYear() + 1).optional(),
    price: Joi.number().positive().optional(),
    color: Joi.string().optional(),
    fuelType: Joi.string().valid("benzin", "dizel", "elektr", "gibrid").optional(),
    transmission: Joi.string().valid("mexanika", "avtomat").optional(),
    engineCapacity: Joi.string().optional(),
    mileage: Joi.number().min(0).optional(),
    features: Joi.array().items(Joi.string()).optional(),
    description: Joi.string().optional(),
    isAvailable: Joi.boolean().optional(),
  });

  return schema.validate(data);
};

module.exports = {
  carValidator,
  updateCarValidator,
};
