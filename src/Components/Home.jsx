import React from 'react'
import Navbar from './Navbar'
import landscape from './crop.jpeg'
import Comments from './Comments';
import Contact from './Contact';
import scroll from './scroll.png'
import {TypeAnimation} from 'react-type-animation'
const Home = () => {

  const data = [
    {
      'name' : 'Lingesh',
      'content' : "Exceptional service! Using Crop-Connect was a breeze, connecting me with local farmers effortlessly. My experience with Crop-Connect exceeded expectations – easy, reliable, and filled with delicious finds."
    },
    {
      'name' : 'Aakash',
      'content' : "Outstanding experience with Crop-Connect! Seamless interface, prompt support, and fresh produce made my shopping a delight. Highly recommend for anyone seeking quality and convenience. Kudos to the team for connecting us with local farmers!"
    },
    {
      'name' : 'Sundaresan',
      'content' : "Highly recommend Crop-Connect for anyone looking to support local farmers and enjoy quality products."
    },
    
  ]

  const handleClick = () => {
    const element = document.getElementById('comment');
    element.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <>
    <Navbar/>
    <div className='relative '>
      <img src={landscape} width={1520} className='h-[722px] pb-10 opacity-80'></img>
      <div className="absolute top-56 left-[500px] text-black  text-6xl font-bold">Seeds of Change</div>
      {/* <div className="absolute top-80 left-[250px] text-black  text-6xl font-bold">Empowering Farmers, Feeding Futures</div> */}
      <div className='absolute top-80 left-[200px] text-black text-6xl font-bold'>
      <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed out once, initially
        'Empowering Farmers, Feeding Futures',
        1000 // wait 1s before replacing "Mice" with "Hamsters"
        
      ]}
      wrapper="span"
      speed={30}
      repeat={Infinity}
    />
      </div>
      <img src={scroll} width={70} height={70} className='absolute top-[520px] left-[700px]' onClick={handleClick}></img>
      {/* <button className="absolute top-[520px] left-[700px] " onClick={handleClick}>scroll</button> */}
      <div>
      <div className='h-[650px] '>
        <div id='comment' className='flex justify-center items-center text-5xl font-semibold pb-7'>
        Top Reviews
        </div>
        <div className='w-full flex flex-row animate-loop-scroll'>
          {data.map(data=>(
            <Comments name = {data.name} content = {data.content}/>
          ))}
        </div>
        
      </div>
      <div className='pb-10'>
      <Contact/>

      </div>
      </div>
    </div>
    </>
  )
}

export default Home