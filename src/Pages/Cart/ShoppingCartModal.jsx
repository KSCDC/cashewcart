import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { BACKEND_URL } from "../../constants";
import { useNavigate, Link } from "react-router-dom";

// ShoppingCartModal component
export default function ShoppingCartModal({ setShowModal, subTotal }) {
    const access_token = localStorage.getItem("access_token");
    const [userAddress, setUserAddress] = useState([]);
    const [selectedShippingAddress, setSelectedShippingAddress] = useState(null);
    const [selectedBillingAddress, setSelectedBillingAddress] = useState(null);
    const [orderDetails, setOrderDetails] = useState([]);
    const [error, setError] = useState('');
    const [showPayment, setShowPayment] = useState(false); // State to manage visibility of payment component
    const [loading, setLoading] = useState(false); // State to manage loading state
    const navigate = useNavigate();

    useEffect(() => {
        getUserAddress();
        getOrderDetails();
    }, []);

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
        // Replace the fetch URL with the actual endpoint to fetch order details
        fetch(`${BACKEND_URL}/api/order/details/`, {
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
        // Implement logic to confirm order and proceed to payment
        setShowPayment(true); // Set showPayment to true to display payment component
    };

    const proceedPayment = async () => {
        try {
            setLoading(true); // Set loading state to true
            const placeorder = await fetch(`${BACKEND_URL}/api/order/placeorder/?address=${selectedBillingAddress}`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${access_token}`
                }
            });

            const response = await placeorder.json();
            console.log(response);
        } catch (error) {
            console.error("Error occurred while placing the order:", error);
        } finally {
            setLoading(false); // Set loading state to false after completing the payment process
        }
    };

    return (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
            <div className="bg-white p-6 rounded-lg max-w-xl w-full ">
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
                                <Link to="/profile"><button className="btn mb-2 bg-red-500 text-white">Add New Address</button></Link>
                            </div>
                            <div className="space-y-2">
                                {userAddress.map((address) => (
                                    <AddressCard key={address.id} address={address} onSelectAddress={handleSelectShippingAddress} selectedAddress={selectedShippingAddress} />
                                ))}
                            </div>
                        </div>
                        <div className="mb-2">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold mb-2">Billing Address</h3>
                                <Link to="/profile"><button className="btn mb-2 bg-red-500 text-white">Add New Address</button></Link>
                            </div>
                            <div className="space-y-2">
                                {userAddress.map((address) => (
                                    <AddressCard
                                        key={address.id}
                                        address={address}
                                        onSelectAddress={handleSelectBillingAddress}
                                        selectedAddress={selectedBillingAddress}
                                    />
                                ))}
                            </div>
                        </div>
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
                    />
                )}
            </div>
        </div>
    );
};

// ConfirmationComponent component
const ConfirmationComponent = ({ selectedShippingAddress, selectedBillingAddress, userAddress, subTotal }) => {
    const [loading, setLoading] = useState(false);

    const handleProceedPayment = async () => {
        setLoading(true);
        try {
            const access_token = localStorage.getItem("access_token");
            const placeOrderResponse = await fetch(`${BACKEND_URL}/api/order/placeorder/?address=${selectedBillingAddress}`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${access_token}`
                }
            });
    
            if (!placeOrderResponse.ok) {
                throw new Error("Failed to place the order");
            }
    
            const orderData = await placeOrderResponse.json();
            const orderId = orderData.order_id;
    
            const paymentResponse = await fetch(`${BACKEND_URL}/api/payment/ordernumber/${orderId}`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${access_token}`
                }
            });
    
            if (!paymentResponse.ok) {
                throw new Error("Failed to process payment");
            }
    
            // Handle successful payment response here if needed
    
        } catch (error) {
            console.error("Error occurred while placing the order or processing payment:", error);
            // Handle error state or display error message to the user
        } finally {
            setLoading(false);
        }
    };
    
    

    const confirmShippingAddress = userAddress.find(address => address.id === selectedShippingAddress);
    const confirmBillingAddress = userAddress.find(address => address.id === selectedBillingAddress);

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">Order Confirmation</h2>
            <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Shipping Address</h3>
                <p>{confirmShippingAddress ? `${confirmShippingAddress.street_address}, ${confirmShippingAddress.region}, ${confirmShippingAddress.district}, ${confirmShippingAddress.state} - ${confirmShippingAddress.postal_code}` : 'No shipping address selected'}</p>
            </div>
            <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Billing Address</h3>
                <p>{confirmBillingAddress ? `${confirmBillingAddress.street_address}, ${confirmBillingAddress.region}, ${confirmBillingAddress.district}, ${confirmBillingAddress.state} - ${confirmBillingAddress.postal_code}` : 'No billing address selected'}</p>
            </div>
            <hr className="border border-gray-400" />
            <h2 className="flex items-center mt-3 font-bold text-xl">Total  ₹{subTotal}/-</h2>
            <div className="flex justify-end">
                <button className="btn bg-red-500 text-white hover:bg-red-600" onClick={() => handleProceedPayment()} disabled={loading}>
                    {loading ? 'Loading...' : 'Proceed to Payment'}
                </button>
            </div>
        </div>
    );
};


// AddressCard component
const AddressCard = ({ address, onSelectAddress, selectedAddress }) => {
    const isSelected = selectedAddress === address.id;

    return (
        <div className={`p-4 border rounded-lg cursor-pointer ${isSelected ? "bg-red-100" : ""}`} onClick={() => onSelectAddress(address.id)}>
            <p className="text-lg font-semibold">{address.street_address}, {address.region}</p>
            <p>{address.district}, {address.state} - {address.postal_code}</p>
        </div>
    );
};

