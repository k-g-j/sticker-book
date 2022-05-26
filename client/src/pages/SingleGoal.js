import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { useParams } from 'react-router-dom'
import { QUERY_GOAL } from '../utils/queries'
import {
  ADD_STEP,
  COMPLETE_GOAL,
  COMPLETE_STEP,
  DELETE_GOAL,
} from '../utils/mutations'
import Auth from '../utils/auth'
import party from 'party-js'
import { Navigate } from 'react-router-dom';

// import stickers
import artCross from '../assets/stickers/art-cross.png'
import eduBrain from '../assets/stickers/edu-brain.png'
import piggy from '../assets/stickers/finance-piggy.png'
import mentalHealth from '../assets/stickers/mental-health.png'
import physHealth from '../assets/stickers/phys-health.png'

const imageMap = {
  Personal: artCross,
  Educational: eduBrain,
  Financial: piggy,
  'Physical Health': physHealth,
  'Mental Health': mentalHealth,
}

const SingleGoal = () => {
  const { id: goalId } = useParams()

  const { loading, data } = useQuery(QUERY_GOAL, {
    variables: { id: goalId },
  })
  const [completeGoal] = useMutation(COMPLETE_GOAL)
  const [completeStep] = useMutation(COMPLETE_STEP)
  const [deleteGoal] = useMutation(DELETE_GOAL)
  const [addStep] = useMutation(ADD_STEP)
  const [stepState, setStepState] = useState('')

  const user = data?.me || {}
  const goal = data?.goal || {}
  const step = data?.goal || {}

  function Image({ type }) {
    return <img style={{width: "150px" }} src={imageMap[type]} />
  }

  if (Auth.loggedIn() && Auth.getProfile().data.email === useParams) {
  }

  if (loading) {
    return <div className="font-brush">Loading...</div>
  }
  //Party JS click event
const handleClickGoal = (e) => {
    party.sparkles(e.target, {
      count: party.variation.range(20, 40),
    })
    const mutationResponse = completeGoal({
      variables: { goalId },
    })
  }

  const handleDeleteGoal = (e) => {
    party.confetti(e.target, {
      count: party.variation.range(70, 40),
    })
    const mutationResponse = deleteGoal({
      variables: { goalId },
    })
    window.location.replace("/goals")
  }

  // Party JS click event
  // const handleCompleteStep = (e) => {
  //   party.sparkles(e.target, {
  //     count: party.variation.range(20, 40),
  //   })
  //   completeStep({
  //     variables: { goalId},
  //   })
  // }

  const handleAddStep = async (e) => {
    e.preventDefault();
    const mutationResponse = await addStep({
      variables: {
        goalId,
        stepBody: stepState,
      },
    })
  }
  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target
    setStepState({
      ...stepState,
      [name]: value,
    })
  }

    // if not logged in, redirect to the login page
    if (!Auth.loggedIn()) {
        return <Navigate to="/login" replace={true}/>
    }

  return (
    <>
      <div className="card w-full mb-3 flex justify-center">
        <div className="card-header my-24 rounded-lg border-solid border-8 border-white bg-teal-600 w-1/2 text-center object-center">
          <h1 className="font-bold m-5 font-hand text-2xl">{goal.goalText}</h1>
          <div className="card-body items-center object-center flex flex-col justify-center">
            {/* Populate stickers based on goal types */}
            <h2 className='text-center font-hand flex text-xl'>Goal Type: {goal.type}</h2>
             <Image className="items-center flex justify-center"type={goal.type} /> 
          </div>
          <div >
            {goal.steps.map((step, i) => (
              <p className="steps font-hand flex justify-center text-xl" key={i}>  Step {i+1}: {step.stepBody}</p>
            ))}
            {/* <button
              className="btn"
              onClick={(e) => {
                handleCompleteStep(e)
              }}
            >
              {' '}
              Complete Step{' '}
            </button> */}
          </div>
          <div>
            <button
              className="btn m-5 hover:bg-teal-400/50 p-3 text-xl rounded-lg font-hand border"
              onClick={(e) => {
                handleClickGoal(e)
              }}
            >
              {' '}
              Complete Goal{' '}
            </button>{' '}
            
            <button
              className="btn m-5 hover:bg-teal-400/50 p-3 text-xl  rounded-lg font-hand border"
              onClick={(e) => {
                handleDeleteGoal(e)
              }}
            >
              {' '}
              Delete Entire Goal{' '}
            </button>
          </div>
        <div>
          <form className="p-20 " onSubmit={handleAddStep}>
            <div className="font-hand text-xl text-center">
              <label className="m-5" htmlFor="stepBody">Add a step to your goal!</label>
              <input
               className='text-center'
                placeholder="Another step"
                name="stepBody"
                type="stepBody"
                id="stepBody"
                onChange={e => setStepState(e.target.value)}
              />
            </div>
            <div className="card w-full items-center object-center">
            <button className="btn m-5 text-xl hover:bg-teal-400/50 p-3 rounded-lg font-hand border" type="submit">
              Submit New Step
            </button>
            </div>
          </form>
          </div>
      </div>
    </div> 
    </>
  )
}

export default SingleGoal
