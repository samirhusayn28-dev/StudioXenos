
import React from 'react'
import Navbar from './Navbar'
import herobg from '../components/assets/mountain.jpg'

export default function Hero() {
  return (
    <section
    className='relative min-h-screen overflow-hidden flex item-center'
    style={{
      backgroundImage: url(${herobg}),
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    }}>
            <div>
            </div>

<Navbar/>
<div>
    <h1>
        Unleash The Growth<br/> Potential Of Your<br/>Business
    </h1>

    <p>
        Unlock your business potential with bespoke designs, Mobile Apps, and Websites craftedd for growth.
    </p>
    <button>
        Request a Quote
    </button>
</div>




    </section>
  )
}