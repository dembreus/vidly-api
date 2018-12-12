const mongoose = require("mongoose");
const Joi = require("joi");

const Customer = mongoose.model(
  "Customer",
  new mongoose.Schema({
    isGold: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50
    },
    phone: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 13
    }
  })
);

// validating a customer
const validateCustomer = customer => {
  const schema = {
    isGold: Joi.boolean(),
    name: Joi.string()
      .min(2)
      .max(50)
      .required(),
    phone: Joi.string()
      .min(10)
      .max(13)
      .required()
  };

  return Joi.validate(customer, schema);
};

exports.Customer = Customer;
exports.validate = validateCustomer;
