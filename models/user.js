const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleSchemaValidationErrors } = require("../helpers");

const emailRegexp = /^[^-]\S*.@\S*.\.\S*[^-\s]$/;
const passwordRegexp = /^[^.-]\S*$/;
// Mongoose userSchema
const userSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
        },
        password: {
            type: String,
        },
        token: {
            type: String,
            default: null,
        },
        refreshToken: {
            type: String,
            default: null,
        },
    },
    { versionKey: false, timestamps: true }
);
userSchema.post("save", handleSchemaValidationErrors);

// Joi register/login schema
const registerSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().pattern(passwordRegexp).min(6).required(),
    confirmPassword: Joi.string().required().valid(Joi.ref("password")),
    pagesRead: Joi.array().items(Joi.string()),
});

const loginSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
});
// Joi verifyEmail schema
const verifyEmailSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
});

const schemas = {
    registerSchema,
    loginSchema,
    verifyEmailSchema,
};

const User = model("user", userSchema);

module.exports = {
    User,
    schemas,
};
