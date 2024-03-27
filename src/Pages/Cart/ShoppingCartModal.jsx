import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { BACKEND_URL } from "../../constants";
import { useNavigate, Link } from "react-router-dom";
import AddressCard from "./AddressCard";
import ConfirmationComponent from "./ConfirmationComponent";
import AddAddressModal from "../../Components/AddAddressModal";

// ShoppingCartModal component
export default function ShoppingCartModal({ setShowModal, subTotal, cartCount }) {
    const [userAddress, setUserAddress] = useState([]);
    const [selectedShippingAddress, setSelectedShippingAddress] = useState(null);
    const [selectedBillingAddress, setSelectedBillingAddress] = useState(null);
    const [orderDetails, setOrderDetails] = useState([]);
    const [error, setError] = useState('');
    const [showPayment, setShowPayment] = useState(false); // State to manage visibility of payment component
    const [loading, setLoading] = useState(false); // State to manage loading state
    const [updateAddress, setUpdateAddress] = useState(false);
    const navigate = useNavigate();
    const access_token = localStorage.getItem("access_token");

    useEffect(() => {
        getOrderDetails();
    }, []);
    useEffect(() => {
        getUserAddress();
    }, [updateAddress]); // Call getUserAddress when updateAddress changes


    const getUserAddress = () => {
        fetch(`${BACKEND_URL}/api/order/addresses/`, {
            method: "GET",
            headers: { "Authorization": `Bearer ${access_token}` },
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to fetch user addresses");
                }
                return res.json();
            })
            .then((data) => setUserAddress(data))
            .catch((err) => {
                setError("Something Went Wrong. Please try again!!");
                setTimeout(() => {
                    navigate("/login");
                }, 2000);
            });
    };

    const getOrderDetails = () => {
        // Fetch order details
        fetch(`${BACKEND_URL}/api/order/orderdetail`, {
            method: "GET",
            headers: { "Authorization": `Bearer ${access_token}` },
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to fetch order details");
                }
                return res.json();
            })
            .then((data) => setOrderDetails(data))
            .catch((err) => {
                setError("Failed to fetch order details. Please try again!!");
                console.error(err);
            });
    };

    const handleSelectShippingAddress = (addressId) => {
        setSelectedShippingAddress(addressId);
    };

    const handleSelectBillingAddress = (addressId) => {
        setSelectedBillingAddress(addressId);
    };

    const handleConfirmOrder = () => {
        if (!selectedShippingAddress || !selectedBillingAddress) {
            setError("Please select both shipping and billing addresses.");
            return;
        }
        setShowPayment(true); // Set showPayment to true to display payment component
    };
;

    return (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
            <div className="bg-white p-6 rounded-lg max-w-xl w-full overflow-scroll h-[42rem] ">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-semibold mb-4">Checkout</h2>
                    <button title="Close" className="text-xl p-2 bg-red-500 text-white rounded-full" onClick={() => setShowModal(false)}><IoMdClose/></button>
                </div>
                <hr className="border border-gray-600 m-2" />
                {!showPayment ? (
                    <>
                        <div className="mb-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold mb-2">Shipping Address</h3>
                               <button className="btn mb-2 bg-red-500 text-white" onClick={() => setUpdateAddress(true)}>Add New Address</button>
                            </div>
                            <div className="space-y-2 h-60 overflow-scroll">
                                {userAddress.reverse().map((address) => (
                                    <AddressCard key={address.id} name={address.name} address={address} onSelectAddress={handleSelectShippingAddress} selectedAddress={selectedShippingAddress} />
                                ))}
                            </div>
                        </div>
                        <div className="mb-2">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold mb-2">Billing Address</h3>
                               <button className="btn mb-2 bg-red-500 text-white" onClick={() => setUpdateAddress(true)}>Add New Address</button>
                            </div>
                            <div className="space-y-2 h-60 overflow-scroll">
                                {userAddress.reverse().map((address) => (
                                    <AddressCard
                                        key={address.id}
                                        name={address.name}
                                        address={address}
                                        onSelectAddress={handleSelectBillingAddress}
                                        selectedAddress={selectedBillingAddress}
                                    />
                                ))}
                            </div>
                        </div>
                        {updateAddress && <AddAddressModal setUpdateAddress={setUpdateAddress}/>}
                        <div className="flex justify-end">
                            <button className="btn bg-red-500 text-white hover:bg-red-600" onClick={handleConfirmOrder} disabled={loading}>
                                {loading ? 'Loading...' : 'Proceed to Payment'}
                            </button>
                        </div>
                    </>
                ) : (
                    <ConfirmationComponent
                        selectedShippingAddress={selectedShippingAddress}
                        selectedBillingAddress={selectedBillingAddress}
                        userAddress={userAddress}
                        subTotal={subTotal}
                        cartCount={cartCount}
                        
                    />
                )}
            </div>
        </div>
    );
};

