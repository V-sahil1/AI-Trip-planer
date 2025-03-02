import React from 'react'
import { NavLink } from 'react-router-dom'

function Hero() {
  return (
    <>
    <div className='flex flex-col items-center mx-56 gap-9'>
    <h1 className='text-[60px]  text-center mt-16
         '
     >
        <span className='text-[#f56551]'>
        Discover Your Next Adventure with AI : </span> Personalized ltineraries at Your Fingertips <p className='text-xl text-gray-500 text-center mt-7'> Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.</p>
        <NavLink to="createtrip">
        <button className='text-[17px] border w-[190px] h-[40px] bg-black text-[#FFFDD0] '>Get Started , It's Free</button>
        </NavLink>
        
        </h1>
    </div>
    
    </>
  )
}

export default Hero