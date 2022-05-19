import React, { useEffect } from "react";
import $ from "jquery";
import "jquery-ui-dist/jquery-ui";

import artCross from "../assets/stickers/art-cross.png";
import eduBrain from "../assets/stickers/edu-brain.png";
import piggy from "../assets/stickers/finance-piggy.png";
import mentalHealth from "../assets/stickers/mental-health.png";
import physHealth from "../assets/stickers/phys-health.png";
// import woodBg from "../assets/images/woodtexture.jpeg";

const Dashboard = () => {

    useEffect(() => {
        $( function() {
            $( ".drag" ).draggable({containment: ".container", stack: ".drag"});
        } );
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
                    // backgroundImage: `url(${woodBg})`,
                    display: "block",
                    border: "3px solid black",
                    width: "50vw",
                    height: "80vh",
                    backgroundColor: "whitesmoke",
                    padding: "10px",
                    borderRadius: "15px",
                }}>
                    <img className="drag" src={artCross} />
                    <img className="drag" src={eduBrain} />
                    <img className="drag" src={piggy} />
                    <img className="drag" src={mentalHealth} />
                    <img className="drag" src={physHealth} />
                </div>       
            </div>
        </section>
    )
}

export default Dashboard;