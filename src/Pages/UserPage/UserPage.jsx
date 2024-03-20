import { useEffect, useState } from 'react';
import axios from 'axios';
import useAuthStatus from '../../Hooks/useAuthStatus';
import Error from "../../Components/Error";
import { BACKEND_URL } from '../../constants';

export default function UserPage() {
    const isLoggedIn = useAuthStatus();
    const [userData, setUserData] = useState(null);
    const accessToken = localStorage.getItem('access_token');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/user/profile/`, {
                    data: {
                        access_token: accessToken
                    }
                });
                console.log(response.data);
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    // Access token expired, try to refresh token
                    try {
                        const refreshToken = localStorage.getItem('refresh_token');
                        const refreshResponse = await axios.post(`${BACKEND_URL}/api/refresh_token/`, {
                            refresh_token: refreshToken
                        });
                        // Update access token in localStorage
                        localStorage.setItem('access_token', refreshResponse.data.access_token);
                        // Retry fetching user data with new access token
                        const retryResponse = await axios.get(`${BACKEND_URL}/api/user/profile/`, {
                            data: {
                                access_token: refreshResponse.data.access_token
                            }
                        });
                        console.log(retryResponse.data);
                    } catch (refreshError) {
                        console.error("Error refreshing token:", refreshError);
                        // Handle refresh token failure, maybe redirect to login page
                    }
                } else {
                    console.error("Error fetching user data:", error);
                    // Handle other errors, maybe show an error message to the user
                }
            }
        };

        if (isLoggedIn) {
            fetchData();
        }
    }, [isLoggedIn, accessToken]);

    if (!isLoggedIn) return <Error />;
    return (
        <main className="min-h-screen">Hello</main>
    );
}
