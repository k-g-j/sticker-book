import React, { useEffect } from "react";

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

    // call drag and drop functions for the class .drag and the id .drop
    useEffect(() => {
        //drag the stickers, limit to the container and have the dragged sticker at the highest z-index in the stack
        $( ".drag" ).draggable({containment: ".container", stack: ".drag"});

        // recognize when sticker dropped in the dropzone
        // redirect to that goal page
        $( ".drop-zone" ).droppable({
            classes: {
                "ui-droppable-active": "hover-highlight"
            },
            drop: function( event, ui ) {
                console.log("dropped!");
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
                    {/* {{user.name}} */}
                    Your Collection!
                </h1>
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
                    <img className="drag" src={artCross} />
                    <img className="drag" src={eduBrain} />
                    <img className="drag" src={piggy} />
                    <img className="drag" src={mentalHealth} />
                    <img className="drag" src={physHealth} />

                    <div className="drop-zone container" 
                    style={{
                        position: "absolute",
                        bottom: "10px",
                        backgroundColor: "rgba(0,300,0,.2)",
                        height: "150px",
                        width: "95%",
                        overflow: "hidden",
                        borderRadius: "20px",
                        textAlign: "center",
                    }}
                    >
                        <h3
                        style={{
                            color: "rgba(0,200,0,.4)"
                        }}
                        >
                            See goal?
                        </h3>
                    </div>
                </div>       
            </div>
        </section>
    )
}

export default Dashboard;