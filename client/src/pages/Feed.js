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
    <div class="p-12">
      {goals.map((goal, i) => (
        <div class="p-6">
        <div key={i} className="flex ml-4 mb-3 flex-col" class="border-8 border-solid rounded-lg p-5">
          <h2 class="font-hand text-xl font-bold bg-white p-4 rounded-lg text-center">{goal.goalText}</h2>
          {!goal.completed ? 
            <p className="font-hand text-base text-center">Work in progress!</p>
            : <p>All done 🌟</p>
          }
          <p class="font-brush text-base font-medium">{goal.username}</p>
          <span class="font-hand font-bold text-xl">{goal.encouragementCount}{loggedIn && <button className="ml-2" class="text-base hover:text-lg hover:font-bold" onClick={() => handleClick(goal._id)}>Give Encouragement!</button>}</span>
        </div>
        </div>
      ))}
    </div>
  )
}
