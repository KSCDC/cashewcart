import React from "react";

const PaymentSuccessModal = ({ closeModal }) => {
    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={closeModal}>&times;</span>
                <p>Payment Successful!</p>
            </div>
        </div>
    );
};

export default PaymentSuccessModal;
