import React, { useState } from 'react';
import { QUERY_ME } from '../utils/queries';
import { useQuery, useMutation } from '@apollo/client';
import { ADD_GOAL } from '../utils/mutations';
import Auth from '../utils/auth';


const GoalsList = (props) => {

    const [formState, setGoal] = useState({ goalText: '', type: '', steps: '' });
    const [addGoal] = useMutation(ADD_GOAL);

    const { loading, data } = useQuery(QUERY_ME);

    const user = data?.me || {};
    //const goal = data?.me.goals || {};

if (loading) {
    return <div>Loading...</div>;
  }
  if (!user?.email) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }
const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!formState) {
      return false;
    }

    const mutationResponse = await addGoal({
      variables: {
        goalText: formState.goalText,
        type: formState.type
      },
    });

    const token = mutationResponse.data.addGoal.token;
    Auth.login(token);
  }
  

  const handleChange = (event) => {
    setGoal({
      ...formState,
      [event.target.name]: event.target.value });
    console.log(event)
  };
//edit goal function

  return (
      <>
        <form onSubmit={handleFormSubmit}>
        <div className="">
          <label htmlFor="goalText">Goal:</label>
          <input
            placeholder="Type your goal here"
            name="goalText"
            type="goalText"
            id="goalText"
            onChange={handleChange}
          />
        </div>
        <div className=''>
        <label htmlFor="type">Goal Type:</label>
          <input
            placeholder="Choose a goal type"
            name="type"
            type="type"
            id="type"
            onChange={handleChange}
          />
           </div>
           <button className="btn d-block w-100" type="submit">
             Submit
          </button>
        </form>
      <div className='list'>   
      <h2>
          {data && user.goal.length
            ? `Viewing ${user.goalsList.length} ${user.goal.length === 1 ? 'goal' : 'goals'}:`
            : 'You have no goals yet!'}
        </h2> 
       {/*  link to single goal */}
         {user.goal.map((goal) => {
         return (
          <ul key= {goal.goalId}>
          <li className='bold'>
          </li>
           </ul>
         )
         })}
      
      </div>
      </>
  );
}

export default GoalsList;