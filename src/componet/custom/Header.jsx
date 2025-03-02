import React from 'react'

function Header() {
  return (
    <div className='p-2 px-5 shadow-sm flex justify-between '>
        <img src="/logo.svg" alt="" />
        <div className=' border w-[80px] flex justify-center items-center  h-[40px] text-[#FFFDD0]  bg-black'>
        <button>sign in</button>
        </div>
        
    </div>
  )
}

export default Header