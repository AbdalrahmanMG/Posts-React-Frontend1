import React from 'react'
import Style from './ProtectedRoute.module.css'
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute(props) {
    
    console.log(localStorage.getItem('userToken') !== null);

    if (localStorage.getItem('userToken') !== null) {
        return props.children
    } else{
        return <Navigate to={'/'}/>
    }

}
