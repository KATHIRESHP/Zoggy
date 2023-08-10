import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
    const [user, setUser] = useState();
    const [show, setShow] = useState(false);
    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("user-details")))
    }, [])

    const links = [
        { name: "Home", link: "/" },
        { name: "Your Order", link: "/orders" },
        { name: "Explore", link: "/order" },
        { name: "Logout", link: "/auth" },
    ]

    return (
        <>
            <div className='bg-white md:flex md:justify-between md:items-center font-comforta text-black py-3 sticky top-2 w-screen shadow-xl shadow-orange-950 z-50'>
                <div className='flex gap-1 md:gap-4 ml-4 text-lg md:text-3xl justify-start items-center'>
                    <span className='bg-gradient-to-r from-[#0E325E] to-orange-500 py-2 px-4 rounded-full font-serif font-bold text-white/80'>{user?.username[0]}</span>
                    {user?.username}
                </div>
                <button className='text-3xl top-3 right-6 absolute md:hidden'
                        onClick={() => setShow(!show)}
                >
                    {
                        show 
                        ?
                        <i class="bi bi-x-lg"></i>
                        :
                        <i class="bi bi-list"></i>
                    }
                </button>
                <div className={`flex flex-col md:flex-row md:w-7/12 lg:w-5/12 xl:w-4/12 md:justify-evenly md:items-center font-poppins absolute md:static w-screen transition-all ease-in-out duration-500 ${show ? "" : "-top-[500px]" }`}>
                    {
                        links.map((link, index) => {
                            return (
                                <Link to={link.link} className='md:ml-4 hover:text-orange-600 transition-all origin-right duration-500 bg-white flex justify-center py-4'>{link.name}</Link>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default NavBar