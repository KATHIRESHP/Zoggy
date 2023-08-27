import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { loginRoute } from '../APIutils/Apiroutes';

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const pwdWarnRef = useRef()

    useEffect(() => {
        localStorage.removeItem("user-details");
        localStorage.removeItem("zoggy-cart");
        localStorage.removeItem("zoggy-orders");
    }, [])

    const submitHandler = (e) => {
        e.preventDefault();
        const email_regex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
        const password_regex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~])(.{8,})$/;
        if (email_regex.test(email)) {
            if (password_regex.test(password)) {
                axios.post(loginRoute, {
                    email: email,
                    password: password
                })
                    .then((data) => {
                        if (data.data.status == true) {
                            toast.success("Login success");
                            console.log(JSON.stringify(data.data));
                            localStorage.setItem("user-details", JSON.stringify(data.data.user));
                            setTimeout(() => {
                                navigate('/');
                            }, 4000)
                        }
                        else {
                            toast.error(data.data.msg);
                        }
                    })
                    .catch((error) => {
                        toast.success("Error in sending login request");
                        console.log(error);
                    })
            }
            else {
                pwdWarnRef.current.classList.remove("invisible");
                toast.error("Your password is not valid");
            }
        }
        else {
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
                    <form className='relative py-6 w-full backdrop-blur-sm rounded-lg bg-white/10 shadow-lg shadow-black  px-6 flex flex-col justify-center items-center'>
                        <div className='flex justify-between w-5/6 font-titilium '>
                            <div className='text-2xl flex items-center justify-center'>Sign in</div>
                            <button className='text-2xl flex justify-center items-center text-orange-700 gap-3 bg-white/10 px-2 rounded hover:bg-gradient-to-r from-orange-400 to-[#0E325E] hover:text-white/50 transition-all duration-300 delay-150 ease-linear'
                                onClick={() => {
                                    navigate('/admin/auth')
                                }}>
                                <i class="bi bi-person-check"></i>
                                <span>Admin</span>
                            </button>
                        </div>
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
                        <input type='submit' className='bg-[#13294c] text-white/50 font-medium text-lg px-5 py-2 rounded-md text-center' onClick={(e) => submitHandler(e)} />
                        <button className='text-blue-500 mt-4' onClick={() => navigate('/auth/register')}>Want to create?</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login