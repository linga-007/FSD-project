import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Sidebar from "./Sidebar";
import { useUser } from "./UserContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { toast,ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import MapComponent from "./MapComponent";
import { MdOutlineCall } from "react-icons/md";

const ProductViewPage = () => {
  const [location, setLocation] = useState('');
  const [coordinates, setCoordinates] = useState({ lat: '', lng: '' });
  const [error, setError] = useState('');

  const { id } = useParams();
  const { userId } = useUser();
  const [data, setData] = useState([]);
  console.log(id);
  const [SMScontent,setSMScontent] =useState('')

  

  const sendSMS = async() =>  {
    console.log("clicked")
    const data = {
      body: SMScontent,
      to: '+919500315471'
    };
  
   await axios.post('http://localhost:8000/send-sms', data)
      .then(response => {
        toast.success("messge sent successfully")
      })
      .catch(error => {
        console.error('Error sending SMS:', error.response.data.error);
      });
  };

  const getCoordinates = async () => {
    const apiKey = '6mvha8UrzjALA2axKcZpFEub3dlwdKL6nY3vQWusXpc';
    const encodedLocation = encodeURIComponent(data.address);

    try {
      const response = await axios.get(
        `https://geocode.search.hereapi.com/v1/geocode?q=${encodedLocation}&apiKey=${apiKey}`
      );

      if (response.data.items.length > 0) {
        const { lat, lng } = response.data.items[0].position;
        setCoordinates({ lat, lng });
        setError('');
        console.log(lat)
      } else {
        setError('Location not found.');
      }
    } catch (err) {
      setError('An error occurred while fetching the coordinates.');
    }
  };

  useEffect(()=>{
    getCoordinates()
  },[data])

  const getData = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/getproduct",
        {
          id: id,
        },
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      setData(response.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  

  useEffect(() => {
    getData();
  }, []);

  console.log(data);

  return (
    <div className="flex h-screen bg-gray-200">
      {/* Sidebar */}
      <Sidebar />

      <div className="w-full overflow-y-scroll">
        <nav className="bg-gray-800 shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0 text-white">
                  {/* Your logo or brand name */}
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

        <div className="container mx-auto px-4 py-8 flex justify-start items-start">
          <div className="max-w-full gap-10 flex mx-auto">
            <div className="mb-8">
              <img src={data.img} alt="gg" className="w-full" />
            </div>
            <div className="mb-8 flex flex-col gap-6 ">
              <h1 className="text-4xl font-bold w-[500px] h-fit">
                {data.desc}
              </h1>
              <p className="text-gray-600 text-4xl mt-2">
                Price : {data.price}
              </p>
              <p className="text-2xl font-semibold">
                Posted On : {data.postedOn}
              </p>
              <p className="text-2xl font-semibold">
                Posted By : {data.postedBy}
              </p>
              <p className="text-gray-600 text-2xl mt-2">
                Quantity Remaining : {data.quantity}
              </p>
              <div className = "flex flex-row">
                <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
                <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
                <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
                <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
                <FontAwesomeIcon icon={faStar} className="text-yellow-500" />

              </div>
            </div>
          
          </div>
        </div>
        <div className="p-10 w-full text-2xl">
          <div
            className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold">Disclaimer:</strong>
            <span className="block sm:inline">
              {" "}
              Before placing an order, please ensure to check the quality of the
              products. We recommend contacting the seller directly for any
              inquiries regarding product quality or other details.
            </span>
          </div>
        </div>
        <div className="p-10 w-full h-fit flex justify-between items-center">
          <div className="w-[300px] rounded overflow-hidden shadow-lg bg-white">
            
            <div className="px-6 py-4">
              <div className="font-bold text-xl flex items-center justify-center mb-2">Contact Details</div>
              <div className="flex items-center justify-center">
              <MdOutlineCall className="w-8 h-8"/>
              <p className="text-gray-700  font-semibold text-xxl"> 9360412081 </p>

              </div>
              
            </div>
          </div>
          <div className="max-w-xs rounded overflow-hidden shadow-lg bg-white">
            
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">Send Message</div>
              <form onSubmit={sendSMS}>
              <input type='text' placeholder="enter message" onChange={(e)=>setSMScontent(e.target.value)}></input>
              <button className = "bg-black ml-4 text-white w-[70px] h-[30px] rounded-lg">Send</button>
              </form>
              
            </div>
          </div>
          
        </div>
        <div className="">
        {coordinates.lat && coordinates.lng && (
        <MapComponent coordinates={coordinates} location={data.address} />
      )}
        </div>
      </div>
     
    </div>
  );
};

export default ProductViewPage;
