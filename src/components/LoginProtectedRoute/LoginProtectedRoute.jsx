import React from 'react'
import Style from './LoginProtectedRoute.module.css'
import { Navigate } from 'react-router-dom';

export default function LoginProtectedRoute(props) {
    
    if (localStorage.getItem('userToken') == null) {
        return props.children
    } else{
        return <Navigate to={'/'}/>
    }
}
