const { Schema, model } = require("mongoose");
const Joi = require("joi");

const userSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    number: {
      type: String,
      required: [true, "Number is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },

    role: {
      type: String,
      required: [true, "Role is required"],
      enum: ["Patient", "Doctor"],
    },
    patientStatus: {
      type: String,
    },

    rating: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      default: 100,
    },
    about: {
      type: String,
    },
    specialization: {
      type: String,
    },
    category: {
      type: String,
    },
    gender: {
      type: String,
    },
    birthday: {
      type: Date,
    },

    allRating: [
      {
        user: Schema.Types.ObjectId,
        rating: Number,
      },
    ],

    experience: [
      {
        institution: { type: String },
        institutionLogo: { type: String },
        description: { type: String },
        startDate: { type: Date },
        endDate: { type: Date },
      },
    ],
    token: String,

    avatarURL: String,
  },
  { versionKey: false, timestamps: true }
);

const registerSchema = Joi.object({
  name: Joi.string().required(),
  number: Joi.string().required(),
  password: Joi.string().min(3).required(),
  role: Joi.string().valid("Doctor", "Patient").required(),
  patientStatus: Joi.string().optional(),
});

const loginSchema = Joi.object({
  number: Joi.string().required(),
  password: Joi.string().min(3).required(),
});

const addUserExperienceSchema = Joi.object({
  institution: Joi.string().required(),
  institutionLogo: Joi.string().optional(),
  description: Joi.string().required(),
  startDate: Joi.string().required(),
  endDate: Joi.string().required(),
});
const updateUserExperienceSchema = Joi.object({
  institution: Joi.string().optional(),
  institutionLogo: Joi.string().optional(),
  description: Joi.string().optional(),
  startDate: Joi.string().optional(),
  endDate: Joi.string().optional(),
});

const updateUserSchema = Joi.object({
  name: Joi.string().optional(),
  gender: Joi.string().optional(),
  birthday: Joi.string().optional(),
  number: Joi.string().optional(),
  about: Joi.string().optional(),
  specialization: Joi.string().optional(),
  category: Joi.string().optional(),
  price: Joi.string().optional(),
});

const User = model("user", userSchema);
module.exports = {
  User,
  registerSchema,
  loginSchema,
  addUserExperienceSchema,
  updateUserSchema,
  updateUserExperienceSchema,
};
