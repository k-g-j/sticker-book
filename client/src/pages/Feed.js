import { useState } from 'react';
import { useQuery } from '@apollo/client'
import { QUERY_GOALS } from '../utils/queries'
import Auth from '../utils/auth'
import Modal from '../components/Modal';

export default function Feed() {
  const { loading, data } = useQuery(QUERY_GOALS); 
  
  const [message, setMessage] = useState('');
  const [currentGoal, setCurrentGoal] = useState({});
  const [showModal, setShowModal] = useState(false);
  
  const goals = data?.goals || [];

  const loggedIn = Auth.loggedIn();

  const handleSelect = goal => {
    setCurrentGoal(goal)
    setShowModal(true)
  }

  return (
    <div>
      {goals.map((goal, i) => (
        <div key={i} className="flex ml-4 mb-3 flex-col">
          <h2>{goal.goalText}</h2>
          {!goal.completed ? 
            <p>Work in progress!</p>
            : <p>All done 🌟</p>
          }
          <p>{goal.username}</p>
          {goal.encouragements.map((encouragement, i) => (
            <div key={i}>
              <p>{encouragement.message}</p>
              <p>From: {encouragement.username}</p>
          </div>
          ))}
          <span>{goal.encouragementCount}
            {loggedIn &&
              <button className="ml-2"
                onClick={() => handleSelect(goal)}>
                Give Encouragement!</button>}
          </span>
        </div>
      ))}
      {showModal && <Modal goal={currentGoal} setShowModal={setShowModal} showModal={showModal} message={message} setMessage={setMessage} />}
    </div>
  )
}
