import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthStatus from "../../Hooks/useAuthStatus";
import { BACKEND_URL } from "../../constants/index";
import RefreshToken from "../../Hooks/RefreshToken";
import { FaUser, FaTrash } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
function Profile() {
    const navigate = useNavigate();
    const isLoggedIn = useAuthStatus();
    const access_token = localStorage.getItem("access_token");

    const [profile, setProfile] = useState({});
    const [cartLength, setCartLength] = useState(0);
    const [modalShow, setModalShow] = useState(false);
    const [address, setAddress] = useState("");
    const [error, setError] = useState(null);
    const [showErrorModal, setShowErrorModal] = useState(false)
    // state to add new address
    const [newAddress, setNewAddress] = useState({
        street_address: '',
        region: '',
        district: '',
        state: '',
        postal_code: '',
        is_default: false
    })
    // function to get all inputs for creating new address
    const handleNewAddressInput = (event) => {
        const { name, value } = event.target
        setNewAddress({
            ...newAddress,
            [name]: value,
        })
    }
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

   
    // function to delete user address
    function deleteAddress(id) {
        const access_token = localStorage.getItem("access_token")
        try {
            fetch(`${BACKEND_URL}/api/order/addresses/${id}/`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${access_token}` }
            }).then((res) => window.location.reload())
        } catch (error) {
            setShowErrorModal(true)
            setError("Some Thing Went Wrong Try Again After Login")
            setTimeout(() => {
                navigate("/login")
            }, 3000)
            setShowErrorModal(false)

        }

    }
// function to create new address
function handleNewAddress() {
    try {
      fetch(`${BACKEND_URL}/api/order/addresses/`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${access_token}`,
          "Content-Type": "application/json" // Set content type to JSON
        },
        body: JSON.stringify(newAddress) // Include newAddress in the request body
      })
      .then(response => {
        if (response.ok) {
          // Handle success
          console.log("Address created successfully");
        } else {
          // Handle error
          console.error("Failed to create address");
          throw new Error("Failed to create address");
        }
        window.location.reload()
      })
      .catch(error => {
        setModalShow(false);
        setError("Try again after login");
        setShowErrorModal(true);
        setTimeout(() => {
          navigate("/login");
        }, 3000);
        setShowErrorModal(false);
      });
    } catch (error) {
      setModalShow(false);
      setError("Try again after login");
      setShowErrorModal(true);
      setTimeout(() => {
        navigate("/login");
      }, 3000);
      setShowErrorModal(false);
    }
    console.log(newAddress);
  }
  
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
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold mb-2">Address Details</h3>
                            <button onClick={() => setModalShow(true)} className="btn bg-red-500 text-white hover:bg-red-600 ">Add Address</button>
                        </div>
                        <div className="grid grid-cols-1 gap-2 mt-6">
                            {profile.addresses?.map((address, index) => (
                                <div key={index}>
                                    <div className="flex items-center justify-between">
                                        <p className="font-bold underline underline-offset-2">Address {index + 1}</p>
                                        <button onClick={() => deleteAddress(address.id)} className="text-xl text-red-500 hover:text-red-700"><FaTrash /></button>
                                    </div>

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
                                    <div className="mt-2">
                                        {address.is_default ? (
                                            <p className="font-bold text-green-500">Default Address</p>
                                        ) : null}
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
                {/* modal for error */}
                {showErrorModal && (
                    <div className="fixed inset-0 bg-black bg-opacity flex items-center justify-center p-2">
                        <div className="bg-white p-12 w-72">
                            <p className="text-red-500 text-center font-bold">{error}</p>
                        </div>
                    </div>
                )}

                {/* modal for adding address */}
                {modalShow && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 z-50">

                        <div className="p-3 bg-white  w-full">
                            <div className="flex items-center justify-between">
                                <h3 className="font-bold text-xl">Add Your Address</h3>
                                <button className="hover:rotate-45 rotate-0 transition duration-300 ease-in-out mb-2 bg-red-500 text-white rounded-full text-xl p-2" onClick={() => setModalShow(false)}>
                                <IoMdClose/>
                                </button>
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-3">
                                <input 
                                    name="street_address" 
                                    value={newAddress.street_address} 
                                    onChange={handleNewAddressInput} 
                                    type="text" 
                                    className="input bg-gray-200" 
                                    placeholder="Street Address" />
                                <input 
                                    name="region" 
                                    value={newAddress.region} 
                                    onChange={handleNewAddressInput} 
                                    type="text" 
                                    className="input bg-gray-200" 
                                    placeholder="Region" />
                                <input
                                    name="district"
                                    value={newAddress.district}
                                    onChange={handleNewAddressInput} 
                                    type="text" className="input bg-gray-200" 
                                    placeholder="District" />
                                <input 
                                    name="state" 
                                    value={newAddress.state}
                                    onChange={handleNewAddressInput}
                                    type="text" 
                                    className="input bg-gray-200" 
                                    placeholder="State" />
                            </div>
                            <input 
                                name="postal_code"
                                value={newAddress.postal_code}
                                onChange={handleNewAddressInput}
                                type="number" 
                                className="bg-gray-200 input w-full mt-4" 
                                placeholder="Postal Code" />
                                <div className="flex items-center p-2 gap-x-3">
                                    <input 
                                        type="checkbox" 
                                        name="is_default"
                                        value={newAddress.is_default} 
                                        onChange={(event) => setNewAddress(prevState => ({
                                            ...prevState,
                                            is_default: event.target.checked
                                        }))}
                                        className="checkbox bg-gray-200"
                                        />
                                        <p className="font-bold">Use This Address As Default One</p>
                                </div>
                            <button 
                                onClick={handleNewAddress} 
                                className="mt-4 btn bg-red-500 hover:bg-red-600 text-white w-full">Submit</button>
                        </div>
                    </div>
                )}
                {/* end of modal for getting address */}
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
