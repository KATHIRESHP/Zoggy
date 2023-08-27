import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const AdminNav = () => {
    
    const [show, setShow] = useState(false);

    const links = [
        { name: "Home", link: "/" },
        { name: "Add", link: "/admin/additem" },
        { name: "Remove", link: "/admin/removeitem" },
        { name: "Logout", link: "/auth" },
    ]
  return (
    <>
            <div className='bg-white md:flex md:justify-between md:items-center font-comforta text-black py-3 sticky top-2 w-screen shadow-xl shadow-orange-950 z-50'>
                <div className='flex gap-1 md:gap-4 ml-4 text-lg md:text-3xl justify-start items-center'>
                    <span className='bg-gradient-to-r from-[#0E325E] to-orange-500 py-2 px-4 rounded-full font-serif font-bold text-white/80'><i class="bi bi-person-fill"></i></span>
                    Admin
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
                <div className={`flex flex-col md:flex-row md:w-8/12 lg:w-6/12 xl:w-5/12 md:justify-evenly md:items-center font-poppins absolute md:static w-screen transition-all ease-in-out duration-500 ${show ? "" : "-top-[500px]" }`}>
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

export default AdminNav