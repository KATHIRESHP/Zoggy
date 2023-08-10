import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { Carousel } from "@material-tailwind/react";

const Home = () => {

  const navigate = useNavigate();
  const [user, setUser] = useState("");
  useLayoutEffect(() => {
    if (!localStorage.getItem('user-details')) {
      console.log("redirecting")
      navigate('/auth');
    }
    else {
      setUser(JSON.parse(localStorage.getItem("user-details")));
    }
  }, [])
  return (
    <div className='h-screen text-white/80 flex flex-col'>
      <NavBar />
      <div className='mt-[10vh] '>
        <div id="thumbnail-slider" class="mb-12 lg:mb-6 nav-inset-button carousel -mx-2" data-flickity='{ "cellAlign": "left", "wrapAround": true, "draggable": false, "adaptiveHeight": true, "prevNextButtons": true , "imagesLoaded": true }'>
          <div class="max-w-full w-full px-2">
            <img alt="title" class="w-full h-auto max-w-auto" src="src/img-min/project/project_1.jpg"/>
          </div>
          <div class="max-w-full w-full px-2">
            <img alt="title" class="w-full h-auto max-w-auto" src="src/img-min/project/project_2.jpg"/>
          </div>
          <div class="max-w-full w-full px-2">
            <img alt="title" class="w-full h-auto max-w-auto" src="src/img-min/project/project_3.jpg"/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home