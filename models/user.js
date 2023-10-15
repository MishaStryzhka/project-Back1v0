const { Schema, model } = require('mongoose');
const { handleMongooseError } = require('../helpers');

// eslint-disable-next-line no-useless-escape
const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema(
  {
    email: {
      type: String,
      lowercase: true,
      trim: true,
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
      trim: true,
      minlength: 3,
    },
    lastName: {
      type: String,
      trim: true,
      minlength: 3,
    },
    patronymic: {
      type: String,
      trim: true,
      minlength: 5,
    },
    phones: {
      type: [String],
    },
    userType: {
      type: String,
      enum: ['patient', 'doctor'],
    },
    contactMethods: {
      type: [String],
    },
    dateOfBirthday: {
      type: Date,
      max: new Date(),
    },

    // -> Fields for DOCTOR
    directionsOfWork: [String],
    problemsItSolves: [String],

    experienceYears: { type: String, lowercase: true, trim: true },

    educations: [
      {
        _id: { type: String },
        name: { type: String, trim: true },
        years: {
          begin: { type: Number },
          end: { type: Number },
        },
      },
    ],
    paymentMethods: [
      {
        type: String,
        lowercase: true,
        trim: true,
        enum: ['Visa', 'MasterCard'],
      },
    ],

    jobs: [
      {
        name: { type: String, lowercase: true, trim: true },
        cityArea: { type: String, lowercase: true, trim: true },
        address: { type: String, lowercase: true, trim: true },
        workSchedule: [
          {
            begin: { type: Number },
            end: { type: Number },
          },
        ],
        receptionHours: [
          {
            begin: { type: String, lowercase: true, trim: true },
            end: { type: String, lowercase: true, trim: true },
          },
        ],
      },
    ],

    provider: {
      type: String,
      default: 'Dentist Portal',
    },
    avatar: String,

    certificates: [
      {
        path: { type: String, lowercase: true, trim: true },
        certificatePublicID: { type: String, lowercase: true, trim: true },
      },
    ],

    avatarPublicId: String,
    token: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post('save', handleMongooseError);

const User = model('user', userSchema);

module.exports = User;
