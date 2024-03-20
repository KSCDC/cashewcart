import React, { useState, useEffect } from 'react';
import useAuthStatus from '../../Hooks/useAuthStatus';
import Error from '../../Components/Error';

function Cart() {
    const isLoggedIn = useAuthStatus();
    const [cartProducts, setCartProducts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (isLoggedIn) {
            const accessToken = localStorage.getItem('access_token');
            fetch('/api/product/cart/list/', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            })
            .then(response => {
                return response.json();
            })
            .then(data => {
                setCartProducts(data.products);
            })
            .catch(error => {
                setError(error.message);
            });
        }
    }, []);
    console.log(cartProducts)

    if (!isLoggedIn) return <Error />;
    console.log(isLoggedIn)
  
    return (
        <div className='min-h-screen'>
            <h1>Cart</h1>
            {error && <Error message={error} />}
            <div>
                {cartProducts.map(product => (
                    <div key={product.id}>
                        <h3>{product.name}</h3>
                        <p>Price: {product.price}</p>
                        {/* Add more details as needed */}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Cart;
