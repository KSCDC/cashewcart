import { useState } from "react";
import { BACKEND_URL } from "../../constants";

// ConfirmationComponent component
const ConfirmationComponent = ({ selectedShippingAddress, selectedBillingAddress, userAddress, subTotal}) => {
    const [loading, setLoading] = useState(false);

   
    const handleProceedPayment = async () => {
        setLoading(true);
        try {
            const access_token = localStorage.access_token;
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
            // setting razor pay id
            

            // payment gateway if
            const paymentResponse = await fetch(`${BACKEND_URL}/api/payment/ordernumber/${orderId}/`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${access_token}`
                }
            });
    
            if (!paymentResponse.ok) {
                throw new Error("Failed to process payment");
            }
            const payementData = await paymentResponse.json()
            // set pyment key
            console.log(`Razor Pay ID ${payementData.response.id}`)
            
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


export default ConfirmationComponent;