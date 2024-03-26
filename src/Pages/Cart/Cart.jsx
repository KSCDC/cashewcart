import React, { useState, useEffect } from 'react';
import { AiOutlineDelete } from 'react-icons/ai'; // Importing delete icon
import useAuthStatus from '../../Hooks/useAuthStatus';
import { BACKEND_URL } from '../../constants';
import useTokenExpirationCheck from '../../Hooks/useTokenExpirationCheck';
import RefreshToken from '../../Hooks/RefreshToken';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import ShoppingCartModal from './ShoppingCartModal';
function Cart() {
    const isLoggedIn = useAuthStatus();
    const [cartProducts, setCartProducts] = useState([]);
    const [subTotal, setSubTotal] = useState(0)
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null); // New state for message
    const isTokenExpired = useTokenExpirationCheck();
    const navigate = useNavigate();
    const [quantityMap, setQuantityMap] = useState({}); // State for managing product quantities
    const [showModal,setShowModal] = useState(false)
    useEffect(() => { window.scrollTo(0, 0) }, [])
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
            setSubTotal(data.subtotal_price)
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

    const handleIncreaseQuantity = async (id) => {
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
                    "purchase_count": (quantityMap[id] || 1) + 1
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

    const handleDecreaseQuantity = async (id) => {
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
                    "purchase_count": Math.max((quantityMap[id] || 1) - 1, 0) // Ensure quantity never goes below 0
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

    const handleDeleteProduct = async (id) => {
        try {
            const access_token = localStorage.getItem("access_token");
            if (!access_token || isTokenExpired) {
                RefreshToken();
            }

            const response = fetch(`${BACKEND_URL}/api/product/cart/${id}/`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${access_token}`,
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                throw new Error("Failed to delete product from cart");
            }

            // Remove the deleted product from the cartProducts state
            const updatedCartProducts = cartProducts.filter(product => product.id !== id);
            setCartProducts(updatedCartProducts);
        } catch (error) {
            setError(error.message);
        }
        window.location.reload()
    };

    return (
        <div className='min-h-screen px-4 py-8'>
            <div className="flex items-center justify-between sticky left-0">
                <div>
                    <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
                </div>
                <div>
                    <button className='btn bg-red-500 text-white hover:bg-red-600'>Purchase Now Total ₹{subTotal}</button>
                </div>
            </div>

            {message && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
                    {message}
                </div>
            )}

            <div className="overflow-x-auto">
                <table className="table">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Product Name
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Weight
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Price
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Quantity
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartProducts.map((data, index) => (
                            <tr key={index} className="bg-white">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <img src={`${BACKEND_URL}${data.product.product.product_images[0].product_image}`} alt={"Product image"} className="h-12 object-contain mb-4" />
                                    <div className="text-sm font-medium text-gray-900">{data.product.product.name}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">{data.product.weight_in_grams} grams</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">₹{Number(data.product.selling_price)}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex flex-col gap-2 items-center">
                                        <div className="flex items-center">
                                            <button className="btn bg-gray-200" onClick={() => handleDecreaseQuantity(data.id)}>-</button>
                                            <span className='text-xl font-bold mx-4'>{quantityMap[data.id] || 1}</span>
                                            <button className="btn bg-gray-200" onClick={() => handleIncreaseQuantity(data.id)}>+</button>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                                    <button className="text-white bg-red-500 p-2 rounded-full hover:text-red-500 hover:bg-white text-xl" onClick={() => handleDeleteProduct(data.product.product_variant_id)}>
                                        <AiOutlineDelete />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
           <div className="flex justify-end mt-2">
           <button onClick={() => setShowModal(true)} className='btn bg-red-500 text-white hover:bg-red-600 w-52'>Proceed to Payment 
           </button>
           </div>
           {showModal && <ShoppingCartModal 
           setShowModal={setShowModal}/>}
        </div>
    );



    
}

export default Cart;

