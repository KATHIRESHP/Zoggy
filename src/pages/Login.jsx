import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const pwdWarnRef = useRef()

    const submitHandler = (e) => {
        e.preventDefault();
        const email_regex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/ ;
        const password_regex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~])(.{8,})$/;
        if(email_regex.test(email))
        {
            if(password_regex.test(password))
            {
            }
            else
            {
                pwdWarnRef.current.classList.remove("invisible");
                toast.error("Your password is not valid");
            }
        }
        else
        {
            toast.error('Email is not valid');
        }

    }
    return (
        <>
        <Toaster />
            <div className='h-screen w-screen bg-[#1a1a2e] flex flex-col justify-center items-center'>
                <div className='w-11/12 relative md:w-8/12 lg:w-6/12 xl:w-3/12 flex justify-center items-center'>
                    <div className='h-[150px] w-[150px]  bg-gradient-to-r from-[#0E325E] to-orange-500 rounded-full absolute -top-11 -left-11'></div>
                    <div className='h-[150px] w-[150px]  bg-gradient-to-l from-[#0E325E] to-orange-500 rounded-full absolute -bottom-11 -right-11'></div>
                    <form className='relative py-6 w-full backdrop-blur-sm rounded-lg bg-white/10 shadow-sm shadow-black  px-6 flex flex-col justify-center items-center'>
                        <div className='text-3xl mt-4 text-white/80 font-titilium'>Sign in</div>
                        <input
                            placeholder='Email'
                            type="email"
                            className='text-white font-comforta border-b-2 border-blue-500 focus:outline-none text-center bg-transparent mt-11'
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                        />
                        <input
                            placeholder='Password'
                            type='password'
                            className='border-b-2 text-white font-comforta border-blue-500 focus:outline-none text-center bg-transparent mt-11'
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        />
                        <span ref={pwdWarnRef} className='mb-6 text-red-600 invisible'>
                            <marquee>Atleast 1 special character, number and caps with length of 8</marquee>
                        </span>
                        <input type='submit' className='bg-[#13294c] text-white/50 font-medium text-lg px-5 py-2 rounded-md text-center' onClick={(e) => submitHandler(e)}/>
                        <button className='text-blue-500 mt-4' onClick={() => navigate('/auth/register')}>Want to create?</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login