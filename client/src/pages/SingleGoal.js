import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';

//steps, encouragement points, sticker up top,
const SingleGoal = () => {
  const { loading, data } = useQuery(QUERY_ME);

  return (
    <>
      <div className='text-light bg-dark'>
        <Container>
          <h1>{goal.goalText}</h1>
        <h2>
          {steps}
        </h2>
       
      </Container>
      </div>
    </>
  );
};

export default SingleGoal;