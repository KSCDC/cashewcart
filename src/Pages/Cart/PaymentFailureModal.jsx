import React from "react";

const PaymentFailureModal = ({ closeModal }) => {
    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={closeModal}>&times;</span>
                <p>Payment Failed. Please try again later.</p>
            </div>
        </div>
    );
};

export default PaymentFailureModal;
