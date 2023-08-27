import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { emailVerificationRoute } from '../APIutils/Apiroutes';

const AdminAuth = () => {

    const [otp, setOtp] = useState("");
    const [serverOtp, setServerOtp] = useState("");
    const [isOtpSend, setIsOtpSend] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem("user-details");
        localStorage.removeItem("zoggy-cart");
        localStorage.removeItem("zoggy-orders");
        if(localStorage.getItem('zoggy-admin'))
        {
            navigate('admin/control');
        }
    }, [])

    const sendOtp = (e) => {
        e.preventDefault();
        const email = "kathireshpalanisamy550@gmail.com";
        axios.post(emailVerificationRoute, {
            email: email
        })
            .then((data) => {
                toast.success("Otp send to admin email");
                setIsOtpSend(true);
                setServerOtp(data.data.otp);
                sessionStorage.setItem('zoggy-admin', true);
            })
            .catch((error) => {
                toast.error("Otp send failed");
                console.log("Error in sending otp " + error)
            })
    }

    const submitHandler = (e) => {
        e.preventDefault();
        if (otp === serverOtp) {
            toast.success("Redirecting....");
            setTimeout(() => {
                navigate('/admin/control');
            }, 3000)
        }
        else {
            toast.error("Otp is Invalid!!");
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
                        <div className='flex justify-center my-4 w-5/6 font-titilium text-2xl text-white'>
                            Admin
                        </div>
                        {
                            isOtpSend
                                ?
                                <>
                                    <input
                                        placeholder='Otp'
                                        type='password'
                                        className='border-b-2 mb-5 text-white font-comforta border-blue-500 focus:outline-none text-center bg-transparent mt-11'
                                        onChange={(e) => {
                                            setOtp(e.target.value);
                                        }}
                                    />
                                    <input type='submit' className='bg-[#13294c] text-white/50 font-medium text-lg px-5 py-2 rounded-md text-center' onClick={(e) => submitHandler(e)} />
                                </>
                                :
                                <>
                                    <button className='bg-white/10 hover:bg-green-400 px-3 rounded-md py-1 transition-all duration-200 ease-in-out delay-150 text-white hover:text-black'
                                        onClick={(e) => sendOtp(e)}>Send Admin OTP</button>
                                </>
                        }
                    </form>
                </div>
            </div>
        </>
    )
}

export default AdminAuth