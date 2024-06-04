import React from 'react'
import { Link } from 'react-router-dom'
const Sidebar = () => {
  return (
    <div className="w-64 bg-slate-800 border-r border-gray-300 sticky">
        <div className="p-4 border-b border-gray-300">
          <h2 className="text-3xl font-semibold text-white">Crop Connect</h2>
        </div>
        <nav className="py-4">
          <ul>
          <Link to='/Profile' ><li className="px-4 py-2 mb-5 hover:bg-gray-100 cursor-pointer text-lg text-white hover:text-slate-800" >Your Profile</li></Link>
            <Link to='/Post' ><li className="px-4 py-2 mb-5 hover:bg-gray-100 cursor-pointer text-lg text-white hover:text-slate-800" >Create new Post</li></Link>
            <Link to='/Buy' ><li className="px-4 py-2 mb-5 hover:bg-gray-100 cursor-pointer text-lg text-white hover:text-slate-800" >Buy Crops</li></Link>
            
          </ul>
        </nav>
      </div>
  )
}

export default Sidebar