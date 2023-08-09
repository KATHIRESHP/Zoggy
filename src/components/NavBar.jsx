import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
    return (
        <div className='h-[10vh] w-screen flex justify-center items-center text-white'>
            <ul className='w-10/12 flex justify-end'>
                <li className='flex w-4/12 md:w-6/12 lg:w-5/12 xl:w-4/12 justify-around'>
                    <Link to='/' className='relative group'>
                        Home
                        <span className='absolute bottom-0 left-0 w-0 h-[1px] bg-gradient-to-r from-[#0E325E] to-orange-500 transition-all duration-300 transform origin-left group-hover:w-full'></span>
                    </Link>
                    <Link to='/orders' className='relative group'>
                        Orders
                        <span className='absolute bottom-0 left-0 w-0 h-[1px] bg-gradient-to-r from-[#0E325E] to-orange-500 transition-all duration-300 transform origin-left group-hover:w-full'></span>
                    </Link>
                    <Link to='/order' className='relative group'>
                        Place Order
                        <span className='absolute bottom-0 left-0 w-0 h-[1px] bg-gradient-to-r from-[#0E325E] to-orange-500 transition-all duration-300 transform origin-left group-hover:w-full'></span>
                    </Link>
                    <Link to='/login' className='relative group'>
                        Logout
                        <span className='absolute bottom-0 left-0 w-0 h-[1px] bg-gradient-to-r from-[#0E325E] to-orange-500 transition-all duration-300 transform origin-left group-hover:w-full'></span>
                    </Link>
                </li>

            </ul>
        </div>
    )
}

export default NavBar