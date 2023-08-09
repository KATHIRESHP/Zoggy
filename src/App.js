import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'

const App = () => {
  return (
    <div className='bg-[#1a1a2e] '>
        <BrowserRouter>
            <Routes>
              <Route path='/auth'>
                <Route index element={<Login/>}/>
                <Route path='/auth/register' element={<Register/>}/>
              </Route>
              <Route path='/register' element={<Register/>}/>
              <Route path='/' element={<Home/>}/>
            </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App