import React, { useEffect, useState } from "react";
import { Navigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from "../utils/queries";
import { UPDATE_STICKER } from "../utils/mutations";
import Draggable from 'react-draggable';

import Auth from "../utils/auth";
// import { fortunes } from "../lib/fortunes"

// import jquery and jquery Ui to use drag and drop functions
import $ from "jquery";
import "jquery-ui-dist/jquery-ui";
// import "jquery-ui-touch-punch";

import woodBg from "../assets/images/woodtexture.jpeg"
import page from '../assets/images/page.png'

// import stickers
import artCross from "../assets/stickers/art-cross.png";
import eduBrain from "../assets/stickers/edu-brain.png";
import piggy from "../assets/stickers/finance-piggy.png";
import mentalHealth from "../assets/stickers/mental-health.png";
import physHealth from "../assets/stickers/phys-health.png";

const Dashboard = () => {

    const { loading, data } = useQuery(QUERY_ME);
    const [updateSticker] = useMutation(UPDATE_STICKER);
    // set goals array as State
    const [goals, setGoals] = useState([]);
    // set sticker dragging as State
    const [draggingState, setDraggingState] = useState(false);

    const userData = data?.me || {}

    // set stickers array based on goals array types, if undefined, set to 0.
    const goalLength = userData.goals?.length || 0;

    // populate goals array in State
    useEffect(() => {
        setGoals(userData.goals);
        console.log(goals);
    }, [userData]);
    
    // populate the stickers 
    // Image based on goal's type
    // Position based on last x, y, z coordinates 
    const populateStickers = (goal) => {
        let goalType = mentalHealth;
        if (goal.type === 'Physical Health') {goalType = physHealth};
        if (goal.type === 'Financial') {goalType = piggy};
        if (goal.type === 'Educational') {goalType = eduBrain};
        if (goal.type === 'Personal') {goalType = artCross};

        return (
            <img className="drag w-1/5 cursor-pointer" 
            key={goal._id} data-goalid={goal._id} alt={goal.goalText} 
            src={goalType} 
            style={{
                position: "absolute",
                left: `${goal.x}px`,
                top: `${goal.y}px`,
                zIndex: `${goal.z}`,
            }}/>
        )
    }

    // set handle save function
    const handleSave = async (id, x, y, z) => {
        const token = Auth.loggedIn() ? Auth.getToken() : null;
        if (!token) { return false; }
    
        
        try {
            const {data} = await updateSticker({
                variables: { goalId: id, newX: x, newY: y, newZ: z }
            });
        } catch (err) {
            console.log(err)
        }
    }

    const handleDragStart = (event) => {
        
    }

    const handleSaveBtn = (event) => {
        // const token = Auth.loggedIn() ? Auth.getToken() : null;
        // if (!token) { return false; }
    
        console.log("saved!")
        goals.map((goal) => {
            return(
                handleSave(goal)
            )
        })
    }

    // call drag and drop functions for the class .drag and the id .drop
    useEffect(() => {
        // get container height and width
        const maxWidth = $(".container").width();
        const maxHeight = $(".container").height();

        //drag the stickers, limit to the container and have the dragged sticker at the highest z-index in the stack
        $( ".drag" ).draggable({
            containment: ".page", 
            stack: ".drag",
            start: function(event, ui) {
                setDraggingState(true);
                
            },
            stop: function(event, ui) {
                setDraggingState(false);
                let positionInfo = this.style.cssText.split(';');
                let z = parseInt(positionInfo[3].split(' z-index: ')[1]);
                let x = positionInfo[1].split(' left: ')[1];
                x = parseInt(x, 10);
                let y = positionInfo[2].split(' top: ')[1];
                y = parseInt(y, 10);
                let id = $(this).data('goalid');
                handleSave(id, x, y, z);
                
                // let tempGoals = [];
                // tempGoals = goals;
                // console.log(tempGoals);
                // const index = tempGoals.findIndex(goal => goal._id = id);
                // let tempGoal = {...tempGoals[index]};
                // tempGoal.x = x;
                // tempGoal.y = y;
                // tempGoal.z = z;
                // tempGoals[index] = tempGoal;
                // this.setGoals({tempGoals});
            }
        });
        // recognize when sticker dropped in the dropzone
        // redirect to that goal page
        $( ".drop-zone" ).droppable({
            classes: {
                "ui-droppable-active": "hover-highlight"
            },
            drop: function( event, ui ) {
                console.log("dropped in the dropzone!");
            }
        })
    })

    // if not logged in, redirect to the login page
    if (!Auth.loggedIn()) {
        return <Navigate to="/login" replace={true}/>
    }

    return (
        <section>
            <div
                className="flex flex-col justify-center items-center w-screen h-screen bg-cover -center m-0"
                style={{
                    backgroundImage: `url(${woodBg})`,
                }}
            >
                <h1 className="m-5 text-3xl font-bold font-brush">
                    Hey {userData.username}! Here's Your Collection!
                </h1>

                <div className="page color-teal-500" 
                style={{
                    backgroundImage: `url(${page})`,
                }}>
                    {loading &&
                        <h1>Loading...</h1>
                    }
                    {/* Populate stickers based on goal types */}
                    {userData.goals?.map((goal) => {
                        return (
                            <Draggable
                                bounds="parent"
                            >
                                {populateStickers(goal)}
                            </Draggable>
                        )
                    })}

                    {(!goalLength > 0 && !loading) &&
                        <h1>Add some Goals!</h1>
                    }

                    {/* Dragging Dropzone */}
                    {draggingState ? 
                        <div className="drop-zone absolute w-5/6 h-36 bottom-2.5 rounded-3xl text-center border-2 border-black border-dashed" 
                            style={{
                            transition: "border .2s ease"
                            }}
                        > 
                        <h3>View This Goal?</h3> 
                        </div>
                        :
                        <div className="drop-zone absolute w-5/6 h-36 bottom-2.5 rounded-3xl text-center border-0 border-black border-dashed" 
                            style={{
                            transition: "border .2s ease"
                            }}
                        > 
                        </div>
                    }
                </div>    
                <button className="sticker-shadow bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-4 border-8 border-white border-solid rounded"
                    onClick={handleSaveBtn}
                >
                    Save Your Stickers!
                </button>   
            </div>
        </section>
    )
}

export default Dashboard;