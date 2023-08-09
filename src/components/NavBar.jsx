import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <div className='h-[10vh] bg-white text-black'>
        <ul>
            <li>
                <Link to='/'>Home</Link>
                <Link to='/orders'>Orders</Link>
                <Link to='/order'>Place Order</Link>
            </li>
        </ul>
    </div>
  )
}

export default NavBar