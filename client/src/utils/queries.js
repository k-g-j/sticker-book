import { gql } from '@apollo/client'

export const QUERY_GOALS = gql`
  query goals($email: String) {
    goals(email: $email) {
      _id
      goalText
      type
      completed
      x
      y
      z
      createdAt
      username
      reminder
      completeDate
      stepCount
      encouragementPoints
      stickers
      steps {
        _id
        createdAt
        username
        stepBody
        completed
      }
      encouragements {
        _id
        points
        username
        message
      }
    }
  }
`

export const QUERY_GOAL = gql`
  query goal($id: ID!) {
    goal(_id: $id) {
      _id
      goalText
      type
      completed
      x
      y
      z
      createdAt
      username
      reminder
      completeDate
      stepCount
      encouragementPoints
      stickers
      steps {
        _id
        createdAt
        username
        stepBody
        completed
      }
      encouragements {
        _id
        points
        username
        message
      }
    }
  }
`

export const QUERY_USER = gql`
  query user($email: String!) {
    user(email: $email) {
      _id
      username
      email
      friendCount
      friends {
        _id
        username
      }
      goals {
        _id
        goalText
        type
        completed
        x
        y
        z
        createdAt
        reminder
        completeDate
        stepCount
        encouragementPoints
        stickers
        steps {
          _id
          createdAt
          username
          stepBody
          completed
        }
        encouragements {
          _id
          points
          username
          message
        }
      }
    }
  }
`

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      friendCount
      goals {
        _id
        goalText
        type
        completed
        x
        y
        z
        createdAt
        reminder
        completeDate
        stepCount
        encouragementPoints
        stickers
        steps {
          _id
          createdAt
          username
          stepBody
          completed
        }
        encouragements {
          _id
          points
          username
          message
        }
      }
      friends {
        _id
        username
      }
    }
  }
`

export const QUERY_ME_BASIC = gql`
  {
    me {
      _id
      username
      email
      friendCount
      friends {
        _id
        username
      }
      goals {
        _id
        goalText
        type
        completed
        x
        y
        z
        createdAt
        stepCount
        encouragementPoints
        stickers
      }
    }
  }
`
