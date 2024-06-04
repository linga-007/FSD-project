import React from 'react'

const Contact = () => {
  return (
    <div className="max-w-screen-lg mx-auto mt-8 p-4 bg-[#DFD3C3] rounded-lg shadow-md">
      <div className="flex flex-col md:flex-row justify-between items-start ">
        <div className="md:w-1/2">
          <h2 className="text-2xl font-semibold mb-4">Let's bridge the gap and connect!</h2>
          
          <div className="flex flex-col space-y-4">
            <p className="text-lg font-semibold">Phone: 9360412081</p>
            <p className="text-lg font-semibold">Email: lingesh480500@gmail.com</p>
          </div>
        </div>
        <div className="md:w-1/2">
          <label htmlFor="message" className="block text-lg font-semibold">Your message:</label>
          <textarea
            id="message"
            className="w-full h-24 px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Enter your message..."
          
          ></textarea>
          <div className="mt-4 flex justify-end">
            <button
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200 focus:ring-opacity-50"
             
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact