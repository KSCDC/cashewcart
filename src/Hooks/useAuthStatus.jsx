import React, { useEffect, useState } from 'react';

function useAuthStatus() {
    const [loginStatus, setLoginStatus] = useState(false);

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (isLoggedIn === 'true') {
            setLoginStatus(true);
        } else {
            setLoginStatus(false);
        }
    }, []);

    return loginStatus;
}

export default useAuthStatus;
