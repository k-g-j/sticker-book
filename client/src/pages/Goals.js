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
 
  const user = data?.me || {}


    // if not logged in, redirect to the login page
    if (!Auth.loggedIn()) {
        return <Navigate to="/login" replace={true}/>
    }

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
      <form className="object-center text-left flex items-center justify-center pt-40" onSubmit={handleFormSubmit}>
        <div className="border-solid p-5 border-white border-8 rounded-lg flex justify-center items-center bg-teal-600">
        <div className="font-hand text-xl text-center p-4">
          <label htmlFor="goalText" className="p-5">Goal:</label>
          <input
            className="font-hand bg-white p-2 rounded-lg text-base text-center"
            placeholder="Type your goal here"
            name="goalText"
            type="goalText"
            id="goalText"
            onChange={handleChange}
          />
        </div>
        <div className="font-hand text-xl text-center px-4">
          <label htmlFor="type" className="px-5">Goal Type:</label>
          <select className="font-hand p-2.5 bg-white rounded-lg text-base text-center"
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
        {goalSubmitted && (
          <div className="font-hand text-center">
            <label htmlFor="stepBody" className="font-hand text-xl text-center px-4">First Step:</label>
            <input className="font-hand text-lg rounded-lg p-2 mx-5"
              placeholder="What's the first step?"
              name="steps"
              type="steps"
              id="steps"
              onChange={(e) => setStep(e.target.value)}
            />
          </div>
        )}
        {!goalSubmitted && (
            <button onClick={handleFormSubmit}
            className="btn border-2 rounded-lg d-block w-100 font-brush text-xl hover:bg-teal-200/50 hover:rounded-lg px-5 text-center">
             Submit
          </button>
        )}
        {goalSubmitted && (
          <div className='flex flex-col'>
            <button
              className="btn border-2 m-3 rounded-lg d-block w-100 font-brush text-xl hover:bg-teal-200/50 hover:rounded-lg px-5 text-center"
              type="button"
              onClick={handleStepSubmit}
            >
              Submit
            </button>
            <button
              className="btn border-2 m-3 rounded-lg d-block w-100 font-brush text-lg hover:bg-teal-200/50 hover:rounded-lg px-5 text-center"
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
        <GoalList className="flex justify-center"goals={user.goals} />
      </div>
    </>
  )
}

export default GoalsList
