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

    console.log(localStorage.access_token)

    return (
        <section className="min-h-screen flex flex-col items-center">
            {error && (
                <div className="bg-red-200 text-red-800 p-2 rounded-md mb-4">
                    {error}
                </div>
            )}


            <div className="flex gap-2">
                <h1 className="text-5xl h-20 w-20 flex justify-center mb-4 p-3 bg-gray-300 rounded-full shadow-lg">
                    <FaUser className="text-gray-600" />
                </h1>
                <div>
                    <h2 className="text-3xl font-bold italic">{profile.name}</h2>
                    <p className="text-lg text-gray-600 italic mb-2">{profile.email}</p>
                </div>
            </div>
            <div className="mt-4">
                <div className="grid gap-x-20 grid-cols-1 lg:grid-cols-2 md:grid-cols-2">
                    <Template title={"Name"} content={profile.name} />
                    <Template title={"Email"} content={profile.email} />
                    <Template title={"Phone"} content={profile.phone_number} />
                    <Template title={"Cart"} content={`${cartLength} Products`} />
                </div>

            {/* user address Details */}

            <div className="mt-3">
                <h3 className="font-bold">Address Details</h3>
                <div className="grid gap-x-20 grid-cols-1 lg:grid-cols-2 md:grid-cols-2">
                    {profile.addresses?.lenght > 0 ? (
                        profile.addresses.map((data,index) => (
                            <Template key={index} title={"Street"} content={data.street_address}/>
                        ))
                    ) : (
                        <p>No Address</p>
                    )}
                </div>
            </div>

                <button onClick={() => {
                    localStorage.clear()
                    window.location.reload()
                }} className="bg-red-500 hover:bg-red-600 btn text-white w-full mt-3 mx-auto">Log Out</button>
            </div>


            

            {modalShow && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg w-96">
                        <div className="p-8">
                            <h2 className="text-2xl font-bold mb-4">Edit Address</h2>
                            <input
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring focus:border-blue-300"
                                placeholder="Enter your address"
                            />
                            <div className="flex justify-end">
                                <button className="btn btn-outline mr-2" onClick={() => setModalShow(false)}>Cancel</button>
                                <button className="btn btn-primary" onClick={() => handleAddressUpdate(address)}>Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}



        </section>
    );
}


function Template({ title, content }) {
    return (
        <div>
            <span className="h-8 w-32 p-2 flex items-center font-bold rounded-tr-full">{title}</span>
            <div className="h-12 w-72 p-2 flex items-center justify-center bg-gray-300 rounded-r-lg">
                <p className="font-bold text-xl">{content}</p>
            </div>
        </div>
    )
}

export default Profile;
