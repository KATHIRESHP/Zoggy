import React from 'react'
import {BrowserRouter, Outlet, Route, Routes} from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Orders from './components/Orders'
import Order from './components/Order'
import NavBar from './components/NavBar'

const App = () => {
  return (
    <div className='bg-[#1a1a2e] relative'>
        <BrowserRouter>
            <Routes>
              <Route path='/'>
                <Route index element={<Home/>}/>
                <Route path='/orders' element={<Orders/>}/>
                <Route path='/order' element={<Order/>}/>
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