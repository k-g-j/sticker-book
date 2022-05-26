import { gql } from '@apollo/client'

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`

export const ADD_FRIEND = gql`
  mutation addFriend($id: ID!) {
    addFriend(friendId: $id) {
      _id
      username
      friendCount
      friends {
        _id
        username
      }
    }
  }
`

// Goal types: 'Physical Health', 'Mental Health', 'Financial', 'Educational', 'Personal'
export const ADD_GOAL = gql`
  mutation addGoal($goalText: String!, $type: String!) {
    addGoal(goalText: $goalText, type: $type) {
      _id
      goalText
      type
      completed
      x
      y
      z
      createdAt
      username
      stepCount
      steps {
        _id
        stepBody
        completed
      }
    }
  }
`

export const ADD_STEP = gql`
  mutation addStep($goalId: ID!, $stepBody: String!) {
    addStep(goalId: $goalId, stepBody: $stepBody) {
      _id
      goalText
      type
      completed
      stepCount
      steps {
        _id
        stepBody
        completed
        createdAt
        username
      }
    }
  }
`

export const GIVE_ENCOURAGEMENT = gql`
  mutation giveEncouragement($goalId: ID!, $points: Int!, $message: String) {
    giveEncouragement(goalId: $goalId, points: $points, message: $message) {
      _id
      goalText
      type
      completed
      encouragementCount
      encouragements {
        _id
        points
        createdAt
        username
        message
      }
    }
  }
`

export const ADD_STICKER = gql`
  mutation addSticker($goalId: ID!, $imageUrl: String!) {
    addSticker(goalId: $goalId, imageUrl: $imageUrl) {
      _id
      goalText
      completed
      type
      stickers
      x
      y
      z
      createdAt
      username
      reminder
      completeDate
      encouragementCount
      encouragements {
        _id
        points
        createdAt
        username
        message
      }
      stepCount
      steps {
        _id
        stepBody
        completed
        createdAt
        username
      }
    }
  }
`
export const UPDATE_STICKER = gql`
  mutation updateSticker($goalId: ID!, $newX: Int!, $newY: Int!, $newZ: Int!) {
    updateSticker(goalId: $goalId, newX: $newX, newY: $newY, newZ: $newZ) {
      _id
      goalText
      type
      completed
      stickers
      x
      y
      z
      createdAt
      username
      reminder
      completeDate
      encouragementCount
      encouragements {
        _id
        points
        createdAt
        username
        message
      }
      stepCount
      steps {
        _id
        stepBody
        completed
        createdAt
        username
      }
    }
  }
`

export const COMPLETE_GOAL = gql`
  mutation CompleteGoal($goalId: ID!) {
    completeGoal(goalId: $goalId) {
      goalText
      type
      completed
    }
  }
`
export const COMPLETE_STEP = gql`
  mutation CompleteStep($goalId: ID!, $stepId: ID!) {
    completeStep(goalId: $goalId, stepId: $stepId) {
      goalText
      type
      completed
      steps {
        stepBody
        completed
      }
    }
  }
`
export const DELETE_GOAL = gql`
  mutation DeleteGoal($goalId: ID!) {
    deleteGoal(goalId: $goalId) {
      goalText
      type
      completed
      steps {
        stepBody
        completed
      }
    }
  }
`

export const DELETE_STEP = gql`
  mutation DeleteStep($goalId: ID!, $stepId: ID!) {
    deleteStep(goalId: $goalId, stepId: $stepId) {
      goalText
      type
      completed
      steps {
        stepBody
        completed
      }
    }
  }
`
