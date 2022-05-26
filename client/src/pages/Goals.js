import React, { useState } from 'react'
import { QUERY_ME, QUERY_GOALS } from '../utils/queries'
import { useQuery, useMutation } from '@apollo/client'
import { ADD_GOAL } from '../utils/mutations'
// import party from "party-js";
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
    return <div class="font-brush text-2xl"> Loading...</div>;
  }
  if (!user?.email) {
    return (
      <h4 class="p-40 font-hand text-center text-lg">
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
  // edit goal function
  // party.confetti(runButton, {
  //   count: party.variation.range(20, 40)

// });

  return (
    <>
      <form onSubmit={handleFormSubmit} class="object-center text-left flex items-center justify-center pt-40">
        {/* Master Goals Box */}
        <div className="border-solid p-5 border-white border-8 rounded-lg flex justify-center items-center bg-teal-600">
        {/* Goal */}
        <div className="font-hand text-xl text-center">
          <label htmlFor="goalText" className="p-5">Goal:</label>
          <input className="font-hand p-2 rounded-lg text-base text-center"
            placeholder="Type your goal here"
            name="goalText"
            type="goalText"
            id="goalText"
            onChange={handleChange}
          />
        </div>
        {/* Goal Type */}
        <div className="font-hand text-xl text-center">
          <label htmlFor="type" className="p-5">Goal Type:</label>
          <input class="font-hand text-base p-2 rounded-lg text-center"
            placeholder="Choose a goal type"
            name="type"
            type="type"
            id="type"
            onChange={handleChange}
          />
          {/* Submit Button */}
           </div>
           <button className="btn d-block w-100" type="submit" 
           class="font-brush text-xl hover:bg-teal-200/50 hover:rounded-lg p-4 text-center">
             Submit
          </button>
          </div>
        </form>
      <div className='list'>   
        {/*  link to single goal */}
       <ul> {user.goals.map((goal, i) => (
            <li key= {i} >{goal.goalText}
            </li>
         )
         )}
      </ul>
      </div>
    </>
  )
}

export default GoalsList
