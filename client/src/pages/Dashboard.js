import React, { useEffect, useState } from "react";
import { Navigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from "../utils/queries";
import { UPDATE_STICKER } from "../utils/mutations";

import Auth from "../utils/auth";

// import jquery and jquery Ui to use drag and drop functions
import $ from "jquery";
import "jquery-ui-dist/jquery-ui";

import woodBg from "../assets/images/woodtexture.jpeg";

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

    // set paramters to correct positions in case of small width or small height viewports
    let smallWidth = false;
    let smallHeight = false;

    // set most recently dragged goal/sticker to be the current goalId in the state
    // used for linking to the singleGoal when dragged to the drop-zone
    const [currentId, setCurrentId] = useState('');

    // populate goals array in State
    useEffect(() => {
        setGoals(userData.goals);
        console.log(goals);
    }, [userData]);
    
    // populate the stickers 
    // Image based on goal's type
    // Position based on last x, y, z coordinates 
    const populateStickers = (goal) => {

        // checks size of the document, if the page is small or large
        let height = $(document).height();
        let width = $(document).width();
        if (height <= 900) {
            smallHeight = true;
        }
        if (width <= 600) {
            smallWidth = true;
            smallHeight = false;
        }
        
        // checks the type of goal and thus which sticker to use
        let goalType = mentalHealth;
        if (goal.type === 'Physical Health') {goalType = physHealth};
        if (goal.type === 'Financial') {goalType = piggy};
        if (goal.type === 'Educational') {goalType = eduBrain};
        if (goal.type === 'Personal') {goalType = artCross};

        // sets smaller coordinates for small page
        let x = goal.x || 60;
        let y = goal.y || 10;
        let z = goal.z || 0;
        if (smallHeight) {
            x = Math.round(x*9/11);
            y = Math.round(y*9/11);
        }
        if (smallWidth) {
            x = Math.round(x*7/11);
            y = Math.round(y*7/11);
        }

        return (
            <img className="drag w-1/5 cursor-pointer" 
            key={goal._id} data-goalid={goal._id} alt={goal.goalText} 
            src={goalType} 
            style={{
                position: "absolute",
                left: `${x}px`,
                top: `${y}px`,
                zIndex: `${z}`,
            }}/>
        )
    }

    // set handle save function
    const handleSave = async (id, x, y, z) => {
        const token = Auth.loggedIn() ? Auth.getToken() : null;
        if (!token) { return false; }

        // checks size of the document, if the page is small or large
        let height = $(document).height();
        let width = $(document).width();
        if (height <= 900) {
            smallHeight = true;
        }
        if (width <= 600) {
            smallWidth = true;
            smallHeight = false;
        }

        // sets smaller coordinates for small page
        if (smallHeight) {
            x = Math.round(x*11/9);
            y = Math.round(y*11/9);
        }
        if (smallWidth) {
            x = Math.round(x*11/7);
            y = Math.round(y*11/7);
        }
        
        try {
            const {data} = await updateSticker({
                variables: { goalId: id, newX: x, newY: y, newZ: z }
            });
        } catch (err) {
            console.log(err)
        }
    }

    // call drag and drop functions for the class .drag and the id .drop
    useEffect(() => {

        //drag the stickers, limit to the container and have the dragged sticker at the highest z-index in the stack
        $( ".drag" ).draggable({
            containment: ".page", 
            stack: ".drag",
            start: function(event, ui) {
                setDraggingState(true);
                let id = $(this).data('goalid');
                setCurrentId(id);
            },
            stop: function(event, ui) {
                setDraggingState(false);
                let positionInfo = this.style.cssText.split(';');
                let z = parseInt(positionInfo[3].split(' z-index: ')[1]) || 0;
                let x = positionInfo[1].split(' left: ')[1] || 0;
                x = parseInt(x, 10);
                let y = positionInfo[2].split(' top: ')[1] || 0;
                y = parseInt(y, 10);
                console.log(x, " , ", y);
                let id = $(this).data('goalid');
                handleSave(id, x, y, z);
            }
        });
        // recognize when sticker dropped in the dropzone
        // redirect to that goal page
        $( ".drop-zone" ).droppable({
            classes: {
                "ui-droppable-active": "hover-highlight"
            },
            drop: function( event, ui ) {
                window.location.assign(`/goal/${currentId}`);
            }
        })

        // resets the stickers when @media query would change the page size
        $(window).on('resize', () => {
            let height = $(document).height();
            let width = $(document).width();
            if (height = 900) {
                window.location.reload();
            }
            if (width = 600) {
                window.location.reload();
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
                className="dashboard-container flex flex-col justify-around items-center w-screen h-screen bg-cover p-5"
                style={{
                    backgroundImage: `url(${woodBg})`,
                }}
            >
                <h1 className="dashboard-header text-2xl font-bold font-brush">
                    Hey {userData.username}! Here's Your Sticker Collection!
                </h1>

                <div className="page color-teal-500">
                    {loading &&
                        <h1 className="font-hand text-center m-5">Loading...</h1>
                    }
                    {/* Populate stickers based on goal types */}
                    {userData.goals?.map((goal) => {
                        return (
                            populateStickers(goal)
                        )
                    })}

                    {/* if no goals exist  */}
                    {(!goalLength > 0 && !loading) &&
                        <h1 className="font-hand text-center m-5">Add some Goals!</h1>
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
            </div>
        </section>
    )
}

export default Dashboard;