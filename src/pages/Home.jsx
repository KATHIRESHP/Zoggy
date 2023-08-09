import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';

const Home = () => {
    
    const navigate = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem('user-details')) {
            console.log("redirecting")
            navigate('/auth');
        }
    },[])
  return (
    <div className='h-screen text-white/80'>

    </div>  
  )
}

export default Home