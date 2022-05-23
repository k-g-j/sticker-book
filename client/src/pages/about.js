import React from "react";
// import profileImage from "../assets/images/filler-profile";

function About() {

    return (
        <section className="my-5" >
            <h1 id="about" class="font-brush text-2xl">About Sticker Book</h1>
            <div className="flex-row">
                {/* <img src={profileImage} class="my-2" style={{ width: "25%" }} alt="cover"  /> */}
                <div className="my-2" class="font-hand">
                    <p class="text-lg">
                    We are passionate about helping people achieve their dreams by creating fun acheivable goals.
                    This sticker book allows individuals to celebrate their wins with friends, and also collect stickers 
                    for their sticker book. Our unqiue sticker book allows individuals to look back fondly on the goals they have 
                    achieved in the past. Keep acheiving your goals to increase your collection! 
                    </p>
                </div>
            </div>
        </section>
    )
}

export default About