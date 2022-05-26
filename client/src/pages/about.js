import React from "react";
import woodBg from '../assets/images/woodtexture.jpeg'

function About() {

    return (
        <section className="my-5 flex justify-center items-center pt-10"
            style={{
            backgroundImage: `url(${woodBg})`,
            width: '100vw',
            height: '100vh',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            margin: 0,
      }}>
            <div className="
            flex justify-center items-center text-center
            border-8 border-solid border-white-900 
            w-2/3
            bg-teal-600 rounded-xl">
                <h1 id="about" className="font-brush text-3xl font-bold pr-6">About Sticker Book</h1>
                <div className="flex-wrap">
                    <div className="my-2">
                        <p className="text-base font-hand">
                        We are passionate about helping people achieve their dreams by creating fun acheivable goals.
                        This sticker book allows individuals to celebrate their wins with friends, and also collect stickers 
                        for their sticker book. Our unqiue sticker book allows individuals to look back fondly on the goals they have 
                        achieved in the past. Keep acheiving your goals to increase your collection! 
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About;