import { gql } from '@apollo/client';

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
`;

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
`;

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
`;

// Goal types: 'Physical Health', 'Mental Health', 'Financial', 'Educational', 'Personal'
export const ADD_GOAL = gql`
  mutation addGoal($goalText: String!, $goalType: String!) {
    addGoal(goalText: $goalText, goalType: $goalType) {
      _id
      goalText
      x
      y
      z
      createdAt
      username
      stepCount
      steps {
        _id
        stepBody
      }
    }
  }
`;

export const ADD_STEP = gql`
  mutation addStep($goalId: ID!, $stepBody: String!) {
    addStep(goalId: $goalId, stepBody: $stepBody) {
      _id
      stepCount
      steps {
        _id
        stepBody
        createdAt
        username
      }
    }
  }
`

export const GIVE_ENCOURAGEMENT = gql`
  mutation giveEncouragement($goalId: ID!, $points: Int!) {
    giveEncouragement(goalId: $goalId, points: $points) {
      _id
      encouragementPoints
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
      stickers
      x
      y
      z
      createdAt
      username
      reminder
      completeDate
      encouragementPoints
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
        createdAt
        username
      }
    }
  }
`
export const UPDATE_STICKER = gql`
  mutation addSticker($goalId: ID!, $newX: Int!, $newY: Int!, newZ: Int!) {
    addSticker(goalId: $goalId, newX: $newX, newY: $newY, newZ: $newZ) {
      _id
      goalText
      stickers
      x
      y
      z
      createdAt
      username
      reminder
      completeDate
      encouragementPoints
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
        createdAt
        username
      }
    }
  }
`