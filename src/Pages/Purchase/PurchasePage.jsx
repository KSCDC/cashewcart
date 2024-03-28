import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BACKEND_URL } from '../../constants';
import Loading from '../../Components/Loading';
import useAuthStatus from '../../Hooks/useAuthStatus';
import useTokenExpirationCheck from '../../Hooks/useTokenExpirationCheck';
import RefreshToken from '../../Hooks/RefreshToken';
import { IoStarSharp, IoClose, IoCheckmarkDoneSharp } from "react-icons/io5";
import { IoMdShare } from "react-icons/io"
import Review from './Review';
import { FaCopy, FaFacebook, FaGoogle, FaInstagram } from "react-icons/fa";
import { FaXTwitter,FaWhatsapp } from "react-icons/fa6";


function PurchasePage({ product_id, name, description, product_images, product_variants, average_rating }) {
  // Check if product_images is not defined or not an array
  if (!product_images || !Array.isArray(product_images) || product_images.length === 0) {
    return <Loading />;
  }

  // global hooks for this component
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [primaryImage, setPrimaryImage] = useState(product_images[0].product_image)
  const [productPrice, setProductPrice] = useState(product_variants[0].selling_price)
  const [productWeight, setProductWeight] = useState(product_variants[0].weight_in_grams)
  const [productId, setProductId] = useState(product_variants[0].product_variant_id)
  const [selectedButton, setSelectedButton] = useState(0)
  const loginStatus = useAuthStatus();
  const isTokenExpired = useTokenExpirationCheck(); // Call the hook and get token expiration status
  // state to display social share
  const [isShowShare, setIsShowShare] = useState(false)
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
          RefreshToken();
          let access_token = localStorage.getItem("access_token")
          fetch(`${BACKEND_URL}/api/product/cart/${productId}/`, {
            method: "POST",
            headers: { "Authorization": `Bearer ${access_token}` }
          })
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
    window.location.reload()
  }

  return (
    <div>
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
          <div className="flex justify-center items-center mt-2 border  h-96 w-96  border-red-300 rounded-lg ">
            <img src={`${BACKEND_URL}${primaryImage}`} className='h-72 w-72 object-contain relative overflow-hidden custome-scale duration-500' alt="Main Image" />
          </div>
        </div>

        {/* ---------------------------------------- */}
        {/* second half of the page */}
        <div className="w-full p-3">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl lg:text-3xl font-bold">{name}</h2>
            <button onClick={() => setIsShowShare(true)} className="text-2xl">
              <IoMdShare />
            </button>
          </div>
          {/* display Social Share Modal */}
          {isShowShare ?
            <SocialShare
              setIsShowShare={setIsShowShare}
              description={description}
            />
            : null}
          {/* product price and details */}
          <div className="flex space-x-2 items-baseline">
            <h3 className='text-2xl font-bold'>{productWeight == 1000.00 ? "1Kg" : `${productWeight}gm`}</h3>
            <h3 className='text-xl text-green-500 font-bold'>₹{productPrice}</h3>
          </div>
          <div className="flex items-center">
            <p className='flex items-center text-lg text-yellow-400'>{Array.from({ length: average_rating }).map((_, index) => (
              <IoStarSharp key={index} />
            ))}</p>
            <p>({average_rating})</p>
          </div>
          <p className='mt-4 line-clamp-6 text-justify'>{description}</p>
          {/* product variants price and weights */}
          <div className="flex items-center mt-6 gap-3">
            {product_variants.filter((data, index) => data.is_available).map((data, index) => (
              <button
                onClick={() => {
                  setSelectedButton(index)
                  setProductId(data.product_variant_id)
                  setProductPrice(data.selling_price)
                  setProductWeight(data.weight_in_grams)
                }} className={`p-2 bg-gray-200 justify-center items-center flex flex-col rounded-lg border-red-400 border ${selectedButton === index ? "bg-red-500" : null}`} key={data.id}>
                <h3 className={`font-bold text-lg ${selectedButton === index ? "text-white" : "text-red-500"}`}>{data.weight_in_grams == 1000.00 ? "1Kg" : `${data.weight_in_grams}gm`}</h3>
                <h2 className={`font-bold text-lg ${selectedButton === index ? "text-white" : "text-red-500"}`}>₹{data.selling_price}</h2>
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
                  Add to Cart
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
      {/* review of the product */}
      <div className="mt-6 mb-24">
        <Review product_id={product_id} average_rating={average_rating} />
      </div>
    </div>
  );
}


function SocialShare({ setIsShowShare, description }) {
  const [isCopied, setIsCopied] = useState(false)
  const content = `${window.location.href} ${description}`
  // function to cpy text
  const CopyText = () => {
    navigator.clipboard.writeText(content)
    setIsCopied(true)
  }
  const socialMediaLinks = [
    {icon:<FaXTwitter/> ,link: "https://twitter.com/"},
    {icon:<FaWhatsapp/> ,link: "https://web.whatsapp.com/"},
    {icon: <FaFacebook/> ,link: "https://facebook.com/"},
    {icon: <FaInstagram/> ,link: "https://www.instagram.com/"},
  ]
  return (
    <div className='fixed bg-black inset-0 bg-opacity-15 flex items-center justify-center'>
      <div className="p-2 bg-white w-[28rem] h-56 rounded-xl">
        <div className="flex justify-between items-center">
          <h3 className='text-lg font-bold'>Share with Friends</h3>
          <button className='text-xl p-2 bg-red-500 text-white hover:animate-spin rounded-full' onClick={() => setIsShowShare(false)}><IoClose /></button>
        </div>
        <hr className='mt-2 border border-gray-400' />
        {/* body of the section */}
        <div className="flex items-center mt-2 ">
          <div className='h-12 w-[24rem] flex justify-center items-center overflow-hidden bg-gray-200 p-2 border-r-2 border-gray-400 rounded-l-xl'>
            <p className='text-center font-medium'>{window.location.href}</p>
          </div>
          <button
            onClick={CopyText}
            className={`bg-gray-200 h-12 p-2 flex items-center ${isCopied ? "bg-red-500 text-white" : ""}`}>
            {isCopied ? <IoCheckmarkDoneSharp /> : <FaCopy />}
          </button>
        </div>

          {/* social media icons */}
         <div className="flex items-center mt-6 gap-x-4 justify-center">
          {socialMediaLinks.map((data) => (
            <a target='_blank' key={data.localStorage} href={data.link} className='p-2 bg-gray-500 text-2xl rounded-lg text-white translate-y-0 ease-in-out hover:-translate-y-3 transition duration-300'>
            {data.icon}
          </a>
          ))}
         </div>
      </div>

    </div>
  )
}

export default PurchasePage;
