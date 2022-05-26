import React, {useEffect} from 'react'
import { QUERY_ME, QUERY_GOALS } from '../utils/queries'
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@apollo/client'
function GoalList({ goals }) {
  return (
    <div>
       <ul >
         {goals.map((goal) => {
            return (
        <li>
            <Link to={`/goal/${goal._id}` }>
            <h1>{goal.goalText}</h1>
             </Link>
             <h3> {goal.type} </h3> <br />
             <p> {goal.completeGoal} </p> <br />
          </li>
         )})}
        </ul>
    </div>
  )
}
export default GoalList