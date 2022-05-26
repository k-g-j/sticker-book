import { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { QUERY_GOALS } from '../utils/queries'
import Auth from '../utils/auth'
import Modal from '../components/Modal'
import { idbPromise } from '../utils/idb'

export default function Feed() {
  const { loading, data, error } = useQuery(QUERY_GOALS)

  const [message, setMessage] = useState('')
  const [currentGoal, setCurrentGoal] = useState({})
  const [showModal, setShowModal] = useState(false)
  const [goalsIDB, setGoalsIDB] = useState([])

  let goals = data?.goals || []

  if (error) {
    goals = goalsIDB;
  }

  useEffect(() => {
    if (data) {
      data.goals.forEach((goal) => {
        idbPromise('goals', 'put', goal)
      })
    }
    if (!loading) {
      idbPromise('goals', 'get').then((indexedGoals) => {
        setGoalsIDB(indexedGoals)
      })
    }
  }, [data])

  const loggedIn = Auth.loggedIn()

   const handleSelect = (goal) => {
    setCurrentGoal(goal)
    setShowModal(true)
}

  return (
    <div className="nav-padding flex flex-col justify-center items-center">
      {goals.map((goal, i) => (
        <div
          key={i}
          className="flex w-1/2 ml-4 mb-3 flex-col border-8 border-solid bg-teal-600 rounded-lg p-5"
        >
          <h2 className=" my-1 font-hand text-xl font-bold bg-white p-4 rounded-lg text-center">
            {goal.goalText}
          </h2>
          {!goal.completed ? (
            <p className="my-1 border-2 font-hand text-base text-center p-3 bg-gray-200/50 rounded-lg">
              Status: Work in progress!
            </p>
          ) : (
            <p>Status: All done 🌟</p>
          )}
          <p className="font-hand border-2 text-base text-center p-3 bg-gray-200/50 rounded-lg">
            Username: {goal.username}
          </p>
          
          {goal.encouragements.map((encouragement, i) => (
            <div key={i} className="bg-gray-400/50 border-2 rounded-lg my-1">
              <p className="font-hand text-base text-center p-3">
                {encouragement.message}
              </p>
              <p className="font-hand text-base text-center p-2">
                From: {encouragement.username}
              </p>
            </div>
          ))}
          <div className="flex-wrap flex justify-around mt-3">
            <span className="font-hand text-center flex font-bold text-lg">
              Encouragements: {goal.encouragementCount}
            </span>
            {loggedIn && (
              <button
                className="ml-4 text-base hover:text-lg hover:font-bold border-2 rounded-lg d-block w-100 font-hand hover:bg-teal-200/50 hover:rounded-lg px-5 text-center"
                onClick={() => handleSelect(goal)}
              >
                Give Encouragement!
              </button>
            )}
            </div>
          </div>
      ))}
      {showModal && (
        <Modal
          goal={currentGoal}
          setShowModal={setShowModal}
          showModal={showModal}
          message={message}
          setMessage={setMessage}
        />
      )}
    </div>
  )
}
