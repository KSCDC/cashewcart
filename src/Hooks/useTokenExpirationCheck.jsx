import React, { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode';
function useTokenExpirationCheck() {
    const [isTokeExpired,setIsTokenExpired] = useState(false)
    useEffect(() => {
           // testing the access token is expired or not
    let access_token = localStorage.getItem("access_token");
    let tokenData = jwtDecode(access_token);
    let expirationTime = new Date(tokenData.exp * 1000); // Convert Unix timestamp to milliseconds
    let currentTime = new Date();
    setIsTokenExpired(expirationTime < currentTime)
    },[])
  return isTokeExpired
}

export default useTokenExpirationCheck