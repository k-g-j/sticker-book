import React, { useState, useEffect } from 'react'
import { QUERY_ME, QUERY_GOALS } from '../utils/queries'
import { useQuery, useMutation } from '@apollo/client'
import { ADD_GOAL, ADD_STEP } from '../utils/mutations'
import { Navigate } from 'react-router-dom'
import { idbPromise } from '../utils/idb'

import Auth from '../utils/auth'
import GoalList from '../components/GoalList'

const GoalsList = (props) => {
  const [formState, setFormState] = useState({
    goalText: '',
    type: 'Physical Health',
  })
  const [goalSubmitted, setGoalSubmitted] = useState(false)
  const [currentGoal, setCurrentGoal] = useState('')

  const [step, setStep] = useState('')

  const [addGoal] = useMutation(ADD_GOAL)

  const [addStep] = useMutation(ADD_STEP)

  const { loading, data } = useQuery(QUERY_ME)
  // const [allGoalsState, setAllGoalsState] = useState([])
  const user = data?.me || {}
  //pass the state through the goallist as a prop through when a new
  //goal is added then we will have to update the state with that new goal

  //   useEffect(() => {
  //     setAllGoalsState(user.goals);
  // }, [user]);

  if (loading) {
    return <div>Loading...</div>
  }

  const handleFormSubmit = async (event) => {
    console.log(formState)
    event.preventDefault()
    const {data } = await addGoal({
      variables: {
        goalText: formState.goalText,
        type: formState.type,
      },
    })
    setGoalSubmitted(true)
    setCurrentGoal(data.addGoal._id)
    idbPromise('goals', 'put',  data.addGoal)
  }

  const handleStepSubmit = async (event) => {
    event.preventDefault()
    console.log(step)
    const mutationResponse = await addStep({
      variables: {
        goalId: currentGoal,
        stepBody: step,
      },
    })
    setStep('')
  }

  const handleDone = async () => {
    window.location.reload()
  }

  const handleChange = (event) => {
    event.preventDefault()
    const { name, value } = event.target
    setFormState({
      ...formState,
      [name]: value,
    })
  }

  if (!Auth.loggedIn()) {
    return <Navigate to="/login" replace={true} />
  }

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
          <select
            value={formState.type}
            onChange={(e) =>
              setFormState({ ...formState, type: e.target.value })
            }
          >
            <option value="Physical Health">Physical Health</option>
            <option value="Mental Health">Mental Health</option>
            <option value="Financial">Financial</option>
            <option value="Personal">Personal</option>
            <option value="Educational">Educational</option>
          </select>
          </div>
          {/* Submit Button */}
          {goalSubmitted && (
          <div>
            <label htmlFor="stepBody">First Step:</label>
              <input
              placeholder="What's the first step?"
              name="steps"
              type="steps"
              id="steps"
              onChange={(e) => setStep(e.target.value)}
            />
          </div>
          )}
          {!goalSubmitted && (
           <button className="btn d-block w-100" type="button" onClick={handleFormSubmit}
           class="font-brush text-xl hover:bg-teal-200/50 hover:rounded-lg p-4 text-center">
             Submit
          </button>
          )}
          {goalSubmitted && (
          <div className='flex flex-col'>
            <button
              className="btn d-block w-100"
              type="button"
              onClick={handleStepSubmit}
            >
              Submit
            </button>
            <button
              className="btn d-block w-100"
              type="button"
              onClick={handleDone}
            >
              All done!
            </button>
          </div>
          )}
          </div>
        </form>
        <div className="list">
        <GoalList goals={user.goals} />
        </div>
    </>
  )
}

export default GoalsList
