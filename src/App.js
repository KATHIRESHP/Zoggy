import React from 'react'
import {BrowserRouter, Outlet, Route, Routes} from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Cart from './components/Cart'
import Order from './components/Order'
import YourOrder from './pages/YourOrder'

const App = () => {
  return (
    <div className='bg-[#1a1a2e] relative'>
        <BrowserRouter>
            <Routes>
              <Route path='/'>
                <Route index element={<Home/>}/>
                <Route path='/cart' element={<Cart/>}/>
                <Route path='/order' element={<Order/>}/>
                <Route path='/yourorder' element={<YourOrder/>}/>
              </Route>
              <Route path='/auth'>
                <Route index element={<Login/>}/>
                <Route path='/auth/register' element={<Register/>}/>
              </Route>
            </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App