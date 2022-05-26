import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { QUERY_GOALS } from '../utils/queries'
import Auth from '../utils/auth'
import Modal from '../components/Modal'

export default function Feed() {
  const { loading, data } = useQuery(QUERY_GOALS)

  const [message, setMessage] = useState('')
  const [currentGoal, setCurrentGoal] = useState({})
  const [showModal, setShowModal] = useState(false)

  const goals = data?.goals || []

  const loggedIn = Auth.loggedIn()

  const handleSelect = (goal) => {
    setCurrentGoal(goal)
    setShowModal(true)
  }

  return (
    <div class="p-10">
      {goals.map((goal, i) => (
        <div key={i} className="flex ml-4 mb-3 flex-col border-8 border-solid rounded-lg p-5">
          <h2 className="font-hand text-xl font-bold bg-white p-4 rounded-lg text-center">{goal.goalText}</h2>
          {!goal.completed ? <p className="font-hand text-base text-center p-3 bg-gray-200/50 rounded-lg">Status: Work in progress!</p> : <p>Status: All done 🌟</p>}
          <p className="font-brush text-lg text-center p-3 bg-gray-200/20 rounded-lg">{goal.username}</p>
          {goal.encouragements.map((encouragement, i) => (
            <div key={i}>
              <p className="font-hand text-base text-center bg-gray-200/10 rounded-lg p-2">{encouragement.message}</p>
              <p className="font-hand text-base text-xs font-bold text-center">From: {encouragement.username}</p>
            </div>
          ))}
          <div>
            <span className="font-hand font-bold text-xl">
              Encouragements: {goal.encouragementCount}
            </span>
            {loggedIn && (
              <button className="ml-4 text-base hover:text-lg hover:font-bold" onClick={() => handleSelect(goal)}>
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
