import React, { useState } from 'react'
import { QUERY_ME, QUERY_GOALS } from '../utils/queries'
import { useQuery, useMutation } from '@apollo/client'
import { ADD_GOAL } from '../utils/mutations'

import Auth from '../utils/auth'
import GoalList from '../components/GoalList'

// import encouragment commponent
//import reminder component

const GoalsList = (props) => {
  const [formState, setFormState] = useState({
    goalText: '',
    type: '',
    steps: '',
  })
  const [addGoal] = useMutation(ADD_GOAL)

  const { loading, data } = useQuery(QUERY_ME)

  const user = data?.me || {}


  if (loading) {
    return <div>Loading...</div>
  }
  if (!user?.email) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    )
  }
  const handleFormSubmit = async (event) => {
    event.preventDefault()
    const mutationResponse = await addGoal({
      variables: {
        goalText: formState.goalText,
        type: formState.type,
        steps: formState.stepBody,
      },
    })
    const token = mutationResponse.data.addGoal.token
    Auth.login(token)
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormState({
      ...formState,
      [name]: value,
    })
  }
  //edit goal function


  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <div className="">
          <label htmlFor="goalText">Goal:</label>
          <input
            placeholder="Type your goal here"
            name="goalText"
            type="goalText"
            id="goalText"
            onChange={handleChange}
          />
        </div>
        <div className="">
          <label htmlFor="type">Goal Type:</label>
          <input
            placeholder="Type your goal here"
            name="type"
            type="type"
            id="type"
            onChange={handleChange}
          />
        </div>
      </form>

      <div>
        {user.goals.map((goal, i) => (
          <GoalList goal={goal} key={i} />
        ))}
      </div>
    </>
  )
}

export default GoalsList
