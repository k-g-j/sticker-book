import React from "react";
import woodBg from "../assets/images/woodtexture.jpeg"

const Home = () => {
    return (
        <div className="container grid place-items-center h-screen" style={{
            backgroundImage: `url(${woodBg})`,
            width: "100vw",
            height: "100vh",
            backgroundSize: 'cover',
            backgroundPosition: 'center'
        }}>
                            
            <h1 className="grid place-items-center h-screen"
            style={{textAlign: "center", }}>HELLO!</h1>
        </div>
    );
};

export default Home;
