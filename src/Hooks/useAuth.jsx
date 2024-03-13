import React, { createContext, useContext, useEffect, useState } from "react";

const authContext = createContext();

export function AuthProvider({ children }) {
  const auth = useProviderAuth();
  console.log("children",children);
  console.log("auth",auth);
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export function useAuth() {
  return useContext(authContext);
}

function useProviderAuth() {
  const [userToken, setUserToken] = useState(null);

    useEffect(() => {
    const storedToken = localStorage.getItem("userToken");
    console.log("Stored token:", storedToken);
    if (storedToken) {
      setUserToken(storedToken);
    }
  }, []);

  const login = (userToken) => {
    localStorage.setItem("userToken", userToken);
    setUserToken(userToken);
    console.log("Logged in. Token:", userToken);
  };

  const logout = () => {
    localStorage.removeItem("userToken");
    setUserToken(null);
    console.log("Logged out.");
  };

  console.log("coming from useAuth", userToken);
  return { userToken, login, logout };
}
