import React, { useState } from "react";
import { BACKEND_URL } from "../../constants";
import useRazorpay from "react-razorpay";
import { useNavigate } from "react-router-dom";

const ConfirmationComponent = ({ selectedShippingAddress, selectedBillingAddress, userAddress, subTotal, cartCount }) => {
    const [loading, setLoading] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState(null);
    const [orderId, setOrderId] = useState();
    const [amount, setAmount] = useState();
    const [description, setDescription] = useState();
    const [customerMail, setCustomerMail] = useState();
    const navigate = useNavigate();

    const handleProceedPayment = async () => {
        setLoading(true);
        try {
            const access_token = localStorage.access_token;
            const placeOrderResponse = await fetch(`${BACKEND_URL}/api/order/placeorder/?shipping_address=${selectedShippingAddress}&billing_address=${selectedShippingAddress}`, {
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

            const paymentResponse = await fetch(`${BACKEND_URL}/api/payment/ordernumber/${orderId}/`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${access_token}`
                }
            });
            if (!paymentResponse.ok) {
                throw new Error("Failed to process payment");
            }
            const paymentData = await paymentResponse.json();
            setOrderId(paymentData.response.id);
            setAmount(paymentData.response.amount);
            setDescription(paymentData.response.notes.items);
            setCustomerMail(paymentData.response.notes.email);
            setPaymentStatus(true);
        } catch (error) {
            console.log("Error occurred while placing the order or processing payment:", error);
        } finally {
            setLoading(false);
        }
    };

    const closeModal = () => {
        setPaymentStatus(null);
    };

    const confirmShippingAddress = userAddress.find(address => address.id === selectedShippingAddress);
    const confirmBillingAddress = userAddress.find(address => address.id === selectedBillingAddress);

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">Order Confirmation</h2>
            <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Shipping Address</h3>
                <p> {confirmShippingAddress ? `${confirmShippingAddress.street_address}, ${confirmShippingAddress.region}, ${confirmShippingAddress.district}, ${confirmShippingAddress.state} - ${confirmShippingAddress.postal_code}` : 'No shipping address selected'}</p>
            </div>
            <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Billing Address</h3>
                <p>{confirmBillingAddress ? `${confirmBillingAddress.street_address}, ${confirmBillingAddress.region}, ${confirmBillingAddress.district}, ${confirmBillingAddress.state} - ${confirmBillingAddress.postal_code}` : 'No billing address selected'}</p>
            </div>
            <hr className="border border-gray-400" />
            <h2 className="flex items-center mt-3 font-bold text-xl">Total ₹{subTotal}/-</h2>
            <h2 className="flex items-center mt-3 font-bold text-xl">Products: {cartCount}</h2>
            <div className="flex justify-end">
            {paymentStatus ? (
                <form method="POST" action="https://api.razorpay.com/v1/checkout/embedded">
                    <input type="hidden" name="key_id" value="rzp_test_0Bm1lMEg56tINT" />
                    <input type="hidden" name="amount" value={amount} />
                    <input type="hidden" name="order_id" value={orderId} />
                    <input type="hidden" name="name" value="KSCDC" />
                    <input type="hidden" name="description" value={description} />
                    <input type="hidden" name="image" value="https://www.cashewcorporation.com/images/logo.png" />
                    <input type="hidden" name="prefill[contact]" value="9123456780" />
                    <input type="hidden" name="prefill[email]" value={customerMail} />
                    <input type="hidden" name="notes[shipping address]" value={confirmShippingAddress} />
                    <input type="hidden" name="callback_url" value="https://cashewcart.com/" />
                    <input type="hidden" name="cancel_url" value="https://cashewcart.com/" />
                    <button className="btn bg-red-500 text-white hover:bg-red-600">Pay Now</button>
                </form>
            ) : (
                    <div className="flex justify-end">
                        <button className="btn bg-red-500 text-white hover:bg-red-600" onClick={() => handleProceedPayment()} disabled={loading}>
                            {loading ? 'Loading...' : 'Confirm'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ConfirmationComponent;
