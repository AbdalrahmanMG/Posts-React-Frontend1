// import { useEffect, useState } from "react";

// export default function useCustomAuth() {
//     const [userToken, setUserToken] = useState(null);

//   useEffect(() => {
//     const storedToken = localStorage.getItem("userToken");
//     console.log("Stored token:", storedToken);
//     if (storedToken) {
//       setUserToken(storedToken);
//     }
//   }, []);

//   const login =(userToken)=>{
//     localStorage.setItem('userToken', userToken)
//     setUserToken(userToken)
//     console.log("Logged in. Token:", userToken);
// }

//   const logout =()=>{
//     localStorage.removeItem('userToken')
//     setUserToken(null)
//     console.log("Logged out.");
//   }

//   return {userToken, login , logout}
// }


