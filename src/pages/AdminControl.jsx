import React, { useEffect, useRef, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import AdminNav from '../components/AdminNav'
import { getAllOrder } from '../APIutils/Apiroutes';
import axios from 'axios';

const AdminControl = () => {
    const [orders, setOrders] = useState([]);
    const isFirstRender = useRef(true);

    useEffect(() => {
        if(isFirstRender.current)
        {
            isFirstRender.current = false;
            requestOrders();
        }
    }, [])

    useEffect(() => {
        if(orders)
        {
            console.log("Orders");
            console.log(orders);
        }
    }, [orders])

    const requestOrders = () => {
        axios.post(getAllOrder, {admin :true})
        .then((data) => {
            setOrders(data.data.orders);
            console.log("Orders got success");
            console.log(data.data.orders);
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