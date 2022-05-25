import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { QUERY_GOAL } from '../utils/queries';
import { COMPLETE_GOAL, COMPLETE_STEP } from '../utils/mutations';
import Auth from '../utils/auth';
import party from 'party-js';

// import stickers
import artCross from "../assets/stickers/art-cross.png";
import eduBrain from "../assets/stickers/edu-brain.png";
import piggy from "../assets/stickers/finance-piggy.png";
import mentalHealth from "../assets/stickers/mental-health.png";
import physHealth from "../assets/stickers/phys-health.png";


const SingleGoal = () => {
  const { id: goalId, stepId } = useParams();
  
  const { loading, data } = useQuery( QUERY_GOAL, {
    variables: { goalId },
  });
  const [completeGoal] = useMutation(COMPLETE_GOAL);
  const [completeStep] = useMutation(COMPLETE_STEP);

const user = data?.me || {}

if (Auth.loggedIn() && Auth.getProfile().data.email === useParams) {
    
  }
  
if (loading) {
    return <div>Loading...</div>;
  }

  //Party JS click event
  const handleClickGoal = (e) => {
    party.sparkles(e.target, {
      count: party.variation.range(20,40)
    })
 const mutationResponse = completeGoal({
  variables: { goalId }
  })
};

//Party JS click event
const handleClickStep = (e) => {
  party.sparkles(e.target, {
    count: party.variation.range(20,40)
  })
  completeStep( {
          variables : {goalId, stepId},
        });
      // } catch (err) {
      //   console.error(err);
      
    console.log(stepId)
  
};

  return (
    <>
      <div className="card mb-3 nav-padding">
        <div className="card-header">
          <h1 className="text-teal-500">
       <ul> 
         {data.goal}

         </ul>
              </h1>
     <div className="card-body">
       <img className="drag" src={artCross} style={{position: "absolute"}} alt=''/>
                    <img className="drag" src={eduBrain} style={{position: "absolute"}}alt=''/>
                    <img className="drag" src={piggy} style={{position: "absolute"}}alt=''/>
                    <img className="drag" src={mentalHealth} style={{position: "absolute"}}alt=''/>
                    <img className="drag" src={physHealth} style={{position: "absolute"}}alt=''/> */}
         {/* Populate stickers based on goal types */}
                if (data.type === 'Physical Health') {
                     (
                        <img className="drag" key={goal._id} data-goalid={goal._id} data-goal={goal.goalText} src={physHealth}/>
                    )
                }
                if (data.type === 'Mental Health') {
                     (
                        <img className="drag" key={goal._id} data-goalid={goal._id} data-goal={goal.goalText} src={mentalHealth}/>
                    )
                }
                if (data.type === 'Financial') {
                     (
                        <img className="drag" key={goal._id} data-goalid={goal._id}  data-goal={goal.goalText} src={piggy}/>
                    )
                }
                if (data.type === 'Educational') {
                     (
                        <img className="drag" key={goal._id} data-goalid={goal._id}  data-goal={goal.goalText} src={eduBrain}/>
                    )
                }
                if (data.type === 'Personal') {
                     (
                        <img className="drag" key={goal.goalId} data-goalid={goal._id}  data-goal={goal.goalText} src={artCross} />
                    )
                }
               
           <div>
        <ul>
            <li>
                {data.steps}
            </li>
        </ul>
        <button className='btn' onClick={(e) => {
          handleClickStep(e);
        }} 
        > Complete Step </button>
        </div>
       
        <button className='btn' onClick={(e) => {
          handleClickGoal(e);
        }} 
        > Complete Goal </button>
      </div>
      </div>
    </>
  );
};

export default SingleGoal;