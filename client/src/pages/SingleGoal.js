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
    return <img src={imageMap[type]} />
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

  // party.resolvableShapes["hands"] = `<img src="${hands}"/>`;
  // Party JS click event
  // const handleCompleteStep = (e) => {
  //   //       party.confetti(e.target, {
  //   //       shapes: ["hands"],
  //   //       speed: party.variation.range(60,80)
  //   //     });
  //   // }
  //   party.sparkles(e.target, {
  //     count: party.variation.range(20, 40),
  //   })
  //   completeStep({
  //     variables: { goalId},
  //   })
  // }

  const handleAddStep = async (e) => {
    const mutationResponse = await addStep({
      variables: {
        goalId,
        stepBody: stepState,
      },
    })
  }
  const handleChange = (event) => {
    event.preventDefault()
    const { name, value } = event.target
    setStepState({
      ...stepState,
      [name]: value,
    })
  }

  return (
    <>
      <div className="card mb-3 nav-padding">
        <div className="card-header border-solid border-8 border-white bg-teal-600 w-1/3 text-center">
          <h1 className="font-bold font-hand text-xl">{goal.goalText}</h1>
          <div className="card-body">
            {/* Populate stickers based on goal types */}
            <h2 className="">{goal.type}</h2>
            {/* <Image type={goal.type} /> */}
          </div>
          <div className="steps">
            {goal.steps.map((step, i) => (
              <p key={i}>{step.stepBody}</p>
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
              className="btn hover:bg-teal-400/50 p-1 rounded-lg font-hand"
              onClick={(e) => {
                handleClickGoal(e)
              }}
            >
              {' '}
              Complete Goal{' '}
            </button>{' '}
            <br />
            <button
              className="btn hover:bg-teal-400/50 p-1 rounded-lg font-hand"
              onClick={(e) => {
                handleDeleteGoal(e)
              }}
            >
              {' '}
              Delete Entire Goal{' '}
            </button>
          </div>
        </div>
        <div>
          <form className="p-20 " onSubmit={handleAddStep}>
            <div className="">
              <label htmlFor="stepBody">Add a step to your goal!</label>
              <input
                placeholder="Type your step here"
                name="stepBody"
                type="stepBody"
                id="stepBody"
                onChange={e => setStepState(e.target.value)}
              />
            </div>
            <button className="btn border-black w-100" type="submit">
              Submit New Step
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default SingleGoal