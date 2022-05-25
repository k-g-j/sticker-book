import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client'
import { QUERY_GOALS } from '../utils/queries'
import Auth from '../utils/auth'
import Modal from '../components/Modal';

export default function Feed() {
  const { loading, data } = useQuery(QUERY_GOALS); 
  const [message, setMessage] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [goalsList, setGoals] = useState([]);
  
  const goals = data?.goals || [];

  const loggedIn = Auth.loggedIn();

  useEffect(() => {
    setGoals(goals)
  }, [goals])



  return (
    <div>
      {goalsList.map((goal, i) => (
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
          </div>
          ))}
          <span>{goal.encouragementCount}{loggedIn && <button className="ml-2" onClick={() => setShowModal(true)}>Give Encouragement!</button>}</span>
          {showModal && <Modal id={goal._id} setShowModal={setShowModal} showModal={showModal} message={message} setMessage={setMessage} />}
        </div>
      ))}
        <input
                  type="text"
                  placeholder="friendly message here..."
                  value={message}
                  className="h-10 pl-2 color-black"
                  onChange={(e) => setMessage(e.target.value)}
                />
    </div>
  )
}
