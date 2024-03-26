import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { BACKEND_URL } from "../../constants";
import { useNavigate, Link } from "react-router-dom";

export default function ShoppingCartModal({ setShowModal }) {
    const access_token = localStorage.getItem("access_token");
    const [userAddress, setUserAddress] = useState([]);
    const [selectedShippingAddress, setSelectedShippingAddress] = useState(null);
    const [selectedBillingAddress, setSelectedBillingAddress] = useState(null);
    const [orderDetails, setOrderDetails] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    console.log(localStorage.access_token)

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
        alert(`Shipping Address: ${selectedShippingAddress}, Billing Address: ${selectedBillingAddress}`);
    };

    return (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 '>
            <div className="bg-white p-6 rounded-lg max-w-xl w-full ">
                <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold mb-4">Checkout</h2>
                <button title="Close" className="text-xl p-2 bg-red-500 text-white rounded-full" onClick={() => setShowModal(false)}><IoMdClose/></button>
                </div>
                <hr className="border border-gray-600 m-2" />
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
                            selectedAddress={selectedBillingAddress} />
                        ))}
                    </div>
                </div>

                <div className="flex justify-end">
                    <button className="btn bg-red-500 text-white hover:bg-red-600" onClick={handleConfirmOrder}>Place Order</button>
                </div>
            </div>
        </div>
    );
}

const AddressCard = ({ address, onSelectAddress, selectedAddress }) => {
    const isSelected = selectedAddress === address.id;

    return (
        <div className={`p-4 border rounded-lg cursor-pointer ${isSelected ? "bg-red-100" : ""}`} onClick={() => onSelectAddress(address.id)}>
            <p className="text-lg font-semibold">{address.street_address}, {address.region}</p>
            <p>{address.district}, {address.state} - {address.postal_code}</p>
        </div>
    );
};
