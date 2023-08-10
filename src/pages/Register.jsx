import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast, { Toaster, useToasterStore } from 'react-hot-toast';
import axios from 'axios';
import { emailVerificationRoute, registerRoute } from '../APIutils/Apiroutes';

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");
    const [isOtpSend, setIsOtpSend] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);
    const [otp, setOtp] = useState("");
    const [otpFromServer, setOtpFromServer] = useState("");
    const navigate = useNavigate();
    const pwdWarnRef = useRef();

    const submitHandler = (e) => {
        e.preventDefault();
        const password_regex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~])(.{8,})$/;
        if (password_regex.test(password)) {
            axios.post(registerRoute, { name: name, email: email, password: password })
                .then((data) => {
                    if(data.data.status)
                    {
                        localStorage.setItem("user-details",  JSON.stringify(data.data.user));
                        toast.success("Successfull :) \nRedirecting...");
                        setTimeout(() => {
                            navigate('/');
                        }, 4000);
                    }
                    else
                    {
                        toast.error(data.data.msg);
                    }
                })
                .catch((error) => {
                    toast.error("Error in creating user");
                    console.log(JSON.stringify(error));
                })

        }
        else {
            pwdWarnRef.current.classList.remove("invisible");
            toast.error("Your password is not valid");
        }
    }

    const sendOtpHandler = (e) => {
        e.preventDefault();
        const email_regex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
        if (email_regex.test(email)) {
            axios.post(emailVerificationRoute, {
                email: email
            })
                .then((data) => {
                    toast.success("Otp send success");
                    setIsOtpSend(true);
                    setOtpFromServer(data.data.otp);
                })
                .catch((error) => {
                    toast.error("Otp send failed");
                    console.log("Error in sending otp " + error)
                })
        }
        else {
            toast.error('Email is not valid');
        }
    }

    const verifyOtp = (e) => {
        e.preventDefault();
        if (otp === otpFromServer && otp) {
            setOtpVerified(true);
            toast.success("Otp is valid");
        }
        else {
            toast.error("Invalid otp :( ");
        }
    }
    return (
        <>
            <div className='h-screen w-screen bg-[#1a1a2e] flex flex-col justify-center items-center'>
                <div className='w-11/12 relative md:w-8/12 lg:w-6/12 xl:w-3/12 flex justify-center items-center'>
                    <div className='h-[150px] w-[150px]  bg-gradient-to-r from-[#0E325E] to-orange-500 rounded-full absolute -top-11 -left-11'></div>
                    <div className='h-[150px] w-[150px]  bg-gradient-to-l from-[#0E325E] to-orange-500 rounded-full absolute -bottom-11 -right-11'></div>
                    <form className='relative py-6 w-full backdrop-blur-sm rounded-lg bg-white/10 shadow-lg shadow-black  px-6 flex flex-col justify-center items-center'>
                        <div className='text-3xl mt-4 text-white/80 font-titilium'>Sign up</div>
                        <input
                            placeholder='Name'
                            type='text'
                            className='border-b-2 text-white font-comforta border-blue-500 focus:outline-none text-center bg-transparent mt-11'
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                        />
                        {
                            otpVerified ?
                                <>
                                    <input
                                        placeholder='Password'
                                        type='password'
                                        value={password}
                                        className='border-b-2 text-white font-comforta border-blue-500 focus:outline-none text-center bg-transparent mt-9'
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                        }}
                                    />
                                    <span ref={pwdWarnRef} className='mb-9 text-red-600 invisible'>
                                        <marquee>Atleast 1 special character, number and caps with length of 8</marquee>
                                    </span>
                                    <input type='submit' className='bg-[#13294c] text-white/50 font-medium text-lg px-5 py-2 rounded-md text-center' onClick={submitHandler} />
                                </> 
                                :
                                <>

                                    {
                                        isOtpSend
                                            ?
                                            <>
                                                <input
                                                    placeholder='Otp'
                                                    type="text"
                                                    value={otp}
                                                    className='text-white font-comforta border-b-2 border-blue-500 focus:outline-none text-center bg-transparent mt-11'
                                                    onChange={(e) => {
                                                        setOtp(e.target.value);
                                                    }}
                                                />
                                                <button className='bg-[#13294c] text-white/50 font-medium text-lg px-5 py-2 rounded-md text-center mt-9'
                                                    onClick={verifyOtp}
                                                >Verify</button>
                                            </>
                                            :
                                            <>
                                                <input
                                                    placeholder='Email'
                                                    type="email"
                                                    value={email}
                                                    className='text-white font-comforta border-b-2 border-blue-500 focus:outline-none text-center bg-transparent mt-11'
                                                    onChange={(e) => {
                                                        setEmail(e.target.value);
                                                    }}
                                                />
                                                <button className='bg-[#13294c] text-white/50 font-medium text-lg px-5 py-2 rounded-md text-center mt-9' onClick={sendOtpHandler}>Send Otp</button>
                                            </>
                                    }
                                </>
                        }
                        <button className='text-blue-500 mt-4' onClick={() => navigate('/auth')}>Already have an account?</button>
                    </form>
                </div>
            </div>
            <Toaster />
        </>
    )
}

export default Register