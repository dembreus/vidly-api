const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const PasswordComplexity = require("joi-password-complexity");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50
    },
    email: {
      type: String,
      unique: true,
      required: true,
      minlength: 6,
      maxlength: 255
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 1024
    }
  })
);

function validateUser(user) {
  const schema = {
    name: Joi.string()
      .required()
      .min(2)
      .max(50),
    email: Joi.string()
      .required()
      .min(6)
      .max(255)
      .email(),
    password: Joi.validate(
      user.password,
      new PasswordComplexity(),
      (err, value) => {
        if (err) return err.message;
        return value;
      }
    )
  };
  return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;
