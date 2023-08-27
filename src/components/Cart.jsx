import React, { useEffect, useState } from 'react'
import NavBar from './NavBar'
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import Lottie from 'lottie-react'
import Empty from '../asssets/Empty.json'
import { placeOrderRoute } from '../APIutils/Apiroutes';
import axios from 'axios'
const Orders = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(undefined);
  const [cart, setCart] = useState();

  useEffect(() => {
    if (!localStorage.getItem('user-details')) {
      console.log("redirecting")
      navigate('/auth');
    }
    else {
      setUser(JSON.parse(localStorage.getItem("user-details")));
      if (localStorage.getItem('zoggy-cart')) {
        setCart(JSON.parse(localStorage.getItem('zoggy-cart')));
        console.log(cart);
      }
    }
  }, [])

  const placeOrderHandler = (e) => {
    const temp = cart.map((item) => {
      const {src, ...rest} = item
      return{
        total: item.price * item.count,
        ...rest
      }
    })
    console.log(temp)
    axios.post(placeOrderRoute, {
      email: user.email,
      items: temp,
      status: "ordered"
    })
    .then((data) => {
      toast.success("Order  placed :)");
    })
    .catch((error) => {
      console.log("error in cart data to server")
    })
  }
  return (
    <div className='text-white/80 h-screen overflow-auto'>
      <Toaster/>
      <NavBar />
      <div>
        {
          cart?.length > 0
            ?
            <>
              <div className='h-full gap-2 grid grid-cols-1 md:grid-cols-2 m-5 pb-11'>
                {
                  cart?.map((item, index) => {
                    return (
                      <>
                        <div className='flex justify-center my-4 rounded-md' key={index}>
                          <div className='group w-8/12 md:w-6/12 flex justify-center items-center  relative  transition-all duration-800 ease-in-out '>
                            <img
                              src={item.src}
                              className='z-0 group-hover:rounded-md group-hover:scale-110 transition-transform duration-500 ease-in-out'
                            />
                            <div className='absolute group-hover:opacity-100 opacity-0 bottom-3'>
                              <div className='cursor-not-allowed bg-[#1a1a2e] py-0 md:py-1 px-2 md:px-4 rounded font-Tektur group-hover:scale-150 transition-all ease-in-out duration-500'>
                                Nos: <span>{item.count}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )
                  }
                  )
                }
              </div>
              <div className='absolute bottom-0 flex w-full justify-center mb-2 md:mb-4 lg:mb-7 xl:mb-11'>
                <button
                  className='bg-lime-600 py-1 px-4 rounded font-poppins text-xl'
                  onClick={(e) => {
                    placeOrderHandler(e)
                  }}
                ><i class="bi bi-truck"></i><span className='ml-3'>Place order</span></button>
              </div>
            </>
            :
            <>
              <div className='absolute font-mono top-1/4 left-1/4 md:left-1/3 text-xl md:text-2xl lg:text-3xl xl:text-5xl z-30'>
                Ops! Your cart is Empty
              </div>
              <div className='fixed top-1/4 md:top-auto md:left-1/3 flex justify-center items-center flex-col z-0'>
                <div className='drop-shadow-xl'>
                  <Lottie animationData={Empty} />
                </div>
              </div>
            </>
        }
      </div>
    </div >
  )
}

export default Orders