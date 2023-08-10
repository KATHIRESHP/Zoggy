import React, { useEffect, useState } from 'react'
import NavBar from './NavBar'
import { useNavigate } from 'react-router-dom';
const Orders = () => {
  const navigate = useNavigate();
    const [user, setUser] = useState(undefined);
    useEffect(() => {
        if (!localStorage.getItem('user-details')) {
            console.log("redirecting")
            navigate('/auth');
        }
        else
        {
          setUser(JSON.parse(localStorage.getItem("user-details")));
        }
    },[])
  return (
    <div className='h-screen text-white/80'>
      <NavBar />
    </div>
  )
}

export default Orders