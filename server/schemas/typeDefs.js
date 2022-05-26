// import the gql tagged template function
const { gql } = require('apollo-server-express')

// create typeDefs
const typeDefs = gql`
  type Goal {
    _id: ID
    goalText: String
    x: Int
    y: Int
    z: Int
    type: String
    completed: Boolean
    createdAt: String
    username: String
    reminder: String
    completeDate: String
    stickers: [String]
    stepCount: Int
    steps: [Step]
    encouragementCount: Int
    encouragements: [Encouragement]
  }
  type Step {
    _id: ID
    stepBody: String
    completed: Boolean
    createdAt: String
    username: String
  }
  type Encouragement {
    _id: ID
    points: Int
    createdAt: String
    username: String
    message: String
  }
  type User {
    _id: ID
    username: String
    email: String
    friendCount: Int
    goals: [Goal]
    friends: [User]
  }
  type Auth {
    token: ID!
    user: User
  }
  type Query {
    me: User
    users: [User]
    user(email: String!): User
    goals(email: String): [Goal]
    goal(_id: ID!): Goal
  }
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addGoal(goalText: String!, type: String!): Goal
    addStep(goalId: ID!, stepBody: String!): Goal
    addSticker(goalId: ID!, imageUrl: String!): Goal
    updateSticker(goalId: ID!, newX: Int!, newY: Int!, newZ: Int!): Goal
    giveEncouragement(goalId: ID!, points: Int!, message: String): Goal
    addFriend(friendId: ID!): User
    completeGoal(goalId: ID!): Goal
    completeStep(goalId: ID!, stepId: ID!): Goal
    deleteGoal(goalId: ID!): Goal
    deleteStep(goalId: ID!, stepId: ID!): Goal
  }
`;

// export the typeDefs
module.exports = typeDefs
