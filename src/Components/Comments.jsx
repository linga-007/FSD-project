import React from 'react'
import person from './person.png'

const Comments = (props) => {
  return (
    // <div className="max-w-sm rounded bg-[#DFD3C3] overflow-hidden shadow-lg mx-auto my-4 relative">
    //   <img className="w-full" src={person} width={200} height={200} alt='photo' />
    //   <div className="px-6 py-4">
    //     <div className="font-bold text-xl mb-2 text-center">{props.name}</div>
    //     <p className="text-gray-700 text-base">
    //       {props.content}
    //     </p>
    //   </div>
    //   <div className="absolute inset-0 bg-black bg-opacity-5 shadow-md flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
    //     <div className=" hover:animate-shake transform-gpu">
          
    //     </div>
    //   </div>
    // </div>
    <div class="group max-w-md relative cursor-pointer items-center justify-center mx-auto my-4 overflow-hidden transition-shadow hover:shadow-xl hover:shadow-black/30">
      
        <img class="h-full w-full object-cover transition-transform duration-500 group-hover:rotate-3 group-hover:scale-125" src={person}  alt="" />
      
      <div class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></div>
      <div class="absolute inset-0 flex translate-y-[60%] flex-col items-center justify-center px-9 text-center transition-all duration-500 group-hover:translate-y-0">
        <h1 class="font-dmserif text-3xl font-bold text-white">{props.name}</h1>
        <p class="mb-3 text-lg italic text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">{props.content}</p>
        {/* <button class="rounded-full bg-neutral-900 py-2 px-3.5 font-com text-sm capitalize text-white shadow shadow-black/60">See More</button> */}
      </div>
    </div>
  )
}

export default Comments