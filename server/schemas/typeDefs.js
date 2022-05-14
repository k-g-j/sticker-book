// import the gql tagged template function
const { gql } = require('apollo-server-express')

// create typeDefs
const typeDefs = gql`
  type Goal {
    _id: ID
    goalText: String
    createdAt: String
    username: String
    stepCount: Int
    steps: [Step]
    encouragementCount: Int
    encouragements: [Encouragement]
  }
  type Step {
    _id: ID
    stepBody: String
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
    giveEncouragement(goalId: ID!, points: Int!): Goal
    addFriend(friendId: ID!): User
  }
`;

// export the typeDefs
module.exports = typeDefs