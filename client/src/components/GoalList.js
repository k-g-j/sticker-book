import React, {useEffect} from 'react'

import { Link } from 'react-router-dom';



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