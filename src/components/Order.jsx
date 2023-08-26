import React, { useEffect, useState } from 'react'
import NavBar from './NavBar'
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import briyani from '../asssets/briyani.jpeg'
import parota from '../asssets/parota.jpeg'
import kalaki from '../asssets/kalaki.jpeg'
import omelete from '../asssets/omelete.jpg'
import halfboil from '../asssets/halfboil.png'
import axios from 'axios';
import { updateCart } from '../APIutils/Apiroutes';

const Order = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(undefined);
  const [items, setItems] = useState([
    {
      name: "Briyani",
      price: 100,
      src: briyani,
      count: 0
    },
    {
      name: "Parota",
      price: 20,
      src: parota,
      count: 0
    },
    {
      name: "Omelete",
      price: 20,
      src: omelete,
      count: 0
    },
    {
      name: "Kalaki",
      price: 20,
      src: kalaki,
      count: 0
    },
    {
      name: "Half Boil",
      price: 20,
      src: halfboil,
      count: 0
    }
  ]);

  useEffect(() => {
    if (!localStorage.getItem('user-details')) {
      console.log("redirecting")
      navigate('/auth');
    }
    else {
      setUser(JSON.parse(localStorage.getItem("user-details")));
      if (localStorage.getItem('zoggy-cart')) {
        const temp = JSON.parse(localStorage.getItem('zoggy-cart'));
        for (let i = 0; i < temp.length; i++) {
          for (let j = 0; j < items.length; j++) {
            if (items[j].name == temp[i].name) {
              items[j].count = temp[i].count;
            }
          }
        }
      }
    }
  }, [])

  const increaseCount = (index) => {
    toast.success("Update the cart", {
      duration: 1000
    });
    const temp = [...items];
    temp[index].count += 1;
    setItems(temp);
  }

  const reduceCount = (index) => {
    const temp = [...items];
    if(temp[index].count > 0)
    {
      toast.success("Update the cart", {
        duration: 1000
      });
      temp[index].count -= 1;
      setItems(temp);
    }
    else
      toast.error("Item not in the cart", {
    duration: 500});
  }

  const addToCart = (e) => {
    const temp = items.filter((item) => item.count > 0);
    localStorage.setItem('zoggy-cart', JSON.stringify(temp));
    toast.success("Cart updated successfully :)");
    
    axios.post(updateCart, {
      email: user.email,
      items: temp
    })
    .then((data) => {
      console.log(data.data);
    })
    .catch((e) => {
      console.log("Error in updating cart data");
    })
  }
  return (
    <div className='h-screen text-white/80 overflow-auto'>
      <Toaster />
      <NavBar />
      <div className='h-full m-5 relative'>
        <div className=' flex justify-center mt-3 md:mt-6 lg:mt-11'>
          <button className='bg-orange-700 py-2 px-5 font-poppins rounded-md mb-5 fixed z-40'
            onClick={(e) => addToCart(e)}
          ><i class="bi bi-cart-plus-fill"></i> Update Cart</button>
        </div>
        <div className='h-full gap-2 grid grid-cols-1 md:grid-cols-2 m-5 pb-11 z-0'>
          {
            items.map((item, index) => {
              return (
                <>
                  <div className='flex justify-center my-4 rounded-md ' key={index}>
                    <div className='group w-full md:w-9/12 lg:w-6/12 aspect-square flex justify-center items-center  relative  transition-all duration-800 ease-in-out '>
                      <img
                        src={item.src}
                        className='z-0 w-full h-full group-hover:rounded-md group-hover:scale-110 transition-transform duration-500 ease-in-out'
                      />
                      <div className='absolute w-full group-hover:opacity-100 transform flex justify-around z-40 gap-3 text-2xl opacity-0'>
                        <button className='bg-white/20 text-[#1a1a2e] font-comforta font-medium py-1 md:py-2 px-2 md:px-4 hover:bg-red-600  group-hover:scale-100 scale-0 transition-all ease-in-out duration-700 rounded-sm'
                          onClick={() => reduceCount(index)}
                        ><i class="bi bi-bag-dash-fill"></i></button>
                        <button className='bg-white/20 text-[#1a1a2e] font-comforta font-medium py-2 px-4 hover:bg-green-600  group-hover:scale-100 scale-0 transition-all ease-in-out duration-700 rounded-sm'
                          onClick={() => increaseCount(index)}><i class="bi bi-bag-plus-fill"></i></button>
                      </div>
                      <div className='absolute group-hover:opacity-100 opacity-0 bottom-3'>
                        <div className='cursor-not-allowed bg-[#1a1a2e] py-0 md:py-1 px-2 md:px-4 rounded font-Tektur group-hover:scale-150 transition-all ease-in-out duration-500'>
                          Nos: <span>{item.count}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Order