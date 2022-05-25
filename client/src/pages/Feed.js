import React from 'react';
import { useQuery, useMutation } from '@apollo/client'
import { QUERY_GOALS } from '../utils/queries'
import { GIVE_ENCOURAGEMENT } from '../utils/mutations';
import Auth from '../utils/auth'

export default function Feed() {
  const { loading, data } = useQuery(QUERY_GOALS); 
  const [giveEncouragement, { error }] = useMutation(GIVE_ENCOURAGEMENT)
  
  const goals = data?.goals || [];

  const loggedIn = Auth.loggedIn();

  const handleClick = async (id) => {
    console.log(id)
    try {
      await giveEncouragement({
        variables: { goalId: id, points: 1 },
      })
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div>
      {goals.map((goal, i) => (
        <div key={i} className="flex ml-4 mb-3 flex-col">
          <h2>{goal.goalText}</h2>
          {!goal.completed ? 
            <p className="font-hand">Work in progress!</p>
            : <p>All done 🌟</p>
          }
          <p>{goal.username}</p>
          <span>{goal.encouragementCount}{loggedIn && <button className="ml-2" onClick={() => handleClick(goal._id)}>Give Encouragement!</button>}</span>
        </div>
      ))}
    </div>
  )
}
