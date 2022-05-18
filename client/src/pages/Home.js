import React from "react";
import woodBg from "../assets/images/woodtexture.jpeg";
import noteBook from "../assets/stickers/sticker-book-home.png";


const Home = () => {

    function handleClick() {
        console.log("Get Started!")
    }

    return (
        <div className="container flex flex-col justify-center items-center color-teal-500" style={{
            backgroundImage: `url(${woodBg})`,
            // backgroundColor: "teal",
            width: "100vw",
            height: "100vh",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            margin: 0
        }}>           
            {/* <h1 className="grid place-items-center h-screen"
            id="notebook-title"
            style={{textAlign: "center", }}>HELLO!</h1> */}
            <img className="notebook-img" src={noteBook}
            onClick={handleClick}
            />
        </div>
    );
};

export default Home;
