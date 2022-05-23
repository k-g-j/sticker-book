import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME, QUERY_USER, QUERY_GOALS } from "../utils/queries";
import { UPDATE_STICKER } from "../utils/mutations";
import Auth from "../utils/auth";

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

    const userData = data?.me || {}
    console.log(userData)

    // set stickers array based on goals array types.
    const goalLength = userData.goals?.length || 0;


    // set sticker dragging as State
    const [draggingState, setDraggingState] = useState(false);

    // call drag and drop functions for the class .drag and the id .drop
    useEffect(() => {
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
                console.log(this.style.cssText);
                let z = positionInfo[0].trim();
                let x = positionInfo[1].split(' left: ')[1];
                let y = positionInfo[2].split(' top: ')[1];
                console.log("z-index:", z);
                console.log("left: ", x);
                console.log("top: ", y);
                console.log("data-goalid: ",$(this).data('goalid'));
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
                <h1>
                    Hey {userData.username}! Here's Your Collection!
                </h1>
                {Auth.loggedIn() ? (
                    <h1>Logged in!</h1>
                ) : (
                    <h1>Logged out!</h1>
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
                    <img className="drag" data-goalid="artwow" src={artCross} style={{position: "absolute"}}/>
                    <img className="drag" data-goalid="brainwow" src={eduBrain} style={{position: "absolute"}}/>
                    <img className="drag" data-goalid="moneywow" src={piggy} style={{position: "absolute"}}/>
                    <img className="drag" data-goalid="mentalwow" src={mentalHealth} style={{position: "absolute"}}/>
                    <img className="drag" data-goalid="bodywow" src={physHealth} style={{position: "absolute"}}/>

                    {/* Populate stickers based on goal types */}
                    {userData.goals?.map((goal) => {
                        if (goal.type === 'Physical Health') {
                            return (
                                <img className="drag" data-goalId={goal._id} src={physHealth} style={{
                                    position: "absolute",
                                    left: `${goal.x}`,
                                    top: `${goal.y}`,
                                    zIndex: `${goal.z}`,
                                }}/>
                            )
                        }
                        if (goal.type === 'Mental Health') {
                            return (
                                <img className="drag" data-goalId={goal._id} src={mentalHealth} style={{
                                    position: "absolute",
                                    left: `${goal.x}`,
                                    top: `${goal.y}`,
                                    zIndex: `${goal.z}`,
                                }}/>
                            )
                        }
                        if (goal.type === 'Financial') {
                            return (
                                <img className="drag" data-goalId={goal._id} src={piggy} style={{
                                    position: "absolute",
                                    left: `${goal.x}`,
                                    top: `${goal.y}`,
                                    zIndex: `${goal.z}`,
                                }}/>
                            )
                        }
                        if (goal.type === 'Educational') {
                            return (
                                <img className="drag" data-goalId={goal._id} src={eduBrain} style={{
                                    position: "absolute",
                                    left: `${goal.x}`,
                                    top: `${goal.y}`,
                                    zIndex: `${goal.z}`,
                                }}/>
                            )
                        }
                        if (goal.type === 'Personal') {
                            return (
                                <img className="drag" data-goalId={goal._id} src={artCross} style={{
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
                        <h1>Add some Goals!</h1>
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
                        <h3>View This Goal?</h3> 
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
            </div>
        </section>
    )
}

export default Dashboard;