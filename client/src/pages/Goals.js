import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { useQuery, useMutation } from '@apollo/client';
import { ADD_GOAL } from '../utils/mutations';

import Auth from '../utils/auth';

// import encouragment commponent
//import reminder component


const GoalsList = (props) => {

    const [formState, setFormState] = useState({ goalText: '', type: '', steps: '' });
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
const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await addGoal({
      variables: {
        goalText: formState.goalText,
        type: formState.type
        // steps:  formState.stepBody ,
      },
    });
    const token = mutationResponse.data.addGoal.token;
    Auth.login(token);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
      <>
        <form onSubmit={handleFormSubmit}>
        <div className="flex-row space-between my-2">
          <label htmlFor="firstName">Goal:</label>
          <input
            placeholder="Type your goal here"
            name="goalText"
            type="goalText"
            id="goalText"
            onChange={handleChange}
          />
        </div>
        </form>
      </>
  )
};

export default GoalsList;