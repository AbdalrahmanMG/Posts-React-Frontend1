import React, { createContext, useState } from "react";
import { useNavigate } from 'react-router-dom';

export const authContext = createContext();

export default function AuthContextProvider(myProps){

    //to want login function to be here instead of beign in Navbar component
    
    // let navigate = useNavigate()
    // function logOut () {
    //     localStorage.removeItem('userToken')
    //     setUserToken(null)
    //     // navigate("/login") // useNavigate and useHistory dosen't work
    // }
    
    const [userToken , setUserToken] = useState(null)
    return <authContext.Provider value={{userToken, setUserToken}}>
        { myProps.children }
    </authContext.Provider>
} 