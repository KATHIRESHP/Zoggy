import React, { useEffect, useState } from 'react'
import NavBar from './NavBar'
import { useNavigate } from 'react-router-dom';
import briyani from '../asssets/briyani.jpeg'
import parota from '../asssets/parota.jpeg'
import kalaki from '../asssets/kalaki.jpeg'
import omelete from '../asssets/omelete.jpg'
import halfboil from '../asssets/halfboil.png'

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
      if (localStorage.getItem('zoggy-cart'))
      {
        const temp = JSON.parse(localStorage.getItem('zoggy-cart'));
        for(let i = 0;i < temp.length; i++)
        {
          for(let j = 0;j < items.length; j++)
          {
            if(items[j].name == temp[i].name)
            {
              items[j].count = temp[i].count;
            }
          }
        }
      }
    }
  }, [])

  const increaseCount = (index) => {
    const temp = [...items];
    temp[index].count += 1;
    setItems(temp);
  }

  const reduceCount = (index) => {
    const temp = [...items];
    temp[index].count -= 1;
    setItems(temp);
  }

  const addToCart = (e) => {
    const temp = items.filter((item) => item.count > 0);
    localStorage.setItem('zoggy-cart', JSON.stringify(temp));
  }
  return (
    <div className='h-screen text-white/80 overflow-auto'>
      <NavBar />
      <div className='h-full m-5 '>
        {
          items.map((item, index) => {
            return (
              <>
                <div className='flex bg-slate-500 my-4 py-5 rounded-md' key={index}>
                  <div className='w-4/12 flex justify-center items-center'>
                    <img
                      src={item.src}
                      className='w-9/12 md:w-6/12 rounded-lg shadow-md shadow-black'
                    />
                  </div>
                  <div className='w-4/12 text-white gap-3 md:gap-5 lg:gap-7 xl:gap-11 flex flex-col justify-center'>
                    <div className='flex justify-center font-titilium text-lg md:text-2xl font-semibold'>
                      <span>{item.name}</span>
                    </div>
                    <div className='flex justify-around font-poppins text-lg md:text-2xl'>
                      <span>Price : </span>
                      <span>₹{item.count > 0 ? item.count * item.price: item.price}</span>
                    </div>
                  </div>
                  <div className='w-4/12 text-black flex font-serif md:text-lg flex-col justify-center items-center gap-3 md:gap-5 lg:gap-7 xl:gap-11'>
                    <div className='w-full flex flex-col md:flex-row justify-center gap-3 md:gap-5 lg:gap-7 xl:gap-11'>
                      <button
                        className='hover:bg-green-500 rounded-md bg-white/20 px-1 md:px-4 py-1'
                        onClick={() => increaseCount(index)}
                      >
                        ADD
                      </button>
                      {
                        item.count > 0 &&
                        <button
                          className='hover:bg-red-500 rounded-md  bg-white/20 px-1 md:px-4 py-1'
                          onClick={() => reduceCount(index)}
                        >
                          Reduce
                        </button>
                      }
                    </div>
                    <div>
                      Count: {item.count}
                    </div>
                  </div>
                </div>
              </>
            )
          })
        }
        <div className=' flex justify-center'>
          <button className='bg-orange-700 py-2 px-5 font-poppins rounded-md mb-5'
            onClick={(e) => addToCart(e)}
          ><i class="bi bi-cart-plus-fill"></i> Add to Cart</button>
        </div>
      </div>
    </div>
  )
}

export default Order