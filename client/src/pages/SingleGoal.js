import React from 'react';
import { useQuery } from '@apollo/client';
//import { QUERY_ME } from '../utils/queries';

//import stickers from '../assets/stickers'
// import encouragment commponent
//import reminder component
// steps

//steps, encouragement points, sticker up top,
const SingleGoal = () => {
//   const { id: goalId} = useParams();

//   const { loading, data } = useQuery( QUERY_GOAL, {
//     variables: { id: goalId },
// });

// const goal = data?.goal || {};

// if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
//     return <Nav to="/profile:username" />;
//   }
  
// if (loading) {
//     return <div>Loading...</div>;
//   }

  return (
    <>
      <div className="card mb-3">
        <div className="card-header">
          <h1 className="text-teal-500">
              Goal Text like running a marathon
              </h1>
    <div className="card-body">
        <h3>
          {/* {goal.type} */}
           Mental Health
        </h3>
        <ul>
            <li>
                Step 1
            </li>
        </ul>
          <p>
            {/* {goal.reminder}  */}
            You Got this!
          </p>
        </div>
      </div>
      </div>
    </>
  );
};

export default SingleGoal;