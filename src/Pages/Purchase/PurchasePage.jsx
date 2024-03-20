import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BACKEND_URL } from '../../constants';
import Loading from '../../Components/Loading';
import useAuthStatus from '../../Hooks/useAuthStatus';

function PurchasePage({ id, name, description, product_images, product_variants }) {
    // Check if product_images is not defined or not an array
    if (!product_images || !Array.isArray(product_images) || product_images.length === 0) {
      return (
        <main>
          <Loading/>
        </main>
      );
    }
  
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
    const [primaryImage,setPrimaryImage] = useState(product_images[0].product_image)
    const [productPrice,setProductPrice] = useState(product_variants[0].selling_price)
    const [productWeight,setProductWeight] = useState(product_variants[0].weight_in_grams)
  const loginStatus = useAuthStatus();

  const handleAddToCart = async () => {
    setIsLoading(true);
    setErrorMessage('');
    
    try {
      let accessToken = localStorage.getItem('access_token');
      const refreshToken = localStorage.getItem('refresh_token');
      
      if (!accessToken || !refreshToken) {
        throw new Error('Access token or refresh token not found.');
      }
  
      const url = `${BACKEND_URL}/api/product/cart/20/`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({ productId: id }) // Include the product ID in the request body if required
      });
  
      if (response.status === 401) {
        // Access token expired, refresh token
        const refreshResponse = await fetch(`${BACKEND_URL}/api/user/token/refresh/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ refresh_token: refreshToken })
        });
  
        if (!refreshResponse.ok) {
          throw new Error('Failed to refresh access token.');
        }
  
        const data = await refreshResponse.json();
        accessToken = data.access_token;
        localStorage.setItem('access_token', accessToken);
  
        // Retry the original request with the new access token
        const retryResponse = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          },
          body: JSON.stringify({ productId: id }) // Include the product ID in the request body if required
        });
  
        if (!retryResponse.ok) {
          throw new Error('Failed to add the product to the cart after refreshing token.');
        }
      } else if (!response.ok) {
        throw new Error('Failed to add the product to the cart.');
      }
  
      // Product added successfully
      // You can redirect the user to the cart page or show a success message
      console.log('Product added to cart successfully');
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  

  // Check if product_images is not defined or not an array
  if (!product_images || !Array.isArray(product_images) || product_images.length === 0) {
    return <Loading />;
  }

  return (
    <main className='grid lg:flex w-full'>
     {/* first half */}
     <div className="w-full flex flex-col items-center p-3">
         {/* product images */}
      <div className="grid grid-cols-4 lg:grid-cols-4 gap-2">
        {product_images.map((image, index) => (
          <button key={index} className='btn border border-red-400 p-2 h-36' onClick={() => setPrimaryImage(image.product_image)}>
            <img className='h-32 w-32 object-contain' key={index} src={`${BACKEND_URL}${image.product_image}`} alt="Image not found" />
          </button>
        ))}
      </div>
      {/* main image */}
      <div className="flex justify-center items-center mt-2 border  h-96 w-96  border-red-300 rounded-lg bg-gray-200">
      <img src={`${BACKEND_URL}${primaryImage}`} className='h-72 w-72 object-contain relative overflow-hidden custome-scale duration-500' alt="Main Image" />
      </div>
     </div>

     {/* ---------------------------------------- */}
     {/* second half of the page */}
     <div className="w-full p-3">
        <h2 className="text-3xl font-bold">{name}</h2>
        {/* product price and details */}
        <div className="flex space-x-2 items-baseline">
            <h3 className='text-2xl font-bold'>{productWeight == 1000.00 ? "1Kg" : `${productWeight}gm`}</h3>
            <h3 className='text-xl text-green-500 font-bold'>₹{productPrice}</h3>
        </div>
        <p className='mt-4 line-clamp-6 text-justify'>{description}</p>
        {/* product varients price and weights */}
       <div className="flex items-center mt-6 gap-3">
       {
            product_variants.filter((data) => data.is_available).map((data,index) => (
               <button onClick={() => {
                key={index}
                setProductPrice(data.selling_price)
                setProductWeight(data.weight_in_grams)
               }} className="h-28 w-32 bg-gray-200 justify-center items-center flex flex-col rounded-lg border-red-400 border" key={data.id}>
                 <h3 className='text-xl'>{data.weight_in_grams == 1000.00 ? "1Kg" : `${data.weight_in_grams}gm`}</h3>
                 <h2 className='font-bold text-lg text-red-500'>₹{data.selling_price}</h2>
               </button>
            ))
        }
       </div>
       {/* buy now buttons */}
       {isLoading ? (
        <div className='text-center'>Submitting...</div>
      ) : (
        <div className='mt-6'>
          {loginStatus ? (
            <button onClick={handleAddToCart} className='w-full btn bg-red-500 hover:bg-red-800 text-white'>
              Add to Cart {id}
            </button>
          ) : (
            <Link to='/login'>
              <button className='w-full btn bg-red-500 hover:bg-red-800 text-white'>Login</button>
            </Link>
          )}
        </div>
      )}
      {errorMessage && <div className='text-red-500 mt-2 font-bold text-center'>{errorMessage}</div>}
     </div>
  
    </main>
  );
}

export default PurchasePage;
