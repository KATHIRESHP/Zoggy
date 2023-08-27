import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import AdminNav from '../components/AdminNav'
import { getAllOrder } from '../APIutils/Apiroutes';
import axios from 'axios';

const AdminControl = () => {
    const [order, setOrders] = useState([]);

    useEffect(() => {
        
    }, [])

    const requestOrders = () => {
        axios.post(getAllOrder, {admin :true})
        .then((data) => {
            console.log("Orders got success");
            setOrders(data.data.orders);
        })
        .catch((e) => {
            toast.error("Error in fetching orders\n" + e);
        })
    }

  return (
    <div className='bg-[#1a1a2e] h-screen overflow-auto'>
        <Toaster/>
        <div>
            <AdminNav/>
        </div>
    </div>
  )
}

export default AdminControl