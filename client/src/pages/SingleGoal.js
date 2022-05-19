import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';

//import stickers from '../assets/stickers'
// import encouragment commponent
//import reminder component
// steps

//steps, encouragement points, sticker up top,
const SingleGoal = () => {
  const { id: goalId} = useParams();

  const { loading, data } = useQuery( QUERY_GOAL, {
    variables: { id: goalId },
});

const goal = data?.goal || {};

if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/profile:username" />;
  }
  
if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="card mb-3">
        <p className="card-header">
          <h1 className="text-teal-500">
              {goal.goalText}
              </h1>
    <div className="card-body">
        <h3>
          {goal.type}
        </h3>
        <ul>
            <li>
                {goal.steps}
            </li>
        </ul>
          <p>{goal.reminder}</p>
        </div>
      </div>
      
    </>
  );
};

export default SingleGoal;