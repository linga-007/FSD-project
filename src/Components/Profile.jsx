import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useUser } from './UserContext';
import axios from 'axios';
import logout from './logout.png'
import { toast,ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from './Sidebar';
import { FaEdit } from 'react-icons/fa';
import { FaDeleteLeft } from 'react-icons/fa6';
import { MdDelete } from 'react-icons/md';



const Profile = () => {
    const navigate = useNavigate();
    function handleLogout(){
        navigate('/Login')
    }

  const userid = localStorage.getItem('userId');
    console.log('is ',userid)
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [ newdescription , setnewDescription] = useState('')
    const [ newPrice , setnewPrice] = useState('')
    const [ newQuantity , setnewQuantity] = useState('')
    const [id , setid] = useState("")
    console.log(newPrice , newdescription)

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
    }

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        filterData();
    }, [data]);

    const filterData = useCallback(() => {
        const filteredData = data.filter(data => data.postedBy === userid);
        setFilteredData(filteredData);
    }, [data, userid]);

    const updateDetail = async()=>{
        const res = await axios.patch(
            `http://localhost:8000/update`,
            {
              desc:newdescription,
              price:newPrice,
              quantity:newQuantity,
              id:id
            },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
          toast.success("Saved Successfully")
    }

    const openEditModal = useCallback((product) => {
        setid(product._id);
        setSelectedProduct(product);
        setnewDescription(product.desc)
        setnewPrice(product.price)
        setnewQuantity(product.quantity)
        setEditModalOpen(true);
    }, []);

    const closeEditModal = () => {
        setEditModalOpen(false);
    };

    const openDeleteModal = useCallback((product) => {
        setid(product._id);
        setSelectedProduct(product);
        setDeleteModalOpen(true);
    }, []);

    const closeDeleteModal = () => {
        setDeleteModalOpen(false);
    };

    const handleEdit = (editedData) => {
        console.log('Edited Data:', editedData);
        closeEditModal();
    };

    const handleDelete = async() => {
        const res = await axios.post(
            `http://localhost:8000/delete`,
            {
              id:id
            },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
          getData();
        closeDeleteModal();
        toast.success("Deleted Successfully")
    };


    return (
        <>
        <ToastContainer/>
        <div className="flex h-screen bg-gray-200">
            {/* Sidebar */}
            <Sidebar/>

            {/* Main content */}
            <div className="flex-1 p-4">
                <nav className="bg-gray-800 shadow-md">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-16">
                            <div className="flex  items-center">
                                <img src = {logout} width={40} height={40} className='pr-4 cursor-pointer' onClick={handleLogout}/>
                                <div className="flex-shrink-0 text-white">
                                    Name : {userid}
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
                <div className='flex justify-between sticky '>
                    <p className='font-semibold text-3xl mt-5'>Your Posts : </p>
                    <div>
                        <input type='date'></input>
                    </div>
                </div>
                <div className="overflow-y-auto max-w-screen-xl whitespace-nowrap py-4 ">
                    <div className="flex space-x-4 px-4">
                        {filteredData.map(product => (
                            <div key={product.id} className="flex-shrink-0 w-72 bg-white rounded-lg shadow-md overflow-hidden">
                                <img src={product.img} className="h-48 w-full object-cover" />
                                <div className="p-4">
                                    <h3 className="text-xl font-semibold">{product.desc}</h3>
                                    <p className="text-gray-700 font-semibold">Price : <span>${product.price}</span></p>
                                    {/* <p className="text-gray-700 mt-2">Postedon: {product.postedOn}</p> */}
                                    <p className="text-gray-700 font-semibold">quantity Remaining : <span>{product.quantity}</span> </p>
                                    <p className="text-gray-700 font-semibold">Visited By :  <span>
                                    
                                    <ul className='h-[50px] overflow-y-scroll'>
                                        {product.visited.map((visitor, index) => (
                                            <li key={index}>{visitor}</li>
                                        ))}
                                    </ul>
                                    </span> </p>

                                    <div className="mt-4 flex justify-between">
                                        <FaEdit className='w-10 h-10 cursor-pointer' onClick={() => openEditModal(product)}/>
                                        <MdDelete className='w-10  h-10 cursor-pointer' onClick={() => openDeleteModal(product)}/>   
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            
            {editModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center  bg-gray-500 bg-opacity-50">
                    <div className="bg-white w-[50%] h-[50%] text-xl rounded-lg p-6">
                        <h2 className="text-lg font-semibold mb-4">Edit Product</h2>
                        <form >
                            <div className="mb-4">
                                <label className="block text-gray-700 text-xl font-bold mb-2">Description</label>
                                <input
                                    type="text"
                                    name="desc"
                                    value={newdescription}
                                    className="form-input mt-1 block w-full border-black"
                                    onChange={(e)=>{setnewDescription(e.target.value)}}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-xl font-bold mb-2">Price</label>
                                <input
                                    type="string"
                                    name="price"
                                    value={newPrice}
                                    onChange={(e)=>{setnewPrice(e.target.value)}}
                                    className="form-input mt-1 block w-full border-black"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-xl font-bold mb-2">Quantity</label>
                                <input
                                    type="string"
                                    name="desc"
                                    value={newQuantity}
                                    className="form-input mt-1 block w-full border-black"
                                    onChange={(e)=>{setnewQuantity(e.target.value)}}
                                />
                            </div>
                            <div className="flex justify-end">
                                <button type="button" className="mr-2 px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none focus:ring focus:ring-gray-200" onClick={closeEditModal}>Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:ring-blue-200" onClick={updateDetail}>Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {deleteModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
                    <div className="bg-white rounded-lg p-6">
                        <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
                        <p className="mb-4">Are you sure you want to delete this product?</p>
                        <div className="flex justify-end">
                            <button type="button" className="mr-2 px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none focus:ring focus:ring-gray-200" onClick={closeDeleteModal}>Cancel</button>
                            <button type="button" className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-200" onClick={handleDelete}>Delete</button>
                        </div>
                    </div>
                    
                </div>
                 
            )}
        </div>
        </>
    )
}

export default Profile;
