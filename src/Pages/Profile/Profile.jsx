import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthStatus from "../../Hooks/useAuthStatus";
import { BACKEND_URL } from "../../constants/index";
import RefreshToken from "../../Hooks/RefreshToken";
import { FaUser } from "react-icons/fa";

function Profile() {
    const navigate = useNavigate();
    const isLoggedIn = useAuthStatus();
    const access_token = localStorage.getItem("access_token");

    const [profile, setProfile] = useState({});
    const [cartLength, setCartLength] = useState(0);
    const [modalShow, setModalShow] = useState(false);
    const [address, setAddress] = useState("");
    const [error, setError] = useState(null);
    console.log(localStorage.access_token)
    // Fetch user profile data
    async function fetchProfile() {
        try {
            const response = await fetch(`${BACKEND_URL}/api/user/profile/`, {
                method: "GET",
                headers: { "Authorization": `Bearer ${access_token}` }
            });
            if (!response.ok) {
                throw new Error("Failed to fetch user profile");
            }
            const data = await response.json();
            setProfile(data);
            setAddress(data.address || ""); // Set address from profile data
        } catch (error) {
            setError("Failed to fetch user profile. Please try again later.");
            console.error(error);
        }
    }

    // Fetch cart length
    async function fetchCartLength() {
        try {
            const response = await fetch(`${BACKEND_URL}/api/product/cart/list/`, {
                method: "GET",
                headers: { "Authorization": `Bearer ${access_token}` }
            });
            if (!response.ok) {
                throw new Error("Failed to fetch cart products");
            }
            const data = await response.json();
            setCartLength(data.count);
        } catch (error) {
            setError("Failed to fetch cart products. Please try again later.");
            console.error(error);
            setTimeout(() => {
                navigate("/login")
            }, 2000)
        }
    }

    useEffect(() => {
        RefreshToken()
        // If user is not logged in or there's no access token, redirect to login page
        if (!isLoggedIn && !access_token) {
            navigate("/login");
        } else {
            fetchProfile();
            fetchCartLength();
        }
    }, []);

    // Function to handle address update
    const handleAddressUpdate = async (newAddress) => {
        try {
            const response = await fetch(`${BACKEND_URL}/api/user/profile/address`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${access_token}`
                },
                body: JSON.stringify({ address: newAddress })
            });
            if (!response.ok) {
                throw new Error("Failed to update address");
            }
            setAddress(newAddress);
            setModalShow(false); // Close the modal after successful update
        } catch (error) {
            setError("Failed to update address. Please try again later.");
            console.error(error);
        }
    };


    const addressDetailsHeading = ["Street", "Region", "District"]
    return (
        <div className="min-h-screen flex flex-col items-center justify-center ">
            <div className="max-w-md w-full bg-white shadow-md rounded-lg overflow-hidden">
                <div className="px-6 py-4">
                    <div className="flex items-center justify-center">
                        <FaUser className="text-5xl text-gray-600" />
                    </div>
                    <div className="text-center mt-4">
                        <h2 className="text-xl font-semibold text-gray-800">{profile.name}</h2>
                        <p className="text-sm text-gray-600">{profile.email}</p>
                    </div>
                </div>
                <div className="px-6 py-4">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <ProfileItem title="Name" content={profile.name} />
                        <ProfileItem title="Email" content={profile.email} />
                        <ProfileItem title="Phone" content={profile.phone_number} />
                        <ProfileItem title="Cart" content={`${cartLength} Products`} />
                    </div>
                    <div className="border-t border-gray-200 pt-4">
                        <h3 className="text-lg font-semibold mb-2">Address Details</h3>
                        <div className="grid grid-cols-1 gap-2">
                            {profile.addresses?.map((address, index) => (
                                <div key={index}>
                                    <p className="font-bold underline underline-offset-2">Address {index+1}</p>
                 
                                    <div className="flex items-center gap-8">
                                    <div className="font-semibold text-gray-700">Street:</div>
                                    <div className="text-gray-800">{address.street_address}</div>

                                    </div>
                                    <div className="flex items-center gap-8">
                                    <div className="font-semibold text-gray-700">Region:</div>
                                    <div className="text-gray-800">{address.region}</div>

                                    </div>
                                    <div className="flex items-center gap-8">
                                    <div className="font-semibold text-gray-700">District:</div>
                                    <div className="text-gray-800">{address.district}</div>
                                    </div>

                                    <div className="flex items-center gap-8">
                                    <div className="font-semibold text-gray-700">State:</div>
                                    <div className="text-gray-800">{address.state}</div>
                                    </div>
                                    <div className="flex items-center gap-8">
                                        <div className="font-semibold text-gray-700">Pin Code: </div>
                                        <div className="text-gray-800">{address.postal_code}</div>
                                    </div>
                                  
                                    {/* Add more address details here if needed */}
                                </div>
                            ))}
                            {profile.addresses?.length === 0 && (
                                <p className="text-gray-500">No Address</p>
                            )}
                        </div>
                    </div>

                </div>
                <div className="px-6 py-4 bg-gray-100 border-t border-gray-200 flex justify-end">
                    <button onClick={() => {
                        localStorage.clear();
                        window.location.reload();
                    }} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">Log Out</button>
                </div>
            </div>
        </div>
    );
}

function ProfileItem({ title, content }) {
    return (
        <>
            <div className="font-semibold text-gray-700">{title}</div>
            <div className="text-gray-800">{content}</div>
        </>
    );
}

export default Profile;
