import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Home = () => {
    
    const navigate = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem('user-details')) {
            console.log("redirecting")
            navigate('/auth');
        }
    },[])
  return (
    <div>Home</div>
  )
}

export default Home