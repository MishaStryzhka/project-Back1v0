const { Schema, model } = require('mongoose');
const validator = require('validator');
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

    links: {
      type: new Schema({
        instagram: {
          type: String,
          required: true,
          validate: {
            validator: value => {
              const instagramRegex =
                /^(https?:\/\/)?(www\.)?instagram\.com\/[a-zA-Z0-9_.]+\/?$/;
              return instagramRegex.test(value);
            },
            message: 'Недійсний URL Instagram-профілю',
          },
        },
        tiktok: {
          type: String,
          required: true,
          validate: {
            validator: value => {
              const tiktokRegex =
                /^(https?:\/\/)?(www\.)?tiktok\.com\/@[a-zA-Z0-9_.]+\/?$/;
              return tiktokRegex.test(value);
            },
            message: 'Недійсний URL TikTok-профілю',
          },
        },
        otherLink: {
          type: String,
          required: true,
          validate: {
            validator: value => {
              return validator.isURL(value, {
                protocols: ['http', 'https'],
                require_tld: true,
                require_protocol: true,
              });
            },
            message: 'Недійсний URL',
          },
        },
        _id: {
          type: Schema.Types.ObjectId,
          auto: false, // Вимкніть автоматичне створення _id
        },
      }),
      required: true,
    },

    // -> Fields for DOCTOR
    directionsOfWork: [String],
    problemsItSolves: {
      type: Schema.Types.Mixed,
      validate: {
        validator: function (value) {
          if (!value || Object.keys(value).length === 0) {
            return false;
          }

          for (const key in value) {
            if (typeof value[key] !== 'number' || value[key] < 0) {
              return false;
            }
          }

          return true;
        },
        message: 'Invalid format or negative value for problemsItSolves',
      },
    },

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
        enum: ['cash', 'card'],
      },
    ],

    jobs: [
      {
        _id: { type: String },
        name: { type: String, trim: true },
        cityArea: { type: String, trim: true },
        address: { type: String, trim: true },
        workSchedule: {
          type: String,
        },
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
    communicationWithDoctor: {
      type: [String],
      enum: ['telegramBot', 'chatBotOnTheSite'],
      required: true,
    },
    howApplicationsAreReceived: {
      type: [String],
      enum: ['telegramBot', 'chatBotOnTheSite', 'email'],
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post('save', handleMongooseError);

const User = model('user', userSchema);

module.exports = User;
