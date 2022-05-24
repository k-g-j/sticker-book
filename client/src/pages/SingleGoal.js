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
  const { id: goalId } = useParams();
  const { id: stepId } = useParams();

  const { loading, data } = useQuery( QUERY_GOAL, {
    variables: { id: goalId },
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
    party.confetti(e.target, {
      count: party.variation.range(20,40)
    });
 const mutationResponse = completeGoal({
  variables: { goalId }
  },
})
  };

// const handleCompleteGoal = async (goalId) => {
//   const token = Auth.loggedIn() ? Auth.getToken() : null;

//   if (!token) {
//     return false;
//   }

//   try {
//     await completeGoal( {
//       variables : {goalId},
//     });

   
//   } catch (err) {
//     console.error(err);
//   }
//    };

//Party JS click event
const handleClickStep = (e) => {
  party.confetti(e.target, {
    count: party.variation.range(20,40)
  });
  // handleCompleteStep();
};

// const handleCompleteStep = async (goalId) => {
//   const token = Auth.loggedIn() ? Auth.getToken() : null;

//   if (!token) {
//     return false;
//   }

//   try {
//     await completeStep( {
//       variables : {goalId, stepId},
//     });
//   } catch (err) {
//     console.error(err);
//   }
// };
  return (
    <>
      <div className="card mb-3">
        <div className="card-header">
          <h1 className="text-teal-500">
       <ul> {user.goals.map((goal, i) => (
            <li key= {i} >{goal.goalText}
            </li>
         )
         )}
         </ul>
              </h1>
    <div className="card-body">
        <h3>
          {user.goal.type}
           Mental Health
        </h3>
        <img className="drag" src={artCross} style={{position: "absolute"}} alt=''/>
                    <img className="drag" src={eduBrain} style={{position: "absolute"}}alt=''/>
                    <img className="drag" src={piggy} style={{position: "absolute"}}alt=''/>
                    <img className="drag" src={mentalHealth} style={{position: "absolute"}}alt=''/>
                    <img className="drag" src={physHealth} style={{position: "absolute"}}alt=''/>
         {/* Populate stickers based on goal types */}
         {user.goals?.map((goal) => {
                if (goal.type === 'Physical Health') {
                    return (
                        <img className="drag" key={goal._id} data-goalid={goal._id} data-goal={goal.goalText} src={physHealth}/>
                    )
                }
                if (goal.type === 'Mental Health') {
                    return (
                        <img className="drag" key={goal._id} data-goalid={goal._id} data-goal={goal.goalText} src={mentalHealth}/>
                    )
                }
                if (goal.type === 'Financial') {
                    return (
                        <img className="drag" key={goal._id} data-goalid={goal._id}  data-goal={goal.goalText} src={piggy}/>
                    )
                }
                if (goal.type === 'Educational') {
                    return (
                        <img className="drag" key={goal._id} data-goalid={goal._id}  data-goal={goal.goalText} src={eduBrain}/>
                    )
                }
                if (goal.type === 'Personal') {
                    return (
                        <img className="drag" key={goal.goalId} data-goalid={goal._id}  data-goal={goal.goalText} src={artCross} />
                    )
                }
                return;
          } )}
        </div>
        <div>
        <ul>
            <li>
                {user.goal.step} Step 1
            </li>
        </ul>
        <button onclick={handleClickStep} type='click'> Complete Step </button>
        </div>
        <div>
          <p>
            {user.goal.reminder} 
            You Got this!
          </p>
        </div>
        <button onclick={handleClickGoal} type='click'>Complete Goal</button>
      </div>
      </div>
    </>
  );
};

export default SingleGoal;