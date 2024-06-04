import React from 'react'
import { useNavigate } from 'react-router-dom'


const Navbar = () => {

    const navigate = useNavigate()
    function handlelogin(){
        navigate('/Login')

    }

  return (
    <div className=' h-[100px] mx-16 bg-[#faf1e2] flex justify-between items-center p-12 '>       
        <h1 className='text-4xl font-semibold font-mono text-slate-800'>Crop Connect</h1>
        <button className='bg-transparent border border-black  rounded-3xl font-semibold text-black w-32 text-lg h-12 hover:scale-110  transition duration-500' onClick={handlelogin}>Login</button>
    </div>
  )
}

export default Navbar