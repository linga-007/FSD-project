import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useUser } from "./UserContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./Sidebar";

const Post = () => {
  const [file, setFile] = useState();
  const [imageName, setImageName] = useState();

  const { userId } = useUser();
  const [postedBy, setUsername] = useState("");
  const [img, setImgUrl] = useState("");
  const [desc, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [quantity, setQuantity] = useState("");
  const [postedOn, setDate] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = async (e) => {
    // const formData = new FormData();
    // formData.append("image", file);

    // const result = await axios.post('/api/images', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
    // setImageName(result.data.imageName);
    // console.log("done");

    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:8000/add`,
        {
          img,
          desc,
          price,
          postedOn,
          postedBy,
          location,
          quantity,
          address
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res);

      if (res.status === 400) {
        // toast.error('User already exists. Please login.');
      }
      // toast.success('Signup successful! Please log in.');
      // navigate('/login');
      console.log("done");
      toast.success("successfully added");
    } catch (err) {
      console.log(err.message);
      // toast.error('Signup failed. Please try again.');
    }
  };

  return (
    <div className="flex h-screen bg-gray-200">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 p-4 bg-white">
        <nav className="bg-gray-800 shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0 text-white">
                  {/* Your logo or brand name */}
                  Name : {userId}
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
        <div className="main">
          <div className="inner mt-14">
            <form>
              <fieldset className="border-slate-800 p-3 border-2 space-y-4 mt-3">
                <legend className="text-xl font-semibold">
                  Enter Product Details
                </legend>
                <div className=" grid grid-cols-1 md:grid-cols-2 gap-4 ml-10 ">
                  <label className="font-semibold text-lg">
                    Enter your User ID
                    <input
                      type="text"
                      name="name"
                      onChange={(e) => setUsername(e.target.value)}
                      className="mt-1 block w-[60%] rounded-md border-gray-800 border-2 "
                    />
                  </label>
                  <label className="block font-semibold text-lg">
                    Enter the Product Description
                    <input
                      type="text"
                      name="description"
                      onChange={(e) => setDescription(e.target.value)}
                      className="mt-1 block w-[60%] rounded-md border-gray-800 border-2 shadow-sm bg-gray-200"
                    />
                  </label>
                  <label className="block font-semibold text-lg">
                    Enter the Price
                    <input
                      type="text"
                      name="price"
                      onChange={(e) => setPrice(e.target.value)}
                      className="mt-1 block w-[60%] rounded-md border-gray-800 border-2 shadow-sm bg-gray-200"
                    />
                  </label>
                  <label className="block font-semibold text-lg">
                    Enter your Location
                    <input
                      type="text"
                      name="location"
                      onChange={(e) => setLocation(e.target.value)}
                      className="mt-1 block w-[60%] rounded-md border-gray-800 border-2 shadow-sm bg-gray-200"
                    />
                  </label>
                  <label className="block font-semibold text-lg">
                    Enter Quantity Available
                    <input
                      type="text"
                      name="quantity"
                      onChange={(e) => setQuantity(e.target.value)}
                      className="mt-1 block w-[60%] rounded-md border-gray-800 border-2 shadow-sm bg-gray-200"
                    />
                  </label>
                  <label className="block font-semibold text-lg">
                    Enter the Date
                    <input
                      type="date"
                      name="dob"
                      onChange={(e) => setDate(e.target.value)}
                      className="mt-1 block w-[60%] rounded-md border-gray-800 border-2 shadow-sm bg-gray-200"
                    />
                  </label>
                  <label className="block font-semibold text-lg">
                    Enter Image Url
                    <input
                      type="text"
                      name="imgurl"
                      onChange={(e) => setImgUrl(e.target.value)}
                      className="mt-1 block w-[60%] rounded-md border-gray-800 border-2 shadow-sm bg-gray-200"
                    />
                  </label>
                  <label className="block font-semibold text-lg ">
                    Enter your Address:
                    <textarea
                      name="address"
                      onChange={(e) => setAddress(e.target.value)}
                      className="mt-1 block w-[60%] rounded-md border-gray-800 border-2 shadow-sm bg-gray-200"
                    ></textarea>
                  </label>
                  
                </div>
                <button
                  onClick={(e) => handleSubmit(e)}
                  className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                >
                  Upload
                </button>
              </fieldset>
            </form>
            <ToastContainer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
