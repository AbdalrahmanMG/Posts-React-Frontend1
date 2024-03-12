import React, { useContext, useEffect } from 'react'
import Style from './HomeLayout.module.css'
import Navbar from '../../components/Navbar/Navbar'
import { Link, Outlet } from 'react-router-dom'
import { authContext } from '../../context/AuthContext';

export default function HomeLayout() {

    let { setUserToken } = useContext(authContext)

    useEffect(() => {
        if (localStorage.getItem("userToken") !== null) {
            setUserToken(localStorage.getItem('userToken'))
        }
    }, [])


    return (
        <>
            <Navbar />
            <div className="container mt-10   mx-auto lg:px-24">
                <Outlet />
            </div>
        </>
    )
}
