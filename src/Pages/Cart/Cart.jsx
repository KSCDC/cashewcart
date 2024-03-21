import React, { useState, useEffect } from 'react';
import { AiOutlineDelete } from 'react-icons/ai'; // Importing delete icon
import useAuthStatus from '../../Hooks/useAuthStatus';
import Error from '../../Components/Error';
import { BACKEND_URL } from '../../constants';
import useTokenExpirationCheck from '../../Hooks/useTokenExpirationCheck';
import RefreshToken from '../../Hooks/RefreshToken';
import { useNavigate } from 'react-router-dom';

function CartProductCard({ image, title, price, weight }) {
    // Parse weight string and convert to kg if > 1000 grams
    const weightValue = parseFloat(weight.split(' ')[0]);
    const displayWeight = weightValue >= 1000 ? `${(weightValue / 1000).toFixed(1)} Kg` : `${weightValue} gm`;

    return (
        <div className="overflow-x-auto">
        <table className="table">
          <tbody>
            {/* row 1 */}
            <tr>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="w-12 h-12 object-contain">
                      <img src={`${BACKEND_URL}${image}`} alt="Product Image" />
                    </div>
                  </div>
                  <div className="flex flex-col"> {/* Changed div to flex container */}
                    <div className="font-bold ">{title.slice(0,32)}...</div> {/* Added truncate class */}
                    <div className="text-sm text-red-500 font-bold">{displayWeight}</div>
                  </div>
                </div>
              </td>
              <td className='font-bold'>
                {price}
              </td>
              <td>Purple</td>
              <td>
                <span className='font-bold text-xl'>{price}</span>
              </td>
            
            </tr>
          </tbody>
        </table>
      </div>
      
    );
}

function Cart() {
    const isLoggedIn = useAuthStatus();
    const [cartProducts, setCartProducts] = useState([]);
    const [error, setError] = useState(null);
    const isTokenExpired = useTokenExpirationCheck();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const access_token = localStorage.getItem("access_token");
                if (!access_token || isTokenExpired) {
                    navigate("/login");
                    return;
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
    }, [isTokenExpired, navigate]);

    // Increase product quantity
    const handleIncreaseQuantity = (index) => {
        const updatedCartProducts = [...cartProducts];
        updatedCartProducts[index].product.quantity += 1;
        updatedCartProducts[index].product.selling_price *= updatedCartProducts[index].product.quantity;
        setCartProducts(updatedCartProducts);
    };

    // Delete product from cart
    const handleDeleteProduct = async(id) => {
        try {
            const access_token = localStorage.getItem("access_token");
            if (!access_token || isTokenExpired) {
                RefreshToken();
                return;
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
    };

    return (
        <div className='min-h-screen'>
            <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>

                {cartProducts.map((data, index) => (
                    <CartProductCard 
                        key={index}
                        image={data.product.product.product_images[0].product_image} 
                        title={data.product.product.name}
                        price={data.product.selling_price}
                        weight={data.product.weight_in_grams}
                    />
                ))}

        </div>
    );
}

export default Cart;
