import React, {useEffect} from 'react'

import { Link } from 'react-router-dom';



function GoalList({ props }) {
 
  return (
    <div>
       <ul >
         {props.goals.map((goal) => {
            return (
        <li>
            <Link to={`/goal/${goal.goalId}` }>
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