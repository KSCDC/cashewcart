import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BACKEND_URL } from '../../constants';
import Loading from '../../Components/Loading';
import useAuthStatus from '../../Hooks/useAuthStatus';
import useTokenExpirationCheck from '../../Hooks/useTokenExpirationCheck';
import RefreshToken from '../../Hooks/RefreshToken';

function PurchasePage({ product_variant_id, name, description, product_images, product_variants }) {
  // Check if product_images is not defined or not an array
  if (!product_images || !Array.isArray(product_images) || product_images.length === 0) {
    return <Loading />;
  }
console.log(product_variants[0].product_variant_id)
  // global hooks for this component
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [primaryImage, setPrimaryImage] = useState(product_images[0].product_image)
  const [productPrice, setProductPrice] = useState(product_variants[0].selling_price)
  const [productWeight, setProductWeight] = useState(product_variants[0].weight_in_grams)
  const [productId,setProductId] = useState(product_variants[0].product_variant_id)
  const loginStatus = useAuthStatus();
  const isTokenExpired = useTokenExpirationCheck(); // Call the hook and get token expiration status

  // function to add the product to the cart
  const handleAddToCart = () => {
    if (isTokenExpired) {
      // need to implement the logic for getting a new access token using the refresh token
      RefreshToken();
    }

    setIsLoading(true); // Set loading state to true when user clicks on the button

    // auth token from local storage
    let access_token = localStorage.getItem("access_token")
    fetch(`${BACKEND_URL}/api/product/cart/${productId}/`, {
      method: "POST",
      headers: { "Authorization": `Bearer ${access_token}` }
    })
    .then(res => {
      setIsLoading(false); // Set loading state to false when request completes
      if (!res.ok) {
        throw new Error('Failed to add product to cart');
      }
      return res.json();
    })
    .then(data => {
      console.log(data); // Log response data
      // You might want to handle the response data here, e.g., update cart state
    })
    .catch((err) => {
      setIsLoading(false); // Set loading state to false if there's an error
      console.log(err.message); // Log error message
      setErrorMessage('Failed to add product to cart'); // Set error message
    });
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
        {/* product variants price and weights */}
        <div className="flex items-center mt-6 gap-3">
          {product_variants.filter((data) => data.is_available).map((data, index) => (
            <button 
            onClick={() => {
              setProductPrice(data.selling_price)
              setProductWeight(data.weight_in_grams)
            }} className="h-28 w-32 bg-gray-200 justify-center items-center flex flex-col rounded-lg border-red-400 border" key={data.id}>
              <h3 className='text-xl'>{data.weight_in_grams == 1000.00 ? "1Kg" : `${data.weight_in_grams}gm`}</h3>
              <h2 className='font-bold text-lg text-red-500'>₹{data.selling_price}</h2>
            </button>
          ))}
        </div>
        {/* buy now buttons */}
        <div className='mt-6'>
          {isLoading ? (
            <div className='w-full btn bg-red-500 hover:bg-red-800 text-white'>Submitting...</div>
          ) : (
            loginStatus ? (
              <button onClick={handleAddToCart} className='w-full btn bg-red-500 hover:bg-red-800 text-white'>
                Add to Cartgit
              </button>
            ) : (
              <Link to='/login'>
                <button className='w-full btn bg-red-500 hover:bg-red-800 text-white'>Login</button>
              </Link>
            )
          )}
        </div>
        {errorMessage && <div className='text-red-500 mt-2 font-bold text-center'>{errorMessage}</div>}
      </div>
    </main>
  );
}

export default PurchasePage;
