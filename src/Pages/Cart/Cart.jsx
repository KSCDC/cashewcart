import React, { useState, useEffect } from 'react';
import { AiOutlineDelete } from 'react-icons/ai'; // Importing delete icon
import useAuthStatus from '../../Hooks/useAuthStatus';
import { BACKEND_URL } from '../../constants';
import useTokenExpirationCheck from '../../Hooks/useTokenExpirationCheck';
import RefreshToken from '../../Hooks/RefreshToken';
import { useNavigate } from 'react-router-dom';

function Cart() {
    console.log(localStorage.access_token)
    const isLoggedIn = useAuthStatus();
    const [cartProducts, setCartProducts] = useState([]);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null); // New state for message
    const isTokenExpired = useTokenExpirationCheck();
    const navigate = useNavigate();
    const [quantityMap, setQuantityMap] = useState({}); // State for managing product quantities

    useEffect(() => {
        fetchData();
    }, [isTokenExpired]);

    const fetchData = async () => {
        try {
            const access_token = localStorage.getItem("access_token");
            if (!access_token || isTokenExpired) {
                throw new Error("User not logged in or token expired");
            }

            const response = await fetch(`${BACKEND_URL}/api/product/cart/list/`, {
                method: "GET",
                headers: { "Authorization": `Bearer ${access_token}` }
            });

            if (!response.ok) {
                throw new Error("Failed to fetch cart products");
                navigate("/login")
            }

            const data = await response.json();
            setCartProducts(data.results);
            // Initialize quantity map with purchase_count for each product
            const initialQuantityMap = {};
            data.results.forEach(product => {
                initialQuantityMap[product.id] = product.purchase_count;
            });
            setQuantityMap(initialQuantityMap);
        } catch (error) {
            setError(error.message);
            navigate("/login")
        }
    };

    const handleIncreaseQuantity = (id) => {
        setQuantityMap(prevState => ({
            ...prevState,
            [id]: (prevState[id] || 1) + 1
        }));
    };

    const handleDecreaseQuantity = (id) => {
        setQuantityMap(prevState => ({
            ...prevState,
            [id]: (prevState[id] || 1) - 1
        }));
    };

    const handleUpdateQuantity = async (id, quantity) => {
        try {
            const access_token = localStorage.getItem("access_token");
            if (!access_token || isTokenExpired) {
                RefreshToken();
            }
    
            const response = await fetch(`${BACKEND_URL}/api/product/cart/update_purchase_count/${id}/`, {
                method: "PATCH",
                headers: {
                    "Authorization": `Bearer ${access_token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "purchase_count": quantity
                })
            });
    
            if (!response.ok) {
                throw new Error("Failed to update product quantity");
                navigate("/login");
            }
            
            // If the update is successful, fetch the updated cart products
            fetchData();

        } catch (error) {
            setError(error.message);
        }
    };
    

    return (
        <div className='min-h-screen px-4 py-8'>
            <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
          
            {message && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
                    {message}
                </div>
            )}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                {cartProducts.map((data, index) => (
                    <div key={index} className='border p-4'>
                    <img src={`${BACKEND_URL}${data.product.product.product_images[0].product_image}`} alt={data.product.product.name} className="h-72 object-contain mb-4" />
                    <div className='flex justify-between items-center mb-4'>
                        <div>
                            <h3 className="text-xl font-bold">{data.product.product.name}</h3>
                            <h4>{data.product.weight_in_grams} grams</h4>
                            <h5 className='font-bold text-red-500'>₹{Number(data.product.selling_price) }</h5>
                        </div>
                        {/* update the product quantity */}
                        <div className="flex flex-col gap-2 items-center">
                        <div className="flex items-center">
                        <button className="btn bg-gray-200" onClick={() => handleDecreaseQuantity(data.id)}>-</button>
                            <span className='text-xl font-bold mx-4'>{quantityMap[data.id] || 1}</span>
                            <button className="btn bg-gray-200" onClick={() => handleIncreaseQuantity(data.id)}>+</button>
                        </div>
                        <button className='btn' onClick={() => handleUpdateQuantity(data.id, quantityMap[data.id] || 1)}>Update Quantity</button>
                        </div>
                    </div>
                    
                    <div className='flex justify-between items-center'>
                        <button className="btn bg-red-500 border-none text-white">Buy Now</button>
                        <button className="text-white bg-red-500 p-2 text-xl p-2bg-red-500 rounded-full hover:text-red-700 hover:bg-white" onClick={() => handleDeleteProduct(data.product.product_variant_id)}>
                            <AiOutlineDelete />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    </div>
);
}

export default Cart;

