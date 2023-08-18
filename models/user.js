const { Schema, model } = require('mongoose');
const { handleMongooseError } = require('../helpers');

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema(
  {
    email: {
      type: String,
      match: emailRegexp,
      unique: true,
      required: [true, 'Email is required'],
    },
    password: {
      type: String,
      minlength: 6,
      required: [true, 'Set password for user'],
    },
    firstName: {
      type: String,
      minlength: 3,
    },
    lastName: {
      type: String,
      minlength: 3,
    },
    patronymic: {
      type: String,
      minlength: 5,
    },
    phones: {
      type: [String],
    },
    userType: {
      type: String,
      enum: ['patient', 'doctor'],
    },
    contactMethods: [String],
    avatar: String,
    token: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post('save', handleMongooseError);

const User = model('user', userSchema);

module.exports = User;
