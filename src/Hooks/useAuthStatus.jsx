import React, { useEffect, useState } from 'react'

function useAuthStatus() {
    const [loginStatus,setLoginStatus] = useState()
    useEffect(() => {setLoginStatus(localStorage.isLoggedIn)},[])
  return loginStatus
}

export default useAuthStatus