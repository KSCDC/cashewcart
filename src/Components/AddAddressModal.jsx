import React, { useEffect, useState } from "react";
import { BACKEND_URL } from "../constants/index";
import { useNavigate } from "react-router-dom";

function AddAddressModal({ setUpdateAddress }) {
  const navigate = useNavigate();
  const access_token = localStorage.getItem("access_token");
  const [newAddress, setNewAddress] = useState({
    name: "",
    street_address: "",
    region: "",
    district: "",
    state: "",
    postal_code: "",
    phone_number: "",
    is_default: false,
  });
  const [error, setError] = useState(null);

  const handleNewAddressInput = (event) => {
    const { name, value } = event.target;
    setNewAddress({
      ...newAddress,
      [name]: value,
    });

    // Reset the error message when postal code changes
    if (name === "postal_code") {
      setError(null);
    }
  };

  const handleNewAddress = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/order/addresses/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAddress),
      });
      if (!response.ok) {
        throw new Error("Failed to create address");
      }
      setUpdateAddress(false);
      // No need to fetch profile here, as it's already being fetched after address creation
    } catch (error) {
      console.error("Error creating address:", error);
      setError("Failed to create address. Please try again later.");
    }
  };

  useEffect(() => {
    const validatePostalCode = async () => {
      try {
        const response = await fetch(
          `https://api.postalpincode.in/pincode/${newAddress.postal_code}`
        );
        const data = await response.json();
        if (data[0]?.Status !== "Success") {
          setError("Invalid pin code");
        } else {
          setError("");
        }
      } catch (error) {
        console.error("Error checking pin code:", error);
        setError("Failed to validate pin code. Please try again.");
      }
    };

    if (newAddress.postal_code.length === 6) {
      validatePostalCode();
    }
  }, [newAddress.postal_code]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 z-50">
      <div className="p-3 bg-white w-4/5 lg:w-3/5 xl:w-2/5 rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-xl">Add Your Address</h3>
          <button
            className="hover:bg-gray-200 rounded-full p-2"
            onClick={() => setUpdateAddress(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-500 hover:text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="flex flex-col gap-2">
          {/* Name */}
          <input
            name="name"
            value={newAddress.name}
            onChange={handleNewAddressInput}
            type="text"
            className="input bg-gray-200"
            placeholder="Name"
          />

          {/* Street Address */}
          <input
            name="street_address"
            value={newAddress.street_address}
            onChange={handleNewAddressInput}
            type="text"
            className="input bg-gray-200"
            placeholder="Street Address"
          />

          {/* Region */}
          <input
            name="region"
            value={newAddress.region}
            onChange={handleNewAddressInput}
            type="text"
            className="input bg-gray-200"
            placeholder="Region"
          />

          {/* District */}
          <input
            name="district"
            value={newAddress.district}
            onChange={handleNewAddressInput}
            type="text"
            className="input bg-gray-200"
            placeholder="District"
          />

          {/* State */}
          <input
            name="state"
            value={newAddress.state}
            onChange={handleNewAddressInput}
            type="text"
            className="input bg-gray-200"
            placeholder="State"
          />

          {/* Postal Code */}
          <input
            name="postal_code"
            value={newAddress.postal_code}
            onChange={handleNewAddressInput}
            type="text"
            className="input bg-gray-200"
            placeholder="Postal Code"
          />

          {/* Phone Number */}
          <input
            name="phone_number"
            value={newAddress.phone_number}
            onChange={handleNewAddressInput}
            type="tel"
            className="input bg-gray-200"
            placeholder="Phone Number"
          />

          {/* Default Address Checkbox */}
          <div className="flex items-center col-span-2">
            <input
              type="checkbox"
              name="is_default"
              value={newAddress.is_default}
              onChange={(event) =>
                setNewAddress((prevState) => ({
                  ...prevState,
                  is_default: event.target.checked,
                }))
              }
              className="mr-2 checkbox"
            />
            <label htmlFor="is_default">Use This Address As Default</label>
          </div>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button
          onClick={handleNewAddress}
          className="mt-4 btn bg-red-500 hover:bg-red-600 text-white w-full"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default AddAddressModal;
