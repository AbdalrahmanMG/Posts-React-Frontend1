import React, { useContext, useEffect } from 'react'
import Style from './Navbar.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from 'flowbite-react';
// import { authContext } from '../../context/AuthContext';
import { useAuth } from '../../Hooks/useAuth';


export default function Navbar() {
    let { userToken , logout} = useAuth()
    let navigate = useNavigate()

    // useEffect(()=>{
    //     console.log('User token in navbar' , userToken);
    // },[userToken])

    // function logOut() {
    //     localStorage.removeItem('userToken')
    //     setUserToken(null)
    //     navigate("/login")
    // }

    console.log("🍖",userToken);

    return (
        <div className="navbar  sticky top-0 start-0 left-0 z-50  shadow-zinc-100 shadow-lg bg-zinc-50 px-6 py-3">
            <div className="navbar-start">
                <Link to='/' className="btn btn-ghost text-xl">ShopyCo</Link>
            </div>

            <div className="navbar-center lg:flex hidden sm:block">
                <ul className="">
                    <li><Link to={'/'}>Home</Link></li>
                </ul>
            </div>

            <div className="navbar-end gap-2">

                {userToken == null ?
                    <>
                        <Link to="/login"><Button outline gradientDuoTone="pinkToOrange">Login</Button> </Link>
                        <Link to="/register"><Button outline gradientDuoTone="redToYellow">Register</Button></Link>
                    </>
                    :
                    <Button onClick={logout} gradientMonochrome="failure">Logout</Button>
                }
            </div>
        </div>
    )
}
