import React, { useEffect, useState } from "react";

import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME, QUERY_USER, QUERY_GOALS } from "../utils/queries";
import { UPDATE_STICKER } from "../utils/mutations";


import Auth from "../utils/auth";
// import { fortunes } from "../lib/fortunes"

// import jquery and jquery Ui to use drag and drop functions
import $ from "jquery";
import "jquery-ui-dist/jquery-ui";

// import stickers
import artCross from "../assets/stickers/art-cross.png";
import eduBrain from "../assets/stickers/edu-brain.png";
import piggy from "../assets/stickers/finance-piggy.png";
import mentalHealth from "../assets/stickers/mental-health.png";
import physHealth from "../assets/stickers/phys-health.png";

const Dashboard = () => {

    // get user profile data
    const { loading, error, data } = useQuery(QUERY_ME);
    const [updateSticker] = useMutation(UPDATE_STICKER);

    const userData = data?.me || {}
    // console.log(userData);

    // set stickers array based on goals array types, if undefined, set to 0.
    const goalLength = userData.goals?.length || 0;

    // set sticker dragging as State
    const [draggingState, setDraggingState] = useState(false);

    let stickerArr = userData.goals || [];

    const handleSave = async (id, x, y, z) => {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }

        // let positionInfo = this.style.cssText.split('z-index: ')[1].split(';');
        // let z = positionInfo[0].trim();
        // let x = positionInfo[1].split(' left: ')[1];
        // let y = positionInfo[2].split(' top: ')[1];
    
        try {
    
            const {data} = await updateSticker({
            variables: { goalId: id, newX: x, newY: y, newZ: z }
            });
    
            console.log(data);

        } catch (err) {
            console.log(err)
        }
    }

    // call drag and drop functions for the class .drag and the id .drop
    useEffect(() => {
        // get container height and width
        const maxWidth = $(".container").width();
        const maxHeight = $(".container").height();

        //drag the stickers, limit to the container and have the dragged sticker at the highest z-index in the stack
        $( ".drag" ).draggable({
            containment: ".container", 
            stack: ".drag",
            start: function(event, ui) {
                setDraggingState(true);
                
            },
            stop: function(event, ui) {
                setDraggingState(false);
                let positionInfo = this.style.cssText.split('z-index: ')[1].split(';');
                let z = parseInt(positionInfo[0].trim());
                let x = positionInfo[1].split(' left: ')[1];
                x = parseInt(x, 10);
                let y = positionInfo[2].split(' top: ')[1];
                y = parseInt(y, 10);
                let id = $(this).data('goalid');
                console.log("z-index:", z);
                console.log("left: ", x);
                console.log("top: ", y);
                console.log("data-goalid: ",$(this).data('goalid'));
                // console.log("data-goal: ",$(this).data('goal'));
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
                console.log("dropped in the dropzone!");
            }
        })
    })

    return (
        <section>
            <div style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <h1 class="font-hand text-lg">
                    Hey {userData.username}! Here's Your Collection!
                </h1>
                {Auth.loggedIn() ? (
                    <h1 class="font-hand text-base">Logged in!</h1>
                ) : (
                    <h1 class="font-hand text-base">Logged out!</h1>
                )}
                <div className="container flex flex-col justify-center items-center color-teal-500" 
                style={{
                    display: "block",
                    position: "relative",
                    border: "3px solid black",
                    width: "500px",
                    height: "647px",
                    backgroundColor: "whitesmoke",
                    padding: "10px",
                    borderRadius: "15px",
                }}>

                    {/* Default Stickers */}
                    {/* <img className="drag" data-goalid="artwow" src={artCross} style={{position: "absolute"}}/>
                    <img className="drag" data-goalid="brainwow" src={eduBrain} style={{position: "absolute"}}/>
                    <img className="drag" data-goalid="moneywow" src={piggy} style={{position: "absolute"}}/>
                    <img className="drag" data-goalid="mentalwow" src={mentalHealth} style={{position: "absolute"}}/>
                    <img className="drag" data-goalid="bodywow" src={physHealth} style={{position: "absolute"}}/> */}

                    {/* Populate stickers based on goal types */}
                    {userData.goals?.map((goal) => {
                        if (goal.type === 'Physical Health') {
                            return (
                                <img className="drag" key={goal._id} data-goalid={goal._id} data-goal={goal.goalText} src={physHealth} style={{
                                    position: "absolute",
                                    left: `${goal.x}`,
                                    top: `${goal.y}`,
                                    zIndex: `${goal.z}`,
                                }}/>
                            )
                        }
                        if (goal.type === 'Mental Health') {
                            return (
                                <img className="drag" key={goal._id} data-goalid={goal._id} data-goal={goal.goalText} src={mentalHealth} style={{
                                    position: "absolute",
                                    left: `${goal.x}`,
                                    top: `${goal.y}`,
                                    zIndex: `${goal.z}`,
                                }}/>
                            )
                        }
                        if (goal.type === 'Financial') {
                            return (
                                <img className="drag" key={goal._id} data-goalid={goal._id}  data-goal={goal.goalText} src={piggy} style={{
                                    position: "absolute",
                                    left: `${goal.x}`,
                                    top: `${goal.y}`,
                                    zIndex: `${goal.z}`,
                                }}/>
                            )
                        }
                        if (goal.type === 'Educational') {
                            return (
                                <img className="drag" key={goal._id} data-goalid={goal._id}  data-goal={goal.goalText} src={eduBrain} style={{
                                    position: "absolute",
                                    left: `${goal.x}`,
                                    top: `${goal.y}`,
                                    zIndex: `${goal.z}`,
                                }}/>
                            )
                        }
                        if (goal.type === 'Personal') {
                            return (
                                <img className="drag" key={goal.goalId} data-goalid={goal._id}  data-goal={goal.goalText} src={artCross} style={{
                                    position: "absolute",
                                    left: `${goal.x}`,
                                    top: `${goal.y}`,
                                    zIndex: `${goal.z}`,
                                }}/>
                            )
                        }
                        return;
                    })}

                    {!goalLength > 0 &&
                        <h1 class="font-brush text-2xl">Add some Goals!</h1>
                    }

                    {/* Dragging Dropzone */}
                    {draggingState ? 
                        <div className="drop-zone container" 
                            style={{
                            position: "absolute",
                            bottom: "10px",
                            backgroundColor: "rgba(0,300,0, 0)",
                            height: "150px",
                            width: "95%",
                            overflow: "hidden",
                            border: "black 3px dashed",
                            borderRadius: "20px",
                            textAlign: "center",
                            transition: "border .2s ease"
                            }}
                        > 
                        <h3 class="font-hand text-base">View This Goal?</h3> 
                        </div>
                        :
                        <div className="drop-zone container" 
                            style={{
                            position: "absolute",
                            bottom: "10px",
                            // backgroundColor: "rgba(0,300,0, 0)",
                            height: "150px",
                            width: "95%",
                            overflow: "hidden",
                            border: "black 0px dashed",
                            borderRadius: "20px",
                            textAlign: "center",
                            transition: "border .2s ease"
                            }}
                        > 
                        </div>
                    }
                </div>    
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Save Your Stickers!</button>   
            </div>
        </section>
    )
}

export default Dashboard;