import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import Empty from '../asssets/Empty.json'

const YourOrder = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState();
  const [delivered, setDelivered] = useState()
  const [undelivered, setUndelivered] = useState()
  useEffect(() => {
    if (!localStorage.getItem('user-details')) {
      console.log("redirecting")
      navigate('/auth');
    }
    else {
      if (localStorage.getItem('zoggy-orders')) {
        setOrders(JSON.parse(localStorage.getItem('zoggy-orders')));
      }
    }
  }, [])

  useEffect(() => {
    if (orders) {
      let temp = orders.filter((order) => order.status === true);
      setDelivered(temp);
      console.log(delivered)
      temp = orders.filter((order) => order.status === false);
      setUndelivered(temp);
      console.log(undelivered)

    }
  }, [orders])
  return (
    <div className='h-screen overflow-auto'>
      <NavBar />
      <div className='bg-[#1a1a2e] m-5 h-full overflow-auto '>
        {
          orders?.length > 0
            ?
            <div className='grid grid-cols-1 md:grid-cols-2'>
              <div className='h-full hover:z-50'>
                <div className='text-2xl text-orange-500 font-bold font-comforta flex justify-start'>Undelivered Items</div>
                <div className='flex flex-col h-full lg:w-9/12 '>
                  {
                    undelivered?.map((item, index) => {
                      return (
                        <div key={index}
                          className={`relative group overflow-scroll lg:overflow-visible mt-5 lg:hover:translate-x-1/4  transition-all duration-1000 ease-out rounded-r-lg hover:rounded-l-lg 
                             bg-red-500`}>
                          <div className='flex justify-around py-5 font-titilium text-2xl '>
                            <span>Order</span> <span>@{item.createdAt.substring(0, 10)}</span>
                          </div>
                          <div className='absolute left-0 lg:left-full top-0 w-full lg:w-6/12 font-poppins text-lg '>
                            {
                              item.items.map((t, i) => {
                                return (
                                  <div key={i}
                                    className='bg-gradient-to-r from-[#0E325E] to-orange-500 transition-all duration-700 ease-in-out group-hover:opacity-100 opacity-0  '>
                                    <div className=' flex justify-around py-2 rounded-xl'>
                                      <div className='flex justify-evenly w-full'>{t.name}</div>
                                      <div className='flex justify-evenly w-full'>{t.price}</div>
                                      <div className='flex justify-evenly w-full'>{t.total}</div>
                                    </div>
                                  </div>
                                )
                              })
                            }
                          </div>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
              <div className='h-full hover:z-50'>
                <div className='text-2xl text-orange-500 font-bold font-comforta flex justify-end'>Delivered Items</div>
                <div className='flex flex-col h-full items-end'>
                  {
                    delivered?.map((item, index) => {
                      return (
                        <div className='w-full lg:w-9/12'>
                          <div key={index}
                            className={`relative group overflow-scroll lg:overflow-visible mt-5 lg:hover:-translate-x-1/4  transition-all duration-1000 ease-out rounded-l-lg hover:rounded-r-lg 
                             bg-green-500`}>
                            <div className='flex justify-around py-5 font-titilium text-2xl'>
                              <span>Order</span> <span>@{item.createdAt.substring(0, 10)}</span>
                            </div>
                            <div className='absolute left-0 lg:-left-2/4 top-0 w-full lg:w-6/12 font-poppins text-lg'>
                              {
                                item.items.map((t, i) => {
                                  return (
                                    <div key={i}
                                      className='bg-gradient-to-r from-[#0E325E] to-orange-500 transition-all duration-700 ease-in-out group-hover:opacity-100 opacity-0'>
                                      <div className=' flex justify-around py-2 rounded-xl'>
                                        <div className='flex justify-evenly w-full'>{t.name}</div>
                                        <div className='flex justify-evenly w-full'>{t.price}</div>
                                        <div className='flex justify-evenly w-full'>{t.total}</div>
                                      </div>
                                    </div>
                                  )
                                })
                              }
                            </div>
                          </div>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            </div>
            :
            <>
              <div className='absolute text-white font-mono top-1/4 left-1/4 md:left-1/3 text-xl md:text-2xl lg:text-3xl xl:text-5xl z-30'>
                Ops! You have nothing before
              </div>
              <div className='fixed top-1/4 md:top-auto md:left-1/3 flex justify-center items-center flex-col z-0'>
                <div className='drop-shadow-xl'>
                  <Lottie animationData={Empty} />
                </div>
              </div>
            </>
        }
      </div>
    </div>
  )
}

export default YourOrder