const { Schema } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const stepSchema = new Schema(
  {
    stepBody: {
      type: String,
      required: [true, 'Step needs to have text'],
      maxlength: 280
    },
    username: {
      type: String,
      required: [true, 'Only users can add steps']
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

module.exports = stepSchema;