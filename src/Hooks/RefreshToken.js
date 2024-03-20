import { BACKEND_URL } from "../constants";

export default function RefreshToken() {
    const refreshToken = localStorage.getItem("refresh_token");

    if (!refreshToken) {
        console.log("Refresh token not found in localStorage.");
        return;
    }

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ refresh_token: refreshToken })
    };

    fetch(`${BACKEND_URL}/api/user/token/refresh/`, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to refresh token');
            }
            return response.json();
        })
        .then(data => {
            // Assuming the response includes new access and refresh tokens
            const { access_token, refresh_token } = data;
            
            // Update tokens in localStorage
            localStorage.setItem("access_token", access_token);
            localStorage.setItem("refresh_token", refresh_token);

            console.log("Token refreshed successfully");
        })
        .catch(error => {
            console.error('Error refreshing token:', error.message);
        });
}
