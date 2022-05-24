import React from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { Carousel } from 'react-responsive-carousel'
import { fortunes } from '../lib/fortunes'
import fortuneCookie from '../assets/stickers/fortune-cookie.png'

export default function Fortunes() {
  return (
    <Carousel>
      {fortunes.map((fortune, i) => (
        <div key={i}>
          <img src={fortuneCookie} />
          <p>{fortune}</p>
        </div>
      ))}
    </Carousel>
  )
}
