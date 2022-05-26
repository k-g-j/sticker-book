import React, {useEffect} from 'react'

import { Link } from 'react-router-dom';



function GoalList({ goals }) {
 
  return (
    <div className="card w-full mt-4 flex object-center items-center flex justify-center">
       <ul className="card-header rounded-lg border-8 border-white bg-teal-600 w-1/2 text-center">
         {goals.map((goal) => {
            return (
        <li className="font-bold font-hand text-xl border">
            <Link to={`/goal/${goal._id}` }>
            <h1>{goal.goalText}</h1> 
             </Link>
             <h3 className='font-hand text-lg'> {goal.type} </h3> <br /> 
          </li>
         )})}
        </ul>
    </div>
  )
}

export default GoalList