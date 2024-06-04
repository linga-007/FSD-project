import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';

const Signup = () => {
  const navigate = useNavigate();
  const { setUserId } = useUser();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    
      try {
        const res = await axios.post(
          `http://localhost:8000/signup`,
          {
            name,
            username,
            phonenumber,
            password,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        console.log(res);
        navigate('/Login')
        
      } catch (err) {
        console.log(err.message);
        setError('Signup failed. Please try again.');
      }
   
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 ">
      <div className="bg-white rounded-lg  flex items-center justify-center p-5 m-5 flex-col w-[627px] h-[600px] ">

        <h2 className="text-black mb-14 pt-10 text-Inter text-3xl font-medium">
          Signup
        </h2>
        {error && <p className='error' style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleLogin} className='w-[627px] h-[484px] pl-10 pr-10'>
        <div className="mb-8  ">
            <label className="block text-[#333333] text-Inter">
              Full Name
            </label>
            <input
              type="string"
              className="mt-1 p-2 w-full border  text-black rounded-md border-[#8A8A8A]"
              placeholder="lingesh"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className="mb-8  ">
            <label className="block text-[#333333] text-Inter">
              Username
            </label>
            <input
              type="string"
              className="mt-1 p-2 w-full border  text-black rounded-md border-[#8A8A8A]"
              placeholder="admin@gmail.com"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
          <div className="mb-8  ">
            <label className="block text-[#333333] text-Inter">
              Phone Number
            </label>
            <input
              type="string"
              className="mt-1 p-2 w-full border  text-black rounded-md border-[#8A8A8A]"
              placeholder="admin@gmail.com"
              value={phonenumber}
              onChange={(e) => {
                setPhonenumber(e.target.value);
              }}
            />
          </div>
          <div className="mb-8 ">
            <label className="block text-[#333333] text-Inter ">
              Password
            </label>
            <input
              type="password"
              className="mt-1 p-2 w-full border  text-black rounded-md border-[#8A8A8A]"
              placeholder="********"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <button
            className="w-full bg-[#000]   text-white py-2 rounded-md "
          >
            Log In
          </button>
          <div>
            <p className="text-center text-black text-sm">
              Already have an account?{' '}
              <span
                className="text-blue-500 cursor-pointer"
                onClick={() => navigate('/login')}
              >
                Login
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
