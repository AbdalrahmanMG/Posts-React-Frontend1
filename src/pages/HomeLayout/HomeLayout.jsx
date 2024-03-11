import React, {  useContext, useEffect } from 'react'
import Style from './HomeLayout.module.css'
import Navbar from '../../components/Navbar/Navbar'
import { Link, Outlet } from 'react-router-dom'
import { Button } from 'flowbite-react';
import { authContext } from '../../context/AuthContext';

export default function HomeLayout() {

    let { setUserToken } = useContext(authContext)

    useEffect(() => {
        if (localStorage.getItem("userToken") !== null) {
            setUserToken(localStorage.getItem('userToken'))
            console.log("I am in homeLayout ..🥓");
        }
    },[])


    return (
        <>
            <div className='relative'>
                <Navbar />
                <div className="container mt-10  min-h-screen mx-auto lg:px-24">
                <Outlet />
                </div>
                <Link className='fixed bottom-10 right-10 rounded-full' to="/addproduct"><Button pill gradientMonochrome="cyan" >+</Button></Link>
            </div>
        </>
    )
}
