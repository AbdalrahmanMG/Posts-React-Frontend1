import React, { createContext, useState } from "react";

export const authContext = createContext();

export default function AuthContextProvider(myProps){
    
    const [userToken , setUserToken] =useState(null)
    return <authContext.Provider value={{userToken, setUserToken}}>
        { myProps.children }
    </authContext.Provider>
} 