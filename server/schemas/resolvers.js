const { AuthenticationError } = require('apollo-server-express')
const { User, Goal } = require('../models')
const { signToken } = require('../utils/auth')

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password')
          .populate('goals')
          .populate('friends')

        return userData
      }

      throw new AuthenticationError('Not logged in')
    },
    users: async () => {
      return User.find()
        .select('-__v -password')
        .populate('goals')
        .populate('friends')
    },
    user: async (parent, { email }) => {
      return User.findOne({ email })
        .select('-__v -password')
        .populate('friends')
        .populate('goals')
    },
    goals: async (parent, { email }) => {
      const params = email ? { email } : {}
      return Goal.find(params).sort({ createdAt: -1 })
    },
    goal: async (parent, { _id }) => {
      return Goal.findOne({ _id })
        .populate('steps')
        .populate('encouragements')
        .populate('stickers')
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args)
      const token = signToken(user)

      return { token, user }
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email })

      if (!user) {
        throw new AuthenticationError('Incorrect credentials')
      }

      const correctPw = await user.isCorrectPassword(password)

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials')
      }

      const token = signToken(user)
      return { token, user }
    },
    addGoal: async (parent, args, context) => {
      if (context.user) {
        const goal = await Goal.create({
          ...args,
          username: context.user.username,
        })

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { goals: goal._id } },
          { new: true },
        )

        return goal
      }

      throw new AuthenticationError('You need to be logged in!')
    },
    addStep: async (parent, { goalId, stepBody }, context) => {
      if (context.user) {
        const updatedGoal = await Goal.findOneAndUpdate(
          { _id: goalId },
          { $push: { steps: { stepBody, username: context.user.username } } },
          { new: true, runValidators: true },
        )
          .populate('steps')
          .populate('encouragements')
          .populate('stickers')

        return updatedGoal
      }

      throw new AuthenticationError('You need to be logged in!')
    },
    updateSticker: async (parent, { goalId, newX, newY, newZ }, context) => {
      if (context.user) {
        const updatedGoal = await Goal.findOneAndUpdate(
          { _id: goalId },
          { x: newX, y: newY, z: newZ },
          { new: true, runValidators: true },
        )
          .populate('steps')
          .populate('encouragements')
          .populate('stickers')

        return updatedGoal
      }

      throw new AuthenticationError('You need to be logged in!')
    },
    addSticker: async (parent, { goalId, imageUrl }, context) => {
      if (context.user) {
        const updatedGoal = await Goal.findOneAndUpdate(
          { _id: goalId },
          { $push: { stickers: imageUrl } },
          { new: true, runValidators: true },
        )
          .populate('steps')
          .populate('encouragements')
          .populate('stickers')

        return updatedGoal
      }

      throw new AuthenticationError('You need to be logged in!')
    },
    giveEncouragement: async (
      parent,
      { goalId, encouragementBody },
      context,
    ) => {
      if (context.user) {
        const updatedGoal = await Goal.findOneAndUpdate(
          { _id: goalId },
          {
            $push: {
              encouragements: {
                encouragementBody,
                username: context.user.username,
              },
            },
          },
          { new: true, runValidators: true },
        )
          .populate('steps')
          .populate('encouragements')
          .populate('stickers')

        return updatedGoal
      }

      throw new AuthenticationError('You need to be logged in!')
    },
    addFriend: async (parent, { friendId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { friends: friendId } },
          { new: true },
        ).populate('friends')

        return updatedUser
      }

      throw new AuthenticationError('You need to be logged in!')
    },
    completeGoal: async (parent, { goalId }, context) => {
      if (context.user) {
        const updatedGoal = await Goal.findOneAndUpdate(
          { _id: goalId },
          { completed: true },
          { new: true, runValidators: true },
        )
          .populate('steps')
          .populate('encouragements')
          .populate('stickers')

        return updatedGoal
      }
      throw new AuthenticationError('You need to be logged in!')
    },
    completeStep: async (parent, { goalId, stepId }, context) => {
      if (context.user) {
        const updatedGoal = await Goal.findOneAndUpdate(
          { _id: goalId, 'steps._id': stepId },
          { 'steps.$.completed': true },
          { new: true, runValidators: true },
        )
          .populate('steps')
          .populate('encouragements')
          .populate('stickers')

        return updatedGoal
      }
      throw new AuthenticationError('You need to be logged in!')
    },
    deleteGoal: async (parent, { goalId }, context) => {
      if (context.user) {
        const deletedGoal = await Goal.findOneAndDelete({ _id: goalId })
        return deletedGoal
      }
      throw new AuthenticationError('You need to be logged in!')
    },
    deleteStep: async (parent, { goalId, stepId }, context) => {
      if (context.user) {
        const updatedGoal = await Goal.findOneAndUpdate(
          { _id: goalId },
          { $pull: { steps: { _id: stepId } } },
          { new: true }
        )
          .populate('steps')
          .populate('encouragements')
          .populate('stickers')
        return updatedGoal
      }

    },
  },
}

module.exports = resolvers
