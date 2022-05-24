import React, {useEffect} from 'react'
import { QUERY_ME, QUERY_GOALS } from '../utils/queries'
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@apollo/client'


function GoalList({ goal }) {
  const { data } = useQuery(QUERY_ME)
 const user = data?.me || {}
 const { id: goalId } = useParams();
 const path = `/goal/${goalId}`;


  return (
    <div>
      
      <ul >
        <li>
           {user.goals.map(item => { return (
         <Link path={`/goal/${item.id}`} className="text-light" >
                    <h1 className="m-0">{goal.goalText}</h1>

            <h1>{goal._id}</h1> <br /> 
             <h3> {goal.type} </h3> <br /> 
             <p> {goal.completeGoal} </p> <br /> 
       </Link>
       )})}
          </li>
        </ul>
    </div>
  )
}

export default GoalList