const { Schema } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const encouragementSchema = new Schema(
  {
    points: {
      type: Number,
      required: [true, 'Must be a number of points'],
      min: [0, 'Must give at least 1 encourgement point'],
      max: [10, 'Max 10 encouragement points user can give']
    },
    message: {
      type: String,
      minlength: [1, 'Must include value for message'],
      maxlength: [280, 'Exceeded max message length']
    },
    username: {
      type: String,
      required: [true, 'Only users can give encouragement points']
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    }
  },
  {
    toJSON: {
      getters: true
    }
  }
);

module.exports = encouragementSchema;