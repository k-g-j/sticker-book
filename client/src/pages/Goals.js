import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { useQuery, useMutation } from '@apollo/client';
import { ADD_GOAL } from '../utils/mutations';
import Auth from '../utils/auth';

//import stickers from '../assets/stickers'
// import encouragment commponent
//import reminder component

const GoalsList = (props) => {
    const { username: userParam } = useParams();

    const [addGoal] = useMutation(ADD_GOAL);
    const { loading, data } = useQuery(userParam ?  QUERY_ME {
      variables: { username: userParam, goals: goalId },
    });

    const user = data?.me || data?.goals || {};

if (loading) {
    return <div>Loading...</div>;
  }
  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  const handleClick = async () => {
    try {
      await addGoal({
        
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
      <>
      </>
  )
};

export default GoalsList;