import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

function useTokenExpirationCheck() {
    const [isTokenExpired, setIsTokenExpired] = useState(false);

    useEffect(() => {
        // Get the access token from localStorage
        let access_token = localStorage.getItem("access_token");

        // Check if access_token is not null or undefined
        if (access_token) {
            // Decode the access token
            let tokenData = jwtDecode(access_token);
            let expirationTime = new Date(tokenData.exp * 1000); // Convert Unix timestamp to milliseconds
            let currentTime = new Date();
            setIsTokenExpired(expirationTime < currentTime);
        } else {
            // If access_token is not available, set isTokenExpired to false or another default value
            setIsTokenExpired(false);
        }
    }, []);

    return isTokenExpired;
}

export default useTokenExpirationCheck;
