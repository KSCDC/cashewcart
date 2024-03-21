import React, { useState, useEffect } from 'react';
import { AiOutlineDelete } from 'react-icons/ai'; // Importing delete icon
import useAuthStatus from '../../Hooks/useAuthStatus';
import Error from '../../Components/Error';
import { BACKEND_URL } from '../../constants';
import useTokenExpirationCheck from '../../Hooks/useTokenExpirationCheck';
import RefreshToken from '../../Hooks/RefreshToken';

function Cart() {
    const isLoggedIn = useAuthStatus();
    const [cartProducts, setCartProducts] = useState([]);
    const [error, setError] = useState(null);
    const isTokenExpired = useTokenExpirationCheck();
    console.log(localStorage.access_token)

    useEffect(() => {
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
                }

                const data = await response.json();
                setCartProducts(data.results);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchData();
    }, [isTokenExpired]);

    if (!isLoggedIn) return <Error />;

    const handleIncreaseQuantity = (id) => {
        const updatedCartProducts = cartProducts.map(product => {
            if (product.id === id) {
                return {
                    ...product,
                    product: {
                        ...product.product,
                        quantity: product.product.quantity + 1,
                        selling_price: product.product.selling_price * (product.product.quantity + 1)
                    }
                };
            }
            return product;
        });
        setCartProducts(updatedCartProducts);
    };

    const handleDeleteProduct = async (id) => {
        try {
            const access_token = localStorage.getItem("access_token");
            if (!access_token || isTokenExpired) {
                await RefreshToken();
            }
            
            const response = await fetch(`${BACKEND_URL}/api/product/cart/${id}/`, {
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
        <div className='min-h-screen'>
            <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
            {error && <Error message={error} />}
            <table className="table-auto w-full">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Product Name</th>
                        <th className="px-4 py-2">Image</th>
                        <th className="px-4 py-2">Price</th>
                        <th className="px-4 py-2">Weight</th>
                        <th className="px-4 py-2">Quantity</th>
                        <th className="px-4 py-2">Actions</th> {/* Added column for delete action */}
                    </tr>
                </thead>
                <tbody>
                    {cartProducts.map((data, index) => (
                        <tr key={data.id} className="border-b border-gray-200 hover:bg-gray-100">
                            <td className="px-4 py-2">{data.product.product.name}</td>
                            <td className="px-4 py-2">
                                <img src={`${BACKEND_URL}${data.product.product.product_images[0].product_image}`} alt={data.product.product.name} className="w-40 h-40 object-contain" />
                            </td>
                            <td className="px-4 py-2">₹{data.product.selling_price}</td>
                            <td className="px-4 py-2">{data.product.weight_in_grams} grams</td>
                            <td className="px-4 py-2">
                                <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => handleIncreaseQuantity(data.id)}>
                                    +
                                </button>
                            </td>
                            <td className="px-4 py-2">
                                <button className="text-red-500 hover:text-red-700" onClick={() => handleDeleteProduct(data.product.product_variant_id)}>
                                    <AiOutlineDelete />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Cart;
