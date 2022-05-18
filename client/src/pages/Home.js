import React from "react";
import woodBg from "../assets/images/woodtexture.jpeg"

const Home = () => {
    return (
        <div className="container flex flex-col justify-center items-center color-teal-500" style={{
            backgroundImage: `url(${woodBg})`,
            width: "100vw",
            height: "100vh",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            margin: 0
        }}>           
            <h1 className="grid place-items-center h-screen"
            style={{textAlign: "center", }}>HELLO!</h1>
            
        </div>
    );
};

export default Home;
