import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from './UserContext';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';
import { MdSearch } from "react-icons/md";
import { FaEdit } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const Buy = () => {
  const navigate = useNavigate();
  const { userId } = useUser();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  console.log(userId)

  const handleProduct = async (product) =>  {

    const res = await axios.patch(
      `http://localhost:8000/add-visited`,
      {
        id : product._id,
        visitor: userId,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    console.log(res)
    navigate(`/product/${product._id}`);
  };

  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/getdata", {
        headers: {
          'Content-type': 'application/json'
        }
      });
      setData(response.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  const filterData = () => {
    const filteredData = data.filter(data => data.postedBy !== userId);
    setFilteredData(filteredData);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    filterData();
    console.log(userId)
  }, [data]);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredData(data);
    } else {
      const filteredata = data.filter((data) =>
        data.desc.toLowerCase().includes(searchTerm) || data.location.toLowerCase().includes(searchTerm)

      );
      setFilteredData(filteredata);
      }
  }, [searchTerm, data]);

  return (
    <div className="flex h-screen bg-gray-200">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 overflow-y-auto p-4">
        <nav className="bg-gray-800 shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0 text-white">
                  
                  Name: {userId}
                </div>

              </div>
              <div>
                <img
                  src="https://img.freepik.com/free-psd/3d-rendering-avatar_23-2150833572.jpg?t=st=1713552689~exp=1713556289~hmac=a37004104b096588778454988cd87e069ea75e01ec877d47483af1009677fe96&w=826"
                  alt="Profile"
                  className="rounded-full w-[50px] h-[50px] object-cover"
                />
              </div>

            </div>
          </div>
        </nav>
        {/* Search Field */}
        <div className="mt-4 flex justify-end items-end">
        <MdSearch className="text-3xl mr-[1rem]"
                />
          <input
            type="text"
            placeholder="search by place"
            className="border  border-gray-300 px-4 py-2 rounded-lg w-[200px] focus:outline-none focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-3 gap-5 mt-4">
          {filteredData.map(product => (
            <div key={product.id} className="bg-gray-100 h-[300px] rounded-lg text-lg shadow-md cursor-pointer" onClick={() => handleProduct(product)}>
              <img src={product.img} className="h-48 w-full object-cover rounded-t-lg" alt="Product" />
              <div className='p-4 flex justify-between'>
              <div>
              <h3 className="text-xl font-semibold">{product.desc}</h3>
              <p className="text-gray-600">Rs. {product.price}</p>
              <p className="text-gray-700">Location: {product.location}</p>
              </div>
              <div>
              <div className = "flex flex-row">
                <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
                <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
                <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
                <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
                <FontAwesomeIcon icon={faStar} className="text-yellow-500" />

              </div>
              </div>
              {/* <p className="text-gray-700 mt-2">Posted On: {product.postedOn}</p>
              <p className="text-gray-700 mt-2">Posted By: {product.postedBy}</p> */}
             
                </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Buy;
 