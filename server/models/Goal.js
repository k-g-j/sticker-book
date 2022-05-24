const { Schema, model } = require('mongoose');
const stepSchema = require('./Step');
const encouragementSchema = require('./Encouragement')
const dateFormat = require('../utils/dateFormat');

const goalSchema = new Schema(
  {
    goalText: {
      type: String,
      required: [true, 'Need to input goal text'],
      minlength: 1,
      maxlength: 280
    },
    type: {
      type: String,
      required: [true, 'Need to input type'],
      enum: {
        values: ['Physical Health', 'Mental Health', 'Financial', 'Educational', 'Personal'],
        message: '{VALUE} is not supported goal type'
      }
    },
    completed: {
      type: Boolean,
      default: false
    },
    steps: [stepSchema],
    encouragements: [encouragementSchema],
    stickers: [String],
    x: {
      type: Number
    },
    y: {
      type: Number
    },
    z: {
      type: Number
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    },
    reminder: {
      type: String
    },
    completeDate: {
      type: Date,
      get: timestamp => dateFormat(timestamp)
    },
    username: {
      type: String,
      required: true
    },
  },
  {
    toJSON: {
      getters: true
    }
  }
);

goalSchema.virtual('stepCount').get(function() {
  return this.steps.length;
});

goalSchema.virtual('encouragementCount').get(function () {
  return this.encouragements.length;
});

const Goal = model('Goal', goalSchema);

module.exports = Goal;